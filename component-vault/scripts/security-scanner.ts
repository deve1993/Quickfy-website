#!/usr/bin/env tsx

/**
 * Security Scanner Agent
 *
 * Automated security vulnerability scanning, license compliance checking,
 * and secrets detection for Component Vault library
 *
 * Commands:
 *   audit    - Full security audit (vulnerabilities + licenses + secrets)
 *   vulns    - Vulnerability scan only
 *   licenses - License compliance check only
 *   secrets  - Secrets detection only
 *   fix      - Auto-fix vulnerabilities
 *   report   - Generate detailed JSON report
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
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

interface VulnerabilityData {
  critical: number;
  high: number;
  moderate: number;
  low: number;
  vulnerabilities: Array<{
    name: string;
    severity: string;
    path: string;
    fixAvailable: boolean;
  }>;
}

interface LicenseData {
  total: number;
  compatible: number;
  incompatible: number;
  unknown: number;
  licenses: Record<string, number>;
  issues: Array<{
    package: string;
    license: string;
    compatible: boolean;
  }>;
}

interface SecretsData {
  found: number;
  patterns: Array<{
    type: string;
    file: string;
    line: number;
    preview: string;
  }>;
}

interface SecurityReport {
  timestamp: string;
  vulnerabilities: VulnerabilityData;
  licenses: LicenseData;
  secrets: SecretsData;
  score: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  recommendations: string[];
}

// Allowed licenses for commercial use
const ALLOWED_LICENSES = [
  'MIT',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'ISC',
  '0BSD',
  'Unlicense',
];

// Blocked licenses (copyleft, proprietary)
const BLOCKED_LICENSES = [
  'GPL-3.0',
  'AGPL-3.0',
  'LGPL-3.0',
  'SSPL',
  'Proprietary',
];

// Secrets detection patterns
const SECRET_PATTERNS = [
  { name: 'AWS Access Key', pattern: /AKIA[0-9A-Z]{16}/, severity: 'critical' },
  { name: 'Stripe Secret Key', pattern: /sk_live_[0-9a-zA-Z]{24}/, severity: 'critical' },
  { name: 'GitHub Token', pattern: /ghp_[0-9a-zA-Z]{36}/, severity: 'critical' },
  { name: 'Google API Key', pattern: /AIza[0-9A-Za-z\-_]{35}/, severity: 'high' },
  { name: 'Generic API Key', pattern: /api[_-]?key[_-]?[=:]\s*['"][0-9a-zA-Z]{32,}['"]/, severity: 'high' },
  { name: 'Private Key', pattern: /-----BEGIN (RSA |DSA )?PRIVATE KEY-----/, severity: 'critical' },
  { name: 'Database URL', pattern: /(mongodb|postgres|mysql):\/\/[^\s]+/, severity: 'high' },
  { name: 'OAuth Token', pattern: /oauth[_-]?token[_-]?[=:]\s*['"][0-9a-zA-Z\-._~+/]+=*['"]/, severity: 'high' },
];

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

function getSeverityIcon(count: number): string {
  if (count === 0) return `${colors.green}✅${colors.reset}`;
  return `${colors.red}🔴${colors.reset}`;
}

function getStatusIcon(status: boolean): string {
  return status ? `${colors.green}✅${colors.reset}` : `${colors.red}❌${colors.reset}`;
}

/**
 * Scan for dependency vulnerabilities using npm audit
 */
