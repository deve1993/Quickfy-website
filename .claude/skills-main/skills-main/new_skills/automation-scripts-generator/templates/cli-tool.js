#!/usr/bin/env node
/**
 * Custom CLI Tool Template
 * Build your own CLI commands for your UI library
 */

const { program } = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const fs = require('fs').promises
const path = require('path')

// ============================================
// Command: Generate Component
// ============================================

program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate a new component, hook, or utility')
  .option('-d, --dir <directory>', 'Output directory')
  .option('--no-test', 'Skip test file')
  .option('--no-story', 'Skip Storybook story')
  .action(async (type, name, options) => {
    const spinner = ora(`Generating ${type}: ${name}`).start()

    try {
      // Simulate generation
      await new Promise(resolve => setTimeout(resolve, 1000))

      spinner.succeed(chalk.green(`${type} ${name} generated successfully!`))

      console.log(chalk.gray('\nGenerated files:'))
      console.log(chalk.gray(`  ${name}.tsx`))
      console.log(chalk.gray(`  ${name}.types.ts`))
      if (options.test) console.log(chalk.gray(`  ${name}.test.tsx`))
      if (options.story) console.log(chalk.gray(`  ${name}.stories.tsx`))
    } catch (error) {
      spinner.fail(chalk.red('Generation failed'))
      console.error(error)
      process.exit(1)
    }
  })

// ============================================
// Command: Interactive Component Creator
// ============================================

program
  .command('create')
  .alias('c')
  .description('Interactively create a component')
  .action(async () => {
    console.log(chalk.cyan.bold('\n📦 Component Creator\n'))

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: (input) => {
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Component name must be PascalCase (e.g., Button)'
          }
          return true
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: [
          { name: 'Basic Component', value: 'basic' },
          { name: 'Compound Component', value: 'compound' },
          { name: 'Polymorphic Component', value: 'polymorphic' },
          { name: 'Custom Hook', value: 'hook' },
        ],
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select features:',
        choices: [
          { name: 'TypeScript', value: 'ts', checked: true },
          { name: 'Tests', value: 'test', checked: true },
          { name: 'Storybook Story', value: 'story', checked: true },
          { name: 'README', value: 'readme', checked: true },
          { name: 'CSS Module', value: 'css', checked: false },
        ],
      },
      {
        type: 'confirm',
        name: 'continue',
        message: 'Create component?',
        default: true,
      },
    ])

    if (!answers.continue) {
      console.log(chalk.yellow('\n❌ Cancelled\n'))
      return
    }

    const spinner = ora('Creating component...').start()

    try {
      // Simulate creation
      await new Promise(resolve => setTimeout(resolve, 2000))

      spinner.succeed(chalk.green(`Component ${answers.name} created!`))

      console.log(chalk.gray('\nCreated:'))
      console.log(chalk.gray(`  ✓ ${answers.name}.tsx`))
      if (answers.features.includes('test')) {
        console.log(chalk.gray(`  ✓ ${answers.name}.test.tsx`))
      }
      if (answers.features.includes('story')) {
        console.log(chalk.gray(`  ✓ ${answers.name}.stories.tsx`))
      }
      if (answers.features.includes('readme')) {
        console.log(chalk.gray(`  ✓ README.md`))
      }

      console.log(chalk.green.bold('\n✨ Done!\n'))
    } catch (error) {
      spinner.fail(chalk.red('Creation failed'))
      console.error(error)
      process.exit(1)
    }
  })

// ============================================
// Command: List Components
// ============================================

program
  .command('list')
  .alias('ls')
  .description('List all components')
  .option('-v, --verbose', 'Show detailed information')
  .action(async (options) => {
    const spinner = ora('Scanning components...').start()

    try {
      // Simulate scanning
      await new Promise(resolve => setTimeout(resolve, 500))

      spinner.succeed('Found 12 components')

      console.log(chalk.cyan.bold('\n📦 Components:\n'))

      const components = [
        { name: 'Button', tests: true, stories: true },
        { name: 'Card', tests: true, stories: true },
        { name: 'Modal', tests: false, stories: true },
        { name: 'Input', tests: true, stories: true },
      ]

      for (const comp of components) {
        const status = []
        if (comp.tests) status.push(chalk.green('✓ tests'))
        else status.push(chalk.red('✗ tests'))
        if (comp.stories) status.push(chalk.green('✓ stories'))
        else status.push(chalk.red('✗ stories'))

        console.log(`  ${chalk.bold(comp.name)}`)
        if (options.verbose) {
          console.log(`    ${status.join('  ')}`)
        }
      }

      console.log('')
    } catch (error) {
      spinner.fail(chalk.red('Scan failed'))
      console.error(error)
    }
  })

// ============================================
// Command: Validate Components
// ============================================

program
  .command('validate')
  .alias('v')
  .description('Validate component structure and files')
  .option('--fix', 'Auto-fix issues')
  .action(async (options) => {
    const spinner = ora('Validating components...').start()

    try {
      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 1000))

      spinner.succeed('Validation complete')

      console.log(chalk.cyan.bold('\n🔍 Validation Results:\n'))

      const issues = [
        { component: 'Button', issue: 'Missing tests', severity: 'error' },
        { component: 'Card', issue: 'No README', severity: 'warning' },
        { component: 'Modal', issue: 'Missing type exports', severity: 'error' },
      ]

      for (const issue of issues) {
        const icon = issue.severity === 'error' ? chalk.red('✗') : chalk.yellow('⚠')
        console.log(`  ${icon} ${issue.component}: ${issue.issue}`)
      }

      console.log(chalk.gray(`\nFound ${issues.length} issues`))

      if (options.fix) {
        console.log(chalk.yellow('\n🔧 Auto-fixing issues...\n'))
        // Implement auto-fix logic
      } else {
        console.log(chalk.gray('\nRun with --fix to automatically fix issues\n'))
      }
    } catch (error) {
      spinner.fail(chalk.red('Validation failed'))
      console.error(error)
    }
  })

// ============================================
// Command: Stats
// ============================================

program
  .command('stats')
  .description('Show component statistics')
  .action(() => {
    console.log(chalk.cyan.bold('\n📊 Component Statistics:\n'))

    const stats = [
      { label: 'Total Components', value: 12, color: 'cyan' },
      { label: 'With Tests', value: 10, color: 'green' },
      { label: 'With Stories', value: 11, color: 'blue' },
      { label: 'With README', value: 8, color: 'yellow' },
    ]

    for (const stat of stats) {
      console.log(`  ${chalk[stat.color](stat.label + ':')} ${stat.value}`)
    }

    console.log('')
  })

// ============================================
// Main Program
// ============================================

program
  .name('ui-cli')
  .description('CLI tool for UI library development')
  .version('1.0.0')

program.parse(process.argv)

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
