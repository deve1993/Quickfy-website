#!/usr/bin/env node

/**
 * Final Internationalization Validation Report
 * Comprehensive validation of the entire i18n setup
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const SRC_DIR = path.join(__dirname, '..', 'src');
const REQUIRED_LOCALES = ['cs', 'en', 'it'];

function validateI18nSetup() {
  console.log('🌍 QuickFy Website - Internationalization Validation Report');
  console.log('============================================================\n');

  const issues = [];
  const successes = [];

  // 1. Check translation files existence and validity
  console.log('📁 Translation Files Validation:');
  let allFilesValid = true;

  for (const locale of REQUIRED_LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);

    if (!fs.existsSync(filePath)) {
      issues.push(`Missing translation file: ${locale}.json`);
      allFilesValid = false;
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);

      // Check required structure
      const requiredSections = ['meta', 'navigation', 'hero', 'features'];
      const missingSections = requiredSections.filter(section => !parsed[section]);

      if (missingSections.length > 0) {
        issues.push(`${locale}.json missing sections: ${missingSections.join(', ')}`);
      }

      if (parsed.meta && parsed.meta.locale !== locale) {
        issues.push(`${locale}.json has incorrect meta.locale: ${parsed.meta.locale}`);
      }

      const stats = fs.statSync(filePath);
      console.log(`   ✅ ${locale}.json - ${Math.round(stats.size / 1024)}KB, ${Object.keys(parsed).length} sections`);

    } catch (error) {
      issues.push(`${locale}.json has invalid JSON: ${error.message}`);
      allFilesValid = false;
    }
  }

  if (allFilesValid) {
    successes.push('All translation files are valid JSON');
  }

  // 2. Check key consistency
  console.log('\n🔗 Key Consistency Validation:');
  if (allFilesValid) {
    const translations = {};
    const allKeys = {};

    for (const locale of REQUIRED_LOCALES) {
      const content = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), 'utf8'));
      translations[locale] = content;
      allKeys[locale] = getAllKeys(content);
    }

    const baseLocale = REQUIRED_LOCALES[0];
    let keyConsistency = true;

    for (const locale of REQUIRED_LOCALES) {
      if (locale === baseLocale) continue;

      const missingKeys = allKeys[baseLocale].filter(key => !allKeys[locale].includes(key));
      const extraKeys = allKeys[locale].filter(key => !allKeys[baseLocale].includes(key));

      if (missingKeys.length > 0 || extraKeys.length > 0) {
        issues.push(`Key mismatch in ${locale}: ${missingKeys.length} missing, ${extraKeys.length} extra`);
        keyConsistency = false;
      }
    }

    if (keyConsistency) {
      successes.push('Perfect key consistency across all languages');
      console.log('   ✅ All languages have identical key structure');
    }

    console.log(`   📊 Total translation keys: ${allKeys[baseLocale].length}`);
  }

  // 3. Check configuration files
  console.log('\n⚙️  Configuration Validation:');

  // Check i18n request config
  const i18nConfigPath = path.join(SRC_DIR, 'i18n', 'request.ts');
  if (fs.existsSync(i18nConfigPath)) {
    const configContent = fs.readFileSync(i18nConfigPath, 'utf8');

    if (configContent.includes("['cs', 'en', 'it']")) {
      successes.push('i18n request configuration is correct');
      console.log('   ✅ i18n/request.ts configuration is valid');
    } else {
      issues.push('i18n/request.ts locale configuration may be incorrect');
    }

    if (configContent.includes("defaultLocale = 'cs'")) {
      console.log('   ✅ Default locale correctly set to Czech');
    } else {
      issues.push('Default locale configuration issue');
    }
  } else {
    issues.push('Missing i18n/request.ts configuration file');
  }

  // Check middleware
  const middlewarePath = path.join(SRC_DIR, 'middleware.ts');
  if (fs.existsSync(middlewarePath)) {
    const middlewareContent = fs.readFileSync(middlewarePath, 'utf8');

    if (middlewareContent.includes('/(cs|en|it)/:path*')) {
      successes.push('Middleware locale routing is correctly configured');
      console.log('   ✅ Middleware locale routing is valid');
    } else {
      issues.push('Middleware locale routing configuration issue');
    }
  } else {
    issues.push('Missing middleware.ts file');
  }

  // Check next.config
  const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
  if (fs.existsSync(nextConfigPath)) {
    const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

    if (nextConfigContent.includes('next-intl/plugin')) {
      successes.push('Next.js configuration includes next-intl plugin');
      console.log('   ✅ next.config.ts includes next-intl plugin');
    } else {
      issues.push('next.config.ts missing next-intl plugin configuration');
    }
  } else {
    issues.push('Missing next.config.ts file');
  }

  // 4. Check package.json scripts
  console.log('\n📦 Build Process Validation:');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    if (packageJson.scripts && packageJson.scripts['validate:translations']) {
      successes.push('Translation validation script is configured');
      console.log('   ✅ Translation validation script exists');
    }

    if (packageJson.scripts && packageJson.scripts.build &&
        packageJson.scripts.build.includes('validate:translations')) {
      successes.push('Build process includes translation validation');
      console.log('   ✅ Build process validates translations');
    }

    if (packageJson.dependencies && packageJson.dependencies['next-intl']) {
      console.log(`   ✅ next-intl dependency: ${packageJson.dependencies['next-intl']}`);
    } else {
      issues.push('Missing next-intl dependency');
    }
  }

  // 5. Summary
  console.log('\n📊 Validation Summary:');
  console.log('======================');

  if (successes.length > 0) {
    console.log('\n✅ Successes:');
    successes.forEach(success => console.log(`   • ${success}`));
  }

  if (issues.length > 0) {
    console.log('\n❌ Issues Found:');
    issues.forEach(issue => console.log(`   • ${issue}`));
  } else {
    console.log('\n🎉 No issues found! Internationalization setup is fully validated.');
  }

  console.log(`\n📈 Validation Score: ${successes.length}/${successes.length + issues.length} (${Math.round((successes.length / (successes.length + issues.length)) * 100)}%)`);

  return {
    successes: successes.length,
    issues: issues.length,
    score: Math.round((successes.length / (successes.length + issues.length)) * 100)
  };
}

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Run validation
if (require.main === module) {
  validateI18nSetup();
}

module.exports = { validateI18nSetup };