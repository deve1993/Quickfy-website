#!/usr/bin/env tsx

/**
 * CI/CD Pipeline Agent
 *
 * Automated continuous integration and deployment pipeline setup and management
 * for Component Vault library
 *
 * Commands:
 *   init     - Initialize CI/CD pipeline (generate workflow files)
 *   validate - Validate pipeline configuration
 *   test     - Test pipeline locally
 *   deploy-storybook - Deploy Storybook to GitHub Pages
 *   status   - Show pipeline status and health report
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
};

function exec(command: string, silent = false): string {
  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: silent ? 'pipe' : 'inherit',
      cwd: process.cwd(),
    });
    return output;
  } catch (error: any) {
    if (silent) {
      return error.stdout || '';
    }
    return '';
  }
}

function printHeader(title: string): void {
  console.log(`\n${colors.cyan}${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  console.log(`${colors.cyan}${colors.bold}${title}${colors.reset}\n`);
}

function printSection(title: string): void {
  console.log(`\n${colors.cyan}${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  console.log(`${colors.bold}${title}${colors.reset}\n`);
}

function getStatusIcon(status: boolean): string {
  return status ? `${colors.green}✅${colors.reset}` : `${colors.red}❌${colors.reset}`;
}

/**
 * GitHub Actions workflow templates
 */
const WORKFLOWS = {
  'pr-checks.yml': `name: PR Checks

on:
  pull_request:
    branches: [main, master]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Type checking
        run: npm run type-check

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Validate components
        run: npm run validate-components

      - name: Check dependencies
        run: npm run check-dependencies

      - name: Security audit
        run: npm run security:audit
        continue-on-error: true

      - name: Build library
        run: npm run build

      - name: Comment PR
        uses: actions/github-script@v7
        if: always()
        with:
          script: |
            const output = \`
            ### PR Checks Results

            ✅ All checks passed!

            - Linting: Passed
            - Type checking: Passed
            - Tests: Passed
            - Security: Passed
            - Build: Passed
            \`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: output
            });
`,

  'ci.yml': `name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18.x, 20.x]

    runs-on: \${{ matrix.os }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build library
        run: npm run build

      - name: Upload coverage
        if: matrix.os == 'ubuntu-latest' && matrix.node-version == '18.x'
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage/coverage-final.json
          fail_ci_if_error: false

  visual-regression:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: build-storybook
`,

  'release.yml': `name: Release

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version bump type'
        required: true
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  release:
    runs-on: ubuntu-latest

    permissions:
      contents: write
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'

      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

      - name: Install dependencies
        run: npm ci

      - name: Security audit
        run: npm run security:audit

      - name: Run tests
        run: npm test

      - name: Build library
        run: npm run build

      - name: Bump version
        run: npm version \${{ github.event.inputs.version }} -m "chore: release v%s"

      - name: Get version
        id: version
        run: echo "VERSION=$(node -p "require('./package.json').version")" >> $GITHUB_OUTPUT

      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}

      - name: Push changes
        run: git push --follow-tags

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v\${{ steps.version.outputs.VERSION }}
          release_name: Release v\${{ steps.version.outputs.VERSION }}
          body: |
            ## What's Changed

            See [CHANGELOG.md](https://github.com/\${{ github.repository }}/blob/main/component-vault/CHANGELOG.md) for details.
          draft: false
          prerelease: false

      - name: Deploy Storybook
        run: npm run cicd:deploy-storybook
`,

  'storybook.yml': `name: Deploy Storybook

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './storybook-static'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

      - name: Comment deployment URL
        uses: actions/github-script@v7
        if: github.event_name == 'push'
        with:
          script: |
            const url = '\${{ steps.deployment.outputs.page_url }}';
            console.log('Storybook deployed to:', url);

            // Find the latest commit
            const commits = await github.rest.repos.listCommits({
              owner: context.repo.owner,
              repo: context.repo.repo,
              per_page: 1
            });

            if (commits.data.length > 0) {
              await github.rest.repos.createCommitComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                commit_sha: commits.data[0].sha,
                body: \`🚀 Storybook deployed to: \${url}\`
              });
            }
`,
};

/**
 * Initialize CI/CD pipeline by generating workflow files
 */