async function scanVulnerabilities(): Promise<VulnerabilityData> {
  console.log('Scanning dependencies for vulnerabilities...\n');

  const result: VulnerabilityData = {
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0,
    vulnerabilities: [],
  };

  try {
    const output = exec('npm audit --json', true);
    const auditData = JSON.parse(output);

    if (auditData.metadata) {
      result.critical = auditData.metadata.vulnerabilities?.critical || 0;
      result.high = auditData.metadata.vulnerabilities?.high || 0;
      result.moderate = auditData.metadata.vulnerabilities?.moderate || 0;
      result.low = auditData.metadata.vulnerabilities?.low || 0;
    }

    // Parse vulnerability details
    if (auditData.vulnerabilities) {
      for (const [name, vuln] of Object.entries(auditData.vulnerabilities as any)) {
        result.vulnerabilities.push({
          name,
          severity: vuln.severity,
          path: vuln.via?.[0]?.source || 'unknown',
          fixAvailable: vuln.fixAvailable || false,
        });
      }
    }
  } catch (error) {
    console.log(`${colors.yellow}⚠️  npm audit failed or returned errors${colors.reset}\n`);
  }

  // Display results
  console.log(`${getSeverityIcon(result.critical)} ${colors.bold}Critical:${colors.reset} ${result.critical}`);
  console.log(`${getSeverityIcon(result.high)} ${colors.bold}High:${colors.reset} ${result.high}`);
  console.log(`${result.moderate > 0 ? colors.yellow + '🟡' : colors.green + '✅'}${colors.reset} ${colors.bold}Moderate:${colors.reset} ${result.moderate}`);
  console.log(`${result.low > 0 ? colors.yellow + '🟢' : colors.green + '✅'}${colors.reset} ${colors.bold}Low:${colors.reset} ${result.low}\n`);

  // Show detailed vulnerabilities if any
  if (result.vulnerabilities.length > 0 && result.vulnerabilities.length <= 10) {
    console.log(`${colors.bold}Vulnerability Details:${colors.reset}\n`);
    result.vulnerabilities.forEach((vuln) => {
      console.log(`  ${colors.red}┌─${colors.reset} ${colors.bold}${vuln.name}${colors.reset}`);
      console.log(`  ${colors.red}│${colors.reset}  Severity: ${vuln.severity}`);
      console.log(`  ${colors.red}│${colors.reset}  Path: ${vuln.path}`);
      console.log(`  ${colors.red}│${colors.reset}  Fix: ${vuln.fixAvailable ? 'npm audit fix' : 'Awaiting upstream fix'}`);
      console.log(`  ${colors.red}└─${colors.reset}\n`);
    });
  } else if (result.vulnerabilities.length > 10) {
    console.log(`${colors.yellow}⚠️  Too many vulnerabilities to display (${result.vulnerabilities.length} total)${colors.reset}`);
    console.log(`   Run 'npm audit' for full details\n`);
  }

  return result;
}

/**
 * Check license compatibility for all dependencies
 */
