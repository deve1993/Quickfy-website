#!/usr/bin/env node

/**
 * Translation Analysis Script
 * Analyzes translation files for consistency, missing keys, and usage patterns
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const SRC_DIR = path.join(__dirname, '..', 'src');
const REQUIRED_LOCALES = ['cs', 'en', 'it'];

// Utility functions
function getAllTranslationKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllTranslationKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function findTranslationUsage(dir, translationKeys) {
  const usedKeys = new Set();
  const unusedKeys = [...translationKeys];

  function scanFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Find t('key') patterns
      const tPatterns = content.match(/t\(['"](.*?)['"]\)/g) || [];
      tPatterns.forEach(match => {
        const key = match.match(/t\(['"](.*?)['"]\)/)[1];
        usedKeys.add(key);
        const index = unusedKeys.indexOf(key);
        if (index > -1) unusedKeys.splice(index, 1);
      });

      // Find t.rich('key') patterns
      const tRichPatterns = content.match(/t\.rich\(['"](.*?)['"]/g) || [];
      tRichPatterns.forEach(match => {
        const key = match.match(/t\.rich\(['"](.*?)['"]/)[1];
        usedKeys.add(key);
        const index = unusedKeys.indexOf(key);
        if (index > -1) unusedKeys.splice(index, 1);
      });

    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}: ${error.message}`);
    }
  }

  function scanDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(itemPath);
      } else if (stat.isFile()) {
        scanFile(itemPath);
      }
    }
  }

  scanDirectory(dir);
  return { usedKeys: Array.from(usedKeys), unusedKeys };
}

function analyzeTranslations() {
  console.log('🔍 Analyzing translation files...\n');

  // Load all translation files
  const translations = {};
  const allKeys = {};

  for (const locale of REQUIRED_LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);

    if (!fs.existsSync(filePath)) {
      console.log(`❌ Missing translation file: ${locale}.json`);
      continue;
    }

    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      translations[locale] = content;
      allKeys[locale] = getAllTranslationKeys(content);
      console.log(`✅ Loaded ${locale}.json: ${allKeys[locale].length} keys`);
    } catch (error) {
      console.log(`❌ Error loading ${locale}.json: ${error.message}`);
    }
  }

  if (Object.keys(translations).length === 0) {
    console.log('❌ No valid translation files found!');
    return;
  }

  console.log('\n📊 Translation Analysis Results:\n');

  // 1. Key Consistency Analysis
  console.log('🔗 Key Consistency Analysis:');
  const baseLocale = REQUIRED_LOCALES[0]; // Czech as base
  if (allKeys[baseLocale]) {
    for (const locale of REQUIRED_LOCALES) {
      if (locale === baseLocale || !allKeys[locale]) continue;

      const missingInLocale = allKeys[baseLocale].filter(key => !allKeys[locale].includes(key));
      const extraInLocale = allKeys[locale].filter(key => !allKeys[baseLocale].includes(key));

      console.log(`\n  ${locale.toUpperCase()} vs ${baseLocale.toUpperCase()}:`);

      if (missingInLocale.length > 0) {
        console.log(`    ❌ Missing ${missingInLocale.length} keys:`);
        missingInLocale.slice(0, 10).forEach(key => console.log(`       - ${key}`));
        if (missingInLocale.length > 10) {
          console.log(`       ... and ${missingInLocale.length - 10} more`);
        }
      }

      if (extraInLocale.length > 0) {
        console.log(`    ⚠️  Extra ${extraInLocale.length} keys:`);
        extraInLocale.slice(0, 5).forEach(key => console.log(`       + ${key}`));
        if (extraInLocale.length > 5) {
          console.log(`       ... and ${extraInLocale.length - 5} more`);
        }
      }

      if (missingInLocale.length === 0 && extraInLocale.length === 0) {
        console.log(`    ✅ Perfect key consistency`);
      }
    }
  }

  // 2. Usage Analysis
  console.log('\n🎯 Translation Usage Analysis:');
  if (allKeys[baseLocale]) {
    const { usedKeys, unusedKeys } = findTranslationUsage(SRC_DIR, allKeys[baseLocale]);

    console.log(`\n  📈 Usage Statistics:`);
    console.log(`    Total keys: ${allKeys[baseLocale].length}`);
    console.log(`    Used keys: ${usedKeys.length}`);
    console.log(`    Unused keys: ${unusedKeys.length}`);
    console.log(`    Usage rate: ${Math.round((usedKeys.length / allKeys[baseLocale].length) * 100)}%`);

    if (unusedKeys.length > 0) {
      console.log(`\n  🗑️  Potentially unused keys (first 10):`);
      unusedKeys.slice(0, 10).forEach(key => console.log(`       - ${key}`));
      if (unusedKeys.length > 10) {
        console.log(`       ... and ${unusedKeys.length - 10} more`);
      }
    }
  }

  // 3. Structure Analysis
  console.log('\n🏗️  Structure Analysis:');
  for (const locale of REQUIRED_LOCALES) {
    if (!translations[locale]) continue;

    const requiredSections = ['meta', 'navigation', 'hero', 'features', 'benefits'];
    const missingSections = requiredSections.filter(section => !translations[locale][section]);

    console.log(`\n  ${locale.toUpperCase()}:`);
    console.log(`    Total sections: ${Object.keys(translations[locale]).length}`);

    if (missingSections.length > 0) {
      console.log(`    ❌ Missing sections: ${missingSections.join(', ')}`);
    } else {
      console.log(`    ✅ All required sections present`);
    }

    // Check for empty values
    const emptyKeys = allKeys[locale].filter(key => {
      const value = key.split('.').reduce((obj, k) => obj?.[k], translations[locale]);
      return !value || (typeof value === 'string' && value.trim() === '');
    });

    if (emptyKeys.length > 0) {
      console.log(`    ⚠️  Empty values: ${emptyKeys.length} keys`);
      emptyKeys.slice(0, 5).forEach(key => console.log(`       - ${key}`));
      if (emptyKeys.length > 5) {
        console.log(`       ... and ${emptyKeys.length - 5} more`);
      }
    }
  }

  // 4. File Size Analysis
  console.log('\n📏 File Size Analysis:');
  for (const locale of REQUIRED_LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`  ${locale}.json: ${Math.round(stats.size / 1024)}KB`);
    }
  }

  console.log('\n✨ Analysis complete!');
}

// Run analysis
if (require.main === module) {
  analyzeTranslations();
}

module.exports = { analyzeTranslations };