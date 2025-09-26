#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

function getDeepKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getDeepKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

function compareStructures() {
  console.log('🔍 Comparing translation structures...\n');

  // Load all files
  const cs = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'cs.json'), 'utf8'));
  const en = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'en.json'), 'utf8'));
  const it = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, 'it.json'), 'utf8'));

  const csKeys = getDeepKeys(cs);
  const enKeys = getDeepKeys(en);
  const itKeys = getDeepKeys(it);

  console.log(`📊 Key counts:`);
  console.log(`   CS: ${csKeys.length}`);
  console.log(`   EN: ${enKeys.length}`);
  console.log(`   IT: ${itKeys.length}`);

  // Check for perfect match
  const csSet = new Set(csKeys);
  const enSet = new Set(enKeys);
  const itSet = new Set(itKeys);

  const enMissing = csKeys.filter(k => !enSet.has(k));
  const enExtra = enKeys.filter(k => !csSet.has(k));

  const itMissing = csKeys.filter(k => !itSet.has(k));
  const itExtra = itKeys.filter(k => !csSet.has(k));

  console.log(`\n🇬🇧 EN vs CS:`);
  if (enMissing.length === 0 && enExtra.length === 0) {
    console.log(`   ✅ Perfect match`);
  } else {
    if (enMissing.length > 0) {
      console.log(`   ❌ Missing ${enMissing.length} keys`);
    }
    if (enExtra.length > 0) {
      console.log(`   ⚠️  Extra ${enExtra.length} keys`);
    }
  }

  console.log(`\n🇮🇹 IT vs CS:`);
  if (itMissing.length === 0 && itExtra.length === 0) {
    console.log(`   ✅ Perfect match`);
  } else {
    if (itMissing.length > 0) {
      console.log(`   ❌ Missing ${itMissing.length} keys`);
    }
    if (itExtra.length > 0) {
      console.log(`   ⚠️  Extra ${itExtra.length} keys`);
    }
  }

  return {
    cs: csKeys.length,
    en: enKeys.length,
    it: itKeys.length,
    enPerfect: enMissing.length === 0 && enExtra.length === 0,
    itPerfect: itMissing.length === 0 && itExtra.length === 0
  };
}

if (require.main === module) {
  compareStructures();
}

module.exports = { compareStructures };