async function checkLicenses(): Promise<LicenseData> {
  console.log('Analyzing dependency licenses...\n');

  const result: LicenseData = {
    total: 0,
    compatible: 0,
    incompatible: 0,
    unknown: 0,
    licenses: {},
    issues: [],
  };

  try {
    // Get list of all dependencies with licenses
    const output = exec('npm list --json --all', true);
    const packageData = JSON.parse(output);

    function extractLicenses(deps: any, path: string[] = []): void {
      if (!deps) return;

      for (const [name, info] of Object.entries(deps)) {
        const pkgInfo = info as any;
        const license = pkgInfo.license || pkgInfo.licenses || 'Unknown';
        const licenseStr = Array.isArray(license) ? license.join(', ') : String(license);

        result.total++;
        result.licenses[licenseStr] = (result.licenses[licenseStr] || 0) + 1;

        // Check compatibility
        if (licenseStr === 'Unknown' || !pkgInfo.license) {
          result.unknown++;
          result.issues.push({
            package: name,
            license: licenseStr,
            compatible: false,
          });
        } else if (BLOCKED_LICENSES.some(blocked => licenseStr.includes(blocked))) {
          result.incompatible++;
          result.issues.push({
            package: name,
            license: licenseStr,
            compatible: false,
          });
        } else if (ALLOWED_LICENSES.some(allowed => licenseStr.includes(allowed))) {
          result.compatible++;
        } else {
          result.unknown++;
          result.issues.push({
            package: name,
            license: licenseStr,
            compatible: false,
          });
        }

        // Recursively check nested dependencies
        if (pkgInfo.dependencies) {
          extractLicenses(pkgInfo.dependencies, [...path, name]);
        }
      }
    }

    if (packageData.dependencies) {
      extractLicenses(packageData.dependencies);
    }
  } catch (error) {
    console.log(`${colors.yellow}⚠️  License check failed${colors.reset}\n`);
  }

  // Display results
  console.log(`${getStatusIcon(result.incompatible === 0)} ${colors.bold}License Compliance:${colors.reset} ${result.incompatible === 0 ? 'All licenses compatible' : `${result.incompatible} incompatible`}\n`);

  // License breakdown
  if (Object.keys(result.licenses).length > 0) {
    console.log(`${colors.bold}License Breakdown:${colors.reset}\n`);
    const sortedLicenses = Object.entries(result.licenses)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10); // Top 10 licenses

    sortedLicenses.forEach(([license, count]) => {
      const percentage = ((count / result.total) * 100).toFixed(1);
      const isAllowed = ALLOWED_LICENSES.some(allowed => license.includes(allowed));
      const icon = isAllowed ? '✅' : license === 'Unknown' ? '⚠️' : '❌';
      console.log(`  ${icon} ${license}: ${count} packages (${percentage}%)`);
    });
    console.log();
  }

  // Show issues
  if (result.issues.length > 0) {
    console.log(`${colors.yellow}${colors.bold}⚠️  Issues Found:${colors.reset}\n`);
    result.issues.slice(0, 5).forEach(issue => {
      console.log(`  - ${issue.package}: ${issue.license}`);
    });
    if (result.issues.length > 5) {
      console.log(`  ... and ${result.issues.length - 5} more\n`);
    }
  }

  return result;
}

/**
 * Scan codebase for exposed secrets
 */
async function detectSecrets(): Promise<SecretsData> {
  console.log('Scanning codebase for secrets...\n');

  const result: SecretsData = {
    found: 0,
    patterns: [],
  };

  const excludeDirs = ['node_modules', 'dist', '.git', 'build', 'coverage', 'playwright-report'];
  const includeExts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.env', '.yaml', '.yml'];

  function scanDirectory(dir: string): void {
    try {
      const entries = readdirSync(dir);

      for (const entry of entries) {
        const fullPath = resolve(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          if (!excludeDirs.includes(entry)) {
            scanDirectory(fullPath);
          }
        } else if (stat.isFile()) {
          const ext = entry.substring(entry.lastIndexOf('.'));
          if (includeExts.includes(ext)) {
            scanFile(fullPath);
          }
        }
      }
    } catch (error) {
      // Ignore errors
    }
  }

  function scanFile(filePath: string): void {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        SECRET_PATTERNS.forEach(({ name, pattern }) => {
          if (pattern.test(line)) {
            result.found++;
            result.patterns.push({
              type: name,
              file: filePath.replace(process.cwd(), ''),
              line: index + 1,
              preview: line.trim().substring(0, 80) + (line.length > 80 ? '...' : ''),
            });
          }
        });
      });
    } catch (error) {
      // Ignore errors
    }
  }

  // Scan current directory
  const scanDir = process.cwd();
  scanDirectory(scanDir);

  // Display results
  console.log(`${getStatusIcon(result.found === 0)} ${colors.bold}Secrets Found:${colors.reset} ${result.found}\n`);

  if (result.found > 0) {
    console.log(`${colors.red}${colors.bold}🔐 SECRETS DETECTED:${colors.reset}\n`);
    result.patterns.forEach(secret => {
      console.log(`  ${colors.red}┌─${colors.reset} ${colors.bold}${secret.type}${colors.reset}`);
      console.log(`  ${colors.red}│${colors.reset}  File: ${secret.file}:${secret.line}`);
      console.log(`  ${colors.red}│${colors.reset}  Preview: ${secret.preview}`);
      console.log(`  ${colors.red}└─${colors.reset}\n`);
    });
  } else {
    console.log(`${colors.bold}Patterns Checked:${colors.reset}`);
    console.log(`  ✓ AWS Keys`);
    console.log(`  ✓ API Tokens`);
    console.log(`  ✓ Private Keys`);
    console.log(`  ✓ Database URLs`);
    console.log(`  ✓ OAuth Secrets\n`);
  }

  return result;
}