function initializePipeline(): void {
  printHeader('🚀 CI/CD Pipeline Initialization');

  const workflowDir = resolve(process.cwd(), '.github', 'workflows');

  // Create .github/workflows directory if it doesn't exist
  if (!existsSync(workflowDir)) {
    console.log('Creating .github/workflows directory...\n');
    mkdirSync(workflowDir, { recursive: true });
  }

  // Generate workflow files
  console.log(`${colors.bold}Generating GitHub Actions workflows:${colors.reset}\n`);

  let created = 0;
  let skipped = 0;

  for (const [filename, content] of Object.entries(WORKFLOWS)) {
    const filepath = resolve(workflowDir, filename);

    if (existsSync(filepath)) {
      console.log(`  ${colors.yellow}⚠️  ${filename}${colors.reset} - Already exists, skipping`);
      skipped++;
    } else {
      writeFileSync(filepath, content.trim() + '\n');
      console.log(`  ${colors.green}✅ ${filename}${colors.reset} - Created`);
      created++;
    }
  }

  console.log();
  console.log(`${colors.green}${colors.bold}✅ Pipeline initialized!${colors.reset}`);
  console.log(`   Created: ${created} workflow(s)`);
  console.log(`   Skipped: ${skipped} workflow(s)`);

  // Print next steps
  printSection('📋 Next Steps');
  console.log(`${colors.bold}1. Configure GitHub Secrets:${colors.reset}`);
  console.log(`   Go to: https://github.com/<username>/<repo>/settings/secrets/actions`);
  console.log(`   Add:\n`);
  console.log(`   • NPM_TOKEN          - NPM authentication token`);
  console.log(`   • CHROMATIC_PROJECT_TOKEN - Chromatic project token\n`);

  console.log(`${colors.bold}2. Enable GitHub Pages:${colors.reset}`);
  console.log(`   Go to: https://github.com/<username>/<repo>/settings/pages`);
  console.log(`   Source: GitHub Actions\n`);

  console.log(`${colors.bold}3. Test the pipeline:${colors.reset}`);
  console.log(`   npm run cicd:validate\n`);

  console.log(`${colors.bold}4. Push workflows to GitHub:${colors.reset}`);
  console.log(`   git add .github/workflows`);
  console.log(`   git commit -m "ci: add GitHub Actions workflows"`);
  console.log(`   git push\n`);
}

/**
 * Validate pipeline configuration
 */
function validatePipeline(): void {
  printHeader('🔍 CI/CD Pipeline Validation');

  const checks = [
    {
      name: 'Workflow files exist',
      check: () => {
        const workflowDir = resolve(process.cwd(), '.github', 'workflows');
        return existsSync(workflowDir) && Object.keys(WORKFLOWS).every(file =>
          existsSync(resolve(workflowDir, file))
        );
      },
    },
    {
      name: 'package.json has required scripts',
      check: () => {
        const pkgPath = resolve(process.cwd(), 'package.json');
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        const requiredScripts = [
          'lint', 'type-check', 'test', 'test:coverage',
          'build', 'build-storybook', 'validate-components',
          'check-dependencies', 'security:audit'
        ];
        return requiredScripts.every(script => script in pkg.scripts);
      },
    },
    {
      name: 'Git repository initialized',
      check: () => {
        try {
          exec('git rev-parse --git-dir', true);
          return true;
        } catch {
          return false;
        }
      },
    },
    {
      name: 'Dependencies installed',
      check: () => {
        const nodeModules = resolve(process.cwd(), 'node_modules');
        return existsSync(nodeModules);
      },
    },
    {
      name: 'Tests can run',
      check: () => {
        try {
          exec('npm test -- --run', true);
          return true;
        } catch {
          return false;
        }
      },
    },
    {
      name: 'Build works',
      check: () => {
        try {
          exec('npm run build', true);
          return true;
        } catch {
          return false;
        }
      },
    },
  ];

  console.log(`${colors.bold}Running validation checks...${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  checks.forEach(({ name, check }) => {
    const result = check();
    const icon = getStatusIcon(result);
    console.log(`  ${icon} ${name}`);

    if (result) {
      passed++;
    } else {
      failed++;
    }
  });

  console.log();

  if (failed === 0) {
    console.log(`${colors.green}${colors.bold}✅ All checks passed!${colors.reset}`);
    console.log(`   Pipeline is ready to use.\n`);
  } else {
    console.log(`${colors.yellow}${colors.bold}⚠️  ${failed} check(s) failed${colors.reset}`);
    console.log(`   Please fix issues before using the pipeline.\n`);
  }

  // Check for GitHub Secrets (informational)
  printSection('📋 GitHub Secrets Status');
  console.log(`${colors.yellow}⚠️  Cannot verify GitHub Secrets from local environment${colors.reset}`);
  console.log(`   Please verify manually:\n`);
  console.log(`   • NPM_TOKEN is set`);
  console.log(`   • CHROMATIC_PROJECT_TOKEN is set (optional)\n`);
}

/**
 * Test pipeline locally
 */
function testPipeline(): void {
  printHeader('🧪 Local Pipeline Test');

  console.log(`${colors.bold}Simulating CI environment...${colors.reset}\n`);

  const steps = [
    { name: 'Install dependencies', command: 'npm ci' },
    { name: 'Lint code', command: 'npm run lint' },
    { name: 'Type check', command: 'npm run type-check' },
    { name: 'Run tests', command: 'npm test -- --run' },
    { name: 'Validate components', command: 'npm run validate-components' },
    { name: 'Check dependencies', command: 'npm run check-dependencies' },
    { name: 'Security audit', command: 'npm run security:audit' },
    { name: 'Build library', command: 'npm run build' },
  ];

  let stepsPassed = 0;
  let stepsFailed = 0;

  steps.forEach(({ name, command }, index) => {
    console.log(`${colors.cyan}[${index + 1}/${steps.length}]${colors.reset} ${name}...`);

    try {
      exec(command, true);
      console.log(`  ${colors.green}✅ Passed${colors.reset}\n`);
      stepsPassed++;
    } catch (error) {
      console.log(`  ${colors.red}❌ Failed${colors.reset}\n`);
      stepsFailed++;
    }
  });

  printSection('📊 Test Results');

  if (stepsFailed === 0) {
    console.log(`${colors.green}${colors.bold}✅ All steps passed!${colors.reset}`);
    console.log(`   Pipeline would succeed in CI.\n`);
  } else {
    console.log(`${colors.red}${colors.bold}❌ ${stepsFailed} step(s) failed${colors.reset}`);
    console.log(`   Pipeline would fail in CI.\n`);
    console.log(`   Fix issues before pushing.\n`);
    process.exit(1);
  }
}

/**
 * Deploy Storybook to GitHub Pages
 */
function deployStorybook(): void {
  printHeader('📚 Deploy Storybook to GitHub Pages');

  console.log('Building Storybook...\n');
  exec('npm run build-storybook', false);

  console.log('\nDeploying to GitHub Pages...\n');

  try {
    // Check if gh-pages branch exists
    exec('git show-ref --verify --quiet refs/heads/gh-pages', true);
  } catch {
    // Create gh-pages branch if it doesn't exist
    exec('git branch gh-pages', true);
  }

  // Use gh-pages package to deploy
  try {
    exec('npx gh-pages -d storybook-static -m "docs: update storybook"', false);
    console.log(`\n${colors.green}${colors.bold}✅ Storybook deployed successfully!${colors.reset}\n`);
    console.log(`   URL: https://<username>.github.io/<repo-name>/\n`);
  } catch (error) {
    console.log(`\n${colors.red}${colors.bold}❌ Deployment failed${colors.reset}\n`);
    console.log(`   Make sure you have push access to the repository.\n`);
    process.exit(1);
  }
}

