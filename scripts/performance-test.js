#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Running QuickFy Performance Test Suite');
console.log('==========================================\n');

// Performance test configuration
const config = {
  url: 'http://localhost:3000',
  iterations: 3,
  budgetFile: './performance-budget.json'
};

// Check if budget file exists
if (!fs.existsSync(config.budgetFile)) {
  console.error('❌ Performance budget file not found!');
  process.exit(1);
}

const budget = JSON.parse(fs.readFileSync(config.budgetFile, 'utf8'));

// Function to run Lighthouse audit
async function runLighthouseAudit() {
  console.log('🔍 Running Lighthouse Performance Audit...');

  try {
    const result = execSync(
      `lighthouse ${config.url} --only-categories=performance --output=json --output=html --output-path=./lighthouse-report`,
      { encoding: 'utf8', stdio: 'pipe' }
    );

    console.log('✅ Lighthouse audit completed');

    // Parse results
    const reportPath = './lighthouse-report.report.json';
    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const scores = report.lhr.categories.performance.score * 100;

      console.log(`📊 Performance Score: ${scores}/100`);

      // Check Core Web Vitals
      const audits = report.lhr.audits;
      const lcp = audits['largest-contentful-paint'].displayValue;
      const fid = audits['max-potential-fid'].displayValue;
      const cls = audits['cumulative-layout-shift'].displayValue;

      console.log('\n🎯 Core Web Vitals:');
      console.log(`   LCP: ${lcp}`);
      console.log(`   FID: ${fid}`);
      console.log(`   CLS: ${cls}`);

      return {
        score: scores,
        lcp: parseFloat(lcp),
        fid: parseFloat(fid),
        cls: parseFloat(cls)
      };
    }
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error.message);
    return null;
  }
}

// Function to analyze bundle size
function analyzeBundleSize() {
  console.log('\n📦 Analyzing Bundle Size...');

  try {
    // Run build with analyzer
    execSync('npm run build:analyze', { stdio: 'inherit' });

    // Check if .next folder exists
    const buildPath = './.next';
    if (fs.existsSync(buildPath)) {
      const statsPath = path.join(buildPath, 'static');
      if (fs.existsSync(statsPath)) {
        console.log('✅ Bundle analysis completed');
        console.log('📁 Check .next/analyze/ for detailed bundle report');
      }
    }
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error.message);
  }
}

// Function to check performance budgets
function checkPerformanceBudgets(metrics) {
  console.log('\n💰 Checking Performance Budgets...');

  const budgetChecks = budget.budget[0];
  let passed = 0;
  let total = 0;

  // Check timing budgets
  if (budgetChecks.timings && metrics) {
    budgetChecks.timings.forEach(timing => {
      total++;
      const metricName = timing.metric;
      const budgetValue = timing.budget;

      let actualValue;
      switch (metricName) {
        case 'largest-contentful-paint':
          actualValue = metrics.lcp * 1000; // Convert to ms
          break;
        case 'first-input-delay':
          actualValue = metrics.fid;
          break;
        case 'cumulative-layout-shift':
          actualValue = metrics.cls;
          break;
        default:
          return;
      }

      const isPassing = actualValue <= budgetValue;
      const status = isPassing ? '✅' : '❌';
      const diff = isPassing ? '' : ` (over by ${actualValue - budgetValue})`;

      console.log(`${status} ${metricName}: ${actualValue} / ${budgetValue}${diff}`);

      if (isPassing) passed++;
    });
  }

  console.log(`\n📈 Performance Budget: ${passed}/${total} checks passed`);
  return passed === total;
}

// Function to generate performance report
function generateReport(results) {
  console.log('\n📄 Generating Performance Report...');

  const report = {
    timestamp: new Date().toISOString(),
    url: config.url,
    results: results,
    recommendations: [
      'Optimize component animations using requestAnimationFrame',
      'Implement lazy loading for non-critical components',
      'Extract inline scripts to external files',
      'Add proper cleanup for observers and event listeners',
      'Implement performance budgets in CI/CD pipeline'
    ]
  };

  const reportPath = './performance-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`✅ Report saved to ${reportPath}`);
}

// Main execution
async function main() {
  try {
    // Start development server check
    console.log('🔄 Checking if development server is running...');
    try {
      execSync(`curl -f ${config.url}`, { stdio: 'pipe' });
      console.log('✅ Development server is running');
    } catch {
      console.log('⚠️  Starting development server...');
      const serverProcess = require('child_process').spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        detached: false
      });

      // Wait for server to start
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    // Run performance tests
    const lighthouseResults = await runLighthouseAudit();
    analyzeBundleSize();

    if (lighthouseResults) {
      const budgetsPassed = checkPerformanceBudgets(lighthouseResults);
      generateReport({
        lighthouse: lighthouseResults,
        budgetsPassed
      });

      console.log('\n🎉 Performance Test Suite Completed!');
      console.log('==========================================');

      if (!budgetsPassed) {
        console.log('⚠️  Some performance budgets were not met. Check the report for details.');
        process.exit(1);
      }
    }

  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}