/**
 * Calculate security score based on findings
 */
function calculateSecurityScore(
  vulnerabilities: VulnerabilityData,
  licenses: LicenseData,
  secrets: SecretsData
): number {
  let score = 100;

  // Deduct for vulnerabilities
  score -= vulnerabilities.critical * 25;
  score -= vulnerabilities.high * 10;
  score -= vulnerabilities.moderate * 3;
  score -= vulnerabilities.low * 1;

  // Deduct for license violations
  score -= licenses.incompatible * 15;

  // Deduct for secrets
  score -= secrets.found * 50;

  return Math.max(0, score);
}

/**
 * Get security status based on score
 */
function getSecurityStatus(score: number, vulnerabilities: VulnerabilityData): 'SAFE' | 'WARNING' | 'CRITICAL' {
  if (vulnerabilities.critical > 0 || vulnerabilities.high > 0) {
    return 'CRITICAL';
  }
  if (score >= 85) {
    return 'SAFE';
  }
  if (score >= 70) {
    return 'WARNING';
  }
  return 'CRITICAL';
}

/**
 * Generate recommendations based on findings
 */
function generateRecommendations(
  vulnerabilities: VulnerabilityData,
  licenses: LicenseData,
  secrets: SecretsData
): string[] {
  const recommendations: string[] = [];

  if (vulnerabilities.critical > 0 || vulnerabilities.high > 0) {
    recommendations.push("Run 'npm audit fix' immediately to patch critical/high vulnerabilities");
  } else if (vulnerabilities.moderate > 0) {
    recommendations.push("Run 'npm audit fix' to patch moderate vulnerabilities");
  }

  if (licenses.incompatible > 0) {
    recommendations.push('Review and replace packages with incompatible licenses');
  }

  if (licenses.unknown > 0) {
    recommendations.push('Manually review packages with unknown licenses');
  }

  if (secrets.found > 0) {
    recommendations.push('URGENT: Remove secrets from codebase and rotate credentials');
  }

  if (vulnerabilities.moderate === 0 && vulnerabilities.low === 0) {
    recommendations.push('Keep dependencies updated with regular security audits');
  }

  if (recommendations.length === 0) {
    recommendations.push('Security posture is excellent! Continue monitoring regularly');
  }

  return recommendations;
}

/**
 * Display summary report
 */
function displaySummary(report: SecurityReport): void {
  printSection('📊 SUMMARY');

  // Security score with stars
  const stars = Math.ceil(report.score / 20);
  const starStr = '⭐'.repeat(stars);
  console.log(`${colors.bold}Security Score:${colors.reset} ${report.score}/100 ${starStr}\n`);

  // Status
  const statusColor = report.status === 'SAFE' ? colors.green : report.status === 'WARNING' ? colors.yellow : colors.red;
  const statusIcon = report.status === 'SAFE' ? '✅' : report.status === 'WARNING' ? '⚠️' : '🔴';
  console.log(`${colors.bold}Status:${colors.reset} ${statusColor}${statusIcon} ${report.status}${colors.reset}\n`);

  // Quick stats
  console.log(`${colors.bold}Quick Stats:${colors.reset}`);
  console.log(`  ${getStatusIcon(report.vulnerabilities.critical === 0 && report.vulnerabilities.high === 0)} No critical/high vulnerabilities`);
  console.log(`  ${getStatusIcon(report.licenses.incompatible === 0)} License compliant`);
  console.log(`  ${getStatusIcon(report.secrets.found === 0)} No secrets detected`);
  if (report.vulnerabilities.moderate > 0) {
    console.log(`  ${colors.yellow}🟡${colors.reset} ${report.vulnerabilities.moderate} moderate vulnerabilities (non-blocking)`);
  }
  console.log();

  // Recommendations
  if (report.recommendations.length > 0) {
    console.log(`${colors.bold}💡 Recommendations:${colors.reset}`);
    report.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
    console.log();
  }

  console.log(`${colors.bold}Last Scan:${colors.reset} ${report.timestamp}`);
  console.log(`${colors.bold}Report:${colors.reset} security-report-${report.timestamp.split('T')[0]}.json\n`);
}

