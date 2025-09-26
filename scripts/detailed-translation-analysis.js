#!/usr/bin/env node

/**
 * Detailed Translation Analysis Script
 * More granular analysis of translation usage including array indices
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const SRC_DIR = path.join(__dirname, '..', 'src');
const REQUIRED_LOCALES = ['cs', 'en', 'it'];

function extractUsedTranslationKeys(dir) {
  const usedKeys = new Set();
  const usedArrayKeys = new Set();

  function scanFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Find all t('key') patterns - including nested keys
      const tPatterns = content.match(/t\(['"]([\w\.]+)['"]\)/g) || [];
      tPatterns.forEach(match => {
        const key = match.match(/t\(['"]([\w\.]+)['"]\)/)[1];
        usedKeys.add(key);
      });

      // Find t.rich patterns
      const tRichPatterns = content.match(/t\.rich\(['"]([\w\.]+)['"]/g) || [];
      tRichPatterns.forEach(match => {
        const key = match.match(/t\.rich\(['"]([\w\.]+)['"]/)[1];
        usedKeys.add(key);
      });

      // Find array access patterns like t('items.0.title')
      const arrayPatterns = content.match(/t\(['"]([\w\.]+\.\d+[\w\.]*)['"]\)/g) || [];
      arrayPatterns.forEach(match => {
        const key = match.match(/t\(['"]([\w\.]+\.\d+[\w\.]*)['"]\)/)[1];
        usedArrayKeys.add(key);
        // Also mark the parent array as used
        const parentKey = key.replace(/\.\d+.*$/, '');
        usedKeys.add(parentKey);
      });

      // Find dynamic array access patterns
      const dynamicArrayPatterns = content.match(/t\([`"']([\w\.]+)\$\{[\w\s\+\-\*\/\(\)]*\}([\w\.]*)[`"']\)/g) || [];
      dynamicArrayPatterns.forEach(match => {
        // For template literals like t(`items.${index}.title`)
        const baseKey = match.match(/[`"']([\w\.]+)\$\{[^}]+\}([\w\.]*)[`"']/);
        if (baseKey) {
          const parentKey = baseKey[1].replace(/\.$/, '');
          usedKeys.add(parentKey);
        }
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
  return { usedKeys: Array.from(usedKeys), usedArrayKeys: Array.from(usedArrayKeys) };
}

function getAllTranslationKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      // For arrays, include the array key itself and individual indices
      keys.push(fullKey);
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          keys.push(...getAllTranslationKeys(item, `${fullKey}.${index}`));
        } else {
          keys.push(`${fullKey}.${index}`);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      keys.push(...getAllTranslationKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function analyzeTranslationUsage() {
  console.log('🔍 Detailed Translation Usage Analysis...\n');

  // Load translation file
  const baseLocale = 'cs';
  const translationPath = path.join(MESSAGES_DIR, `${baseLocale}.json`);

  if (!fs.existsSync(translationPath)) {
    console.log(`❌ Translation file not found: ${baseLocale}.json`);
    return;
  }

  const translations = JSON.parse(fs.readFileSync(translationPath, 'utf8'));
  const allKeys = getAllTranslationKeys(translations);

  console.log(`📋 Total translation keys: ${allKeys.length}`);

  // Analyze usage
  const { usedKeys, usedArrayKeys } = extractUsedTranslationKeys(SRC_DIR);

  console.log(`✅ Used keys: ${usedKeys.length}`);
  console.log(`🔢 Used array keys: ${usedArrayKeys.length}`);

  // Find unused keys
  const unusedKeys = allKeys.filter(key => {
    // Check if key is directly used
    if (usedKeys.includes(key)) return false;

    // Check if key is used via array access
    if (usedArrayKeys.includes(key)) return false;

    // Check if key is part of an array that's being accessed dynamically
    const keyParts = key.split('.');
    for (let i = 1; i < keyParts.length; i++) {
      const parentKey = keyParts.slice(0, i).join('.');
      if (usedKeys.includes(parentKey)) {
        // Parent is used, check if this could be array access
        const remainingPath = keyParts.slice(i).join('.');
        if (remainingPath.match(/^\d+/)) {
          return false; // This is likely array access
        }
      }
    }

    return true;
  });

  console.log(`\n🗑️  Truly unused keys (${unusedKeys.length}):`);

  // Group unused keys by section
  const unusedBySection = {};
  unusedKeys.forEach(key => {
    const section = key.split('.')[0];
    if (!unusedBySection[section]) {
      unusedBySection[section] = [];
    }
    unusedBySection[section].push(key);
  });

  Object.entries(unusedBySection).forEach(([section, keys]) => {
    console.log(`\n  📁 ${section.toUpperCase()} (${keys.length} unused):`);
    keys.slice(0, 10).forEach(key => {
      console.log(`     - ${key}`);
    });
    if (keys.length > 10) {
      console.log(`     ... and ${keys.length - 10} more`);
    }
  });

  // Show used array keys
  if (usedArrayKeys.length > 0) {
    console.log(`\n🔢 Array keys being used:`);
    usedArrayKeys.slice(0, 10).forEach(key => {
      console.log(`   - ${key}`);
    });
    if (usedArrayKeys.length > 10) {
      console.log(`   ... and ${usedArrayKeys.length - 10} more`);
    }
  }

  // Show usage statistics
  const usageRate = Math.round(((allKeys.length - unusedKeys.length) / allKeys.length) * 100);
  console.log(`\n📊 Usage Statistics:`);
  console.log(`   Total keys: ${allKeys.length}`);
  console.log(`   Used keys: ${allKeys.length - unusedKeys.length}`);
  console.log(`   Unused keys: ${unusedKeys.length}`);
  console.log(`   Usage rate: ${usageRate}%`);

  return {
    totalKeys: allKeys.length,
    usedKeys: allKeys.length - unusedKeys.length,
    unusedKeys: unusedKeys.length,
    usageRate
  };
}

// Run analysis
if (require.main === module) {
  analyzeTranslationUsage();
}

module.exports = { analyzeTranslationUsage };