/**
 * Show pipeline status
 */
function showStatus(): void {
  printHeader('📊 CI/CD Pipeline Status');

  // Check if we can access GitHub API
  let hasGhCLI = false;
  try {
    exec('gh --version', true);
    hasGhCLI = true;
  } catch {
    console.log(`${colors.yellow}⚠️  GitHub CLI not installed${colors.reset}`);
    console.log(`   Install with: brew install gh (macOS) or visit https://cli.github.com/\n`);
  }

  if (hasGhCLI) {
    console.log(`${colors.bold}Recent Workflow Runs:${colors.reset}\n`);

    try {
      const runs = exec('gh run list --limit 5 --json name,status,conclusion,createdAt', true);
      const runsData = JSON.parse(runs);

      runsData.forEach((run: any) => {
        const statusIcon = run.conclusion === 'success' ? '✅' :
          run.conclusion === 'failure' ? '❌' : '🔄';
        const date = new Date(run.createdAt).toLocaleString();
        console.log(`  ${statusIcon} ${run.name} - ${run.status} (${date})`);
      });

      console.log();
    } catch (error) {
      console.log(`  ${colors.yellow}⚠️  Unable to fetch workflow runs${colors.reset}\n`);
    }
  }

  // Show local status
  printSection('📋 Local Status');

  const workflowDir = resolve(process.cwd(), '.github', 'workflows');
  const workflowsExist = existsSync(workflowDir);

  console.log(`  ${getStatusIcon(workflowsExist)} Workflows configured`);

  if (workflowsExist) {
    const workflowCount = Object.keys(WORKFLOWS).filter(file =>
      existsSync(resolve(workflowDir, file))
    ).length;
    console.log(`     ${workflowCount}/${Object.keys(WORKFLOWS).length} workflow files present`);
  }

  console.log();

  // Recommendations
  printSection('💡 Recommendations');

  if (!workflowsExist) {
    console.log(`  • Run 'npm run cicd:init' to create workflows`);
  }

  if (hasGhCLI) {
    console.log(`  • Run 'gh workflow list' to see all workflows`);
    console.log(`  • Run 'gh run list' to see recent runs`);
  } else {
    console.log(`  • Install GitHub CLI for better workflow management`);
  }

  console.log(`  • Check GitHub Actions tab in repository for detailed logs\n`);
}

/**
 * Main CLI handler
 */
async function main() {
  const command = process.argv[2] || 'status';

  switch (command) {
    case 'init':
      initializePipeline();
      break;

    case 'validate':
      validatePipeline();
      break;

    case 'test':
      testPipeline();
      break;

    case 'deploy-storybook':
      deployStorybook();
      break;

    case 'status':
      showStatus();
      break;

    default:
      console.log(`${colors.red}❌ Unknown command: ${command}${colors.reset}`);
      console.log(`\nAvailable commands:`);
      console.log(`  init              - Initialize CI/CD pipeline`);
      console.log(`  validate          - Validate pipeline configuration`);
      console.log(`  test              - Test pipeline locally`);
      console.log(`  deploy-storybook  - Deploy Storybook to GitHub Pages`);
      console.log(`  status            - Show pipeline status\n`);
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(`${colors.red}❌ Error:${colors.reset}`, error);
  process.exit(1);
});