/**
 * Run full security audit
 */
async function runAudit(): Promise<SecurityReport> {
  printHeader('🔒 Security Scanner Agent');

  const vulnerabilities = await scanVulnerabilities();
  printSection('📊 DEPENDENCY VULNERABILITIES');

  const licenses = await checkLicenses();
  printSection('📜 LICENSE COMPLIANCE');

  const secrets = await detectSecrets();
  printSection('🔐 SECRETS DETECTION');

  const score = calculateSecurityScore(vulnerabilities, licenses, secrets);
  const status = getSecurityStatus(score, vulnerabilities);
  const recommendations = generateRecommendations(vulnerabilities, licenses, secrets);

  const report: SecurityReport = {
    timestamp: new Date().toISOString(),
    vulnerabilities,
    licenses,
    secrets,
    score,
    status,
    recommendations,
  };

  displaySummary(report);

  return report;
}

/**
 * Auto-fix vulnerabilities
 */
async function autoFix(): Promise<void> {
  printHeader('🔧 Auto-Fix Vulnerabilities');

  console.log('Running npm audit fix...\n');
  exec('npm audit fix', false);

  console.log('\n✅ Auto-fix complete. Run audit again to verify.\n');
}

/**
 * Save report to JSON file
 */
function saveReport(report: SecurityReport): void {
  const filename = `security-report-${report.timestamp.split('T')[0]}.json`;
  const filepath = resolve(process.cwd(), filename);

  writeFileSync(filepath, JSON.stringify(report, null, 2));
  console.log(`\n${colors.green}✅ Report saved to: ${filename}${colors.reset}\n`);
}

/**
 * Main CLI handler
 */
async function main() {
  const command = process.argv[2] || 'audit';

  switch (command) {
    case 'audit':
      const report = await runAudit();
      saveReport(report);
      process.exit(report.status === 'CRITICAL' ? 1 : 0);
      break;

    case 'vulns':
      printHeader('🔒 Vulnerability Scan');
      await scanVulnerabilities();
      break;

    case 'licenses':
      printHeader('📜 License Compliance Check');
      await checkLicenses();
      break;

    case 'secrets':
      printHeader('🔐 Secrets Detection');
      const secretsData = await detectSecrets();
      process.exit(secretsData.found > 0 ? 1 : 0);
      break;

    case 'fix':
      await autoFix();
      break;

    case 'report':
      const fullReport = await runAudit();
      saveReport(fullReport);
      break;

    default:
      console.log(`${colors.red}❌ Unknown command: ${command}${colors.reset}`);
      console.log(`\nAvailable commands:`);
      console.log(`  audit    - Full security audit`);
      console.log(`  vulns    - Vulnerability scan only`);
      console.log(`  licenses - License compliance check`);
      console.log(`  secrets  - Secrets detection`);
      console.log(`  fix      - Auto-fix vulnerabilities`);
      console.log(`  report   - Generate JSON report\n`);
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(`${colors.red}❌ Error:${colors.reset}`, error);
  process.exit(1);
});
