#!/usr/bin/env node

/**
 * JSON Validation Script for Translation Files
 * Validates all JSON files in the messages directory
 * Prevents build failures due to JSON parsing errors
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const REQUIRED_LOCALES = ['cs', 'en', 'it'];

function validateJSONFile(filePath) {
  console.log(`\n🔍 Validating: ${path.basename(filePath)}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for common JSON issues
    const issues = [];
    
    // Check for unescaped quotes
    if (content.includes('Au\'') && !content.includes('Au\\\'')) {
      issues.push('Potential unescaped apostrophe found');
    }
    
    // Check for unclosed strings (basic check)
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('"') && trimmed.includes(':')) {
        const beforeColon = trimmed.split(':')[0];
        const quoteCount = (beforeColon.match(/"/g) || []).length;
        if (quoteCount % 2 !== 0) {
          issues.push(`Line ${index + 1}: Possible unclosed quote in key`);
        }
      }
      
      // Check for lines ending without comma or closing bracket/brace
      if (trimmed.endsWith('"') && !trimmed.endsWith('",') && !trimmed.endsWith('"') && 
          index < lines.length - 1 && !lines[index + 1].trim().startsWith('}') && 
          !lines[index + 1].trim().startsWith(']')) {
        const nextLine = lines[index + 1].trim();
        if (nextLine.startsWith('"') || nextLine.startsWith('{') || nextLine.startsWith('[')) {
          issues.push(`Line ${index + 1}: Missing comma after string value`);
        }
      }
    });
    
    // Parse JSON to validate structure
    const parsed = JSON.parse(content);
    
    // Validate required structure
    if (!parsed.meta || !parsed.meta.locale) {
      issues.push('Missing required meta.locale field');
    }
    
    if (!parsed.navigation) {
      issues.push('Missing navigation section');
    }
    
    if (!parsed.hero) {
      issues.push('Missing hero section');
    }
    
    if (issues.length > 0) {
      console.log('⚠️  Issues found:');
      issues.forEach(issue => console.log(`   - ${issue}`));
      return false;
    }
    
    console.log('✅ Valid JSON structure');
    return true;
    
  } catch (error) {
    console.log(`❌ JSON Parse Error: ${error.message}`);
    
    // Try to give more specific error location
    const match = error.message.match(/position (\d+)/);
    if (match) {
      const position = parseInt(match[1]);
      const content = fs.readFileSync(filePath, 'utf8');
      const beforeError = content.substring(0, position);
      const lineNumber = beforeError.split('\n').length;
      const columnNumber = beforeError.split('\n').pop().length;
      console.log(`   Location: Line ${lineNumber}, Column ${columnNumber}`);
      
      // Show context around error
      const lines = content.split('\n');
      const contextStart = Math.max(0, lineNumber - 3);
      const contextEnd = Math.min(lines.length, lineNumber + 2);
      
      console.log('\n   Context:');
      for (let i = contextStart; i < contextEnd; i++) {
        const marker = i === lineNumber - 1 ? '>>> ' : '    ';
        console.log(`   ${marker}${i + 1}: ${lines[i]}`);
      }
    }
    
    return false;
  }
}

function validateAllTranslations() {
  console.log('🌍 Validating translation files...\n');
  
  if (!fs.existsSync(MESSAGES_DIR)) {
    console.log(`❌ Messages directory not found: ${MESSAGES_DIR}`);
    process.exit(1);
  }
  
  let allValid = true;
  const results = {};
  
  // Check each required locale
  for (const locale of REQUIRED_LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Missing translation file: ${locale}.json`);
      allValid = false;
      continue;
    }
    
    const isValid = validateJSONFile(filePath);
    results[locale] = isValid;
    
    if (!isValid) {
      allValid = false;
    }
  }
  
  // Summary
  console.log('\n📊 Validation Summary:');
  for (const [locale, isValid] of Object.entries(results)) {
    const status = isValid ? '✅' : '❌';
    console.log(`   ${status} ${locale}.json`);
  }
  
  if (allValid) {
    console.log('\n🎉 All translation files are valid!');
    process.exit(0);
  } else {
    console.log('\n💥 Validation failed! Please fix the errors above.');
    process.exit(1);
  }
}

// Run validation
if (require.main === module) {
  validateAllTranslations();
}

module.exports = { validateJSONFile, validateAllTranslations };