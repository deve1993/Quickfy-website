#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load translation files
const loadTranslations = () => {
  const messagesDir = path.join(__dirname, '..', 'messages');

  const cs = JSON.parse(fs.readFileSync(path.join(messagesDir, 'cs.json'), 'utf8'));
  const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8'));
  const it = JSON.parse(fs.readFileSync(path.join(messagesDir, 'it.json'), 'utf8'));

  return { cs, en, it };
};

// Helper function to get nested value
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object') {
      return current[key];
    }
    return undefined;
  }, obj);
};

// Helper function to get all paths in an object
const getAllPaths = (obj, prefix = '') => {
  const paths = [];

  const traverse = (current, currentPath) => {
    if (current === null || current === undefined) return;

    if (typeof current === 'object' && !Array.isArray(current)) {
      for (const key in current) {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        traverse(current[key], newPath);
      }
    } else {
      paths.push(currentPath);
    }
  };

  traverse(obj, prefix);
  return paths;
};

// Analysis functions
const analyzeStructuralConsistency = (translations) => {
  const { cs, en, it } = translations;

  const csPaths = new Set(getAllPaths(cs));
  const enPaths = new Set(getAllPaths(en));
  const itPaths = new Set(getAllPaths(it));

  const allPaths = new Set([...csPaths, ...enPaths, ...itPaths]);

  const issues = [];

  for (const path of allPaths) {
    const hasCs = csPaths.has(path);
    const hasEn = enPaths.has(path);
    const hasIt = itPaths.has(path);

    if (!hasCs || !hasEn || !hasIt) {
      issues.push({
        type: 'MISSING_KEY',
        priority: 'CRITICAL',
        path,
        missing: [
          !hasCs && 'Czech',
          !hasEn && 'English',
          !hasIt && 'Italian'
        ].filter(Boolean),
        description: `Translation key missing in: ${[!hasCs && 'Czech', !hasEn && 'English', !hasIt && 'Italian'].filter(Boolean).join(', ')}`
      });
    }
  }

  return issues;
};

const analyzeMeaningConsistency = (translations) => {
  const { cs, en, it } = translations;
  const issues = [];

  // Key value analysis
  const criticalPaths = [
    'meta.title',
    'meta.description',
    'hero.headline',
    'hero.headlineHighlight',
    'hero.subheadline',
    'hero.cta.primary',
    'features.title',
    'features.titleHighlight',
    'benefits.title',
    'benefits.titleHighlight',
    'pricing.title',
    'contact.title',
    'contact.titleHighlight'
  ];

  for (const path of criticalPaths) {
    const csValue = getNestedValue(cs, path);
    const enValue = getNestedValue(en, path);
    const itValue = getNestedValue(it, path);

    if (csValue && enValue && itValue) {
      // Check for key concept consistency
      const enHasMarketing = /marketing/i.test(enValue);
      const csHasMarketing = /marketing/i.test(csValue);
      const itHasMarketing = /marketing/i.test(itValue);

      const enHasAutomation = /automation/i.test(enValue);
      const csHasAutomation = /automatizac/i.test(csValue);
      const itHasAutomation = /automazione/i.test(itValue);

      const enHasCRM = /crm/i.test(enValue);
      const csHasCRM = /crm/i.test(csValue);
      const itHasCRM = /crm/i.test(itValue);

      const enHasROI = /roi/i.test(enValue);
      const csHasROI = /roi/i.test(csValue);
      const itHasROI = /roi/i.test(itValue);

      if (enHasMarketing !== csHasMarketing || enHasMarketing !== itHasMarketing) {
        issues.push({
          type: 'CONCEPT_INCONSISTENCY',
          priority: 'HIGH',
          path,
          concept: 'Marketing',
          description: `"Marketing" concept inconsistently used across languages`,
          values: { en: enValue, cs: csValue, it: itValue }
        });
      }

      if (enHasAutomation !== csHasAutomation || enHasAutomation !== itHasAutomation) {
        issues.push({
          type: 'CONCEPT_INCONSISTENCY',
          priority: 'HIGH',
          path,
          concept: 'Automation',
          description: `"Automation" concept inconsistently used across languages`,
          values: { en: enValue, cs: csValue, it: itValue }
        });
      }

      if (enHasCRM !== csHasCRM || enHasCRM !== itHasCRM) {
        issues.push({
          type: 'CONCEPT_INCONSISTENCY',
          priority: 'MEDIUM',
          path,
          concept: 'CRM',
          description: `"CRM" technical term inconsistently used across languages`,
          values: { en: enValue, cs: csValue, it: itValue }
        });
      }

      if (enHasROI !== csHasROI || enHasROI !== itHasROI) {
        issues.push({
          type: 'CONCEPT_INCONSISTENCY',
          priority: 'MEDIUM',
          path,
          concept: 'ROI',
          description: `"ROI" technical term inconsistently used across languages`,
          values: { en: enValue, cs: csValue, it: itValue }
        });
      }
    }
  }

  return issues;
};

const analyzeTechnicalTerms = (translations) => {
  const { cs, en, it } = translations;
  const issues = [];

  const technicalTerms = {
    'CRM': { en: 'CRM', expected: { cs: 'CRM', it: 'CRM' } },
    'ROI': { en: 'ROI', expected: { cs: 'ROI', it: 'ROI' } },
    'Analytics': { en: 'Analytics', expected: { cs: 'Analytics', it: 'Analytics' } },
    'Dashboard': { en: 'Dashboard', expected: { cs: 'Dashboard', it: 'Dashboard' } },
    'Email': { en: 'Email', expected: { cs: 'Email', it: 'Email' } }
  };

  // Check features section for technical term consistency
  const featuresItems = getNestedValue(en, 'features.items');
  if (featuresItems && Array.isArray(featuresItems)) {
    featuresItems.forEach((item, index) => {
      const csItem = getNestedValue(cs, `features.items.${index}`);
      const itItem = getNestedValue(it, `features.items.${index}`);

      if (csItem && itItem) {
        // Check titles
        const enTitle = item.title || '';
        const csTitle = csItem.title || '';
        const itTitle = itItem.title || '';

        Object.entries(technicalTerms).forEach(([term, config]) => {
          const enHasTerm = new RegExp(term, 'i').test(enTitle);
          const csHasTerm = new RegExp(config.expected.cs, 'i').test(csTitle);
          const itHasTerm = new RegExp(config.expected.it, 'i').test(itTitle);

          if (enHasTerm && (!csHasTerm || !itHasTerm)) {
            issues.push({
              type: 'TECHNICAL_TERM_INCONSISTENCY',
              priority: 'MEDIUM',
              path: `features.items.${index}.title`,
              term,
              description: `Technical term "${term}" inconsistently handled`,
              values: { en: enTitle, cs: csTitle, it: itTitle }
            });
          }
        });
      }
    });
  }

  return issues;
};

const analyzeBrandVoice = (translations) => {
  const { cs, en, it } = translations;
  const issues = [];

  // Check CTA consistency
  const ctaPaths = [
    'hero.cta.primary',
    'contact.form.submit',
    'pricing.plans.analytics.cta'
  ];

  for (const path of ctaPaths) {
    const enValue = getNestedValue(en, path);
    const csValue = getNestedValue(cs, path);
    const itValue = getNestedValue(it, path);

    if (enValue && csValue && itValue) {
      // Check urgency level
      const enUrgent = /now|today|start|try/i.test(enValue);
      const csUrgent = /nyní|dnes|začněte|vyzkoušet/i.test(csValue);
      const itUrgent = /ora|oggi|inizia|prova/i.test(itValue);

      if (enUrgent !== csUrgent || enUrgent !== itUrgent) {
        issues.push({
          type: 'BRAND_VOICE_INCONSISTENCY',
          priority: 'HIGH',
          path,
          aspect: 'CTA Urgency',
          description: `Call-to-action urgency levels inconsistent across languages`,
          values: { en: enValue, cs: csValue, it: itValue }
        });
      }
    }
  }

  return issues;
};

const analyzeFeatureDescriptions = (translations) => {
  const { cs, en, it } = translations;
  const issues = [];

  const featuresItems = getNestedValue(en, 'features.items');
  if (featuresItems && Array.isArray(featuresItems)) {
    featuresItems.forEach((item, index) => {
      const csItem = getNestedValue(cs, `features.items.${index}`);
      const itItem = getNestedValue(it, `features.items.${index}`);

      if (csItem && itItem) {
        // Check benefits array length
        const enBenefits = item.benefits || [];
        const csBenefits = csItem.benefits || [];
        const itBenefits = itItem.benefits || [];

        if (enBenefits.length !== csBenefits.length || enBenefits.length !== itBenefits.length) {
          issues.push({
            type: 'FEATURE_DESCRIPTION_MISMATCH',
            priority: 'HIGH',
            path: `features.items.${index}.benefits`,
            description: `Different number of benefits listed across languages`,
            counts: {
              en: enBenefits.length,
              cs: csBenefits.length,
              it: itBenefits.length
            }
          });
        }

        // Check for key feature concepts
        const enDesc = item.description || '';
        const csDesc = csItem.description || '';
        const itDesc = itItem.description || '';

        const enHasAutomation = /automation/i.test(enDesc);
        const csHasAutomation = /automatizac/i.test(csDesc);
        const itHasAutomation = /automazione/i.test(itDesc);

        if (enHasAutomation !== csHasAutomation || enHasAutomation !== itHasAutomation) {
          issues.push({
            type: 'FEATURE_DESCRIPTION_MISMATCH',
            priority: 'MEDIUM',
            path: `features.items.${index}.description`,
            concept: 'Automation',
            description: `Feature automation concept inconsistently described`,
            values: { en: enDesc, cs: csDesc, it: itDesc }
          });
        }
      }
    });
  }

  return issues;
};

const analyzeTestimonials = (translations) => {
  const { cs, en, it } = translations;
  const issues = [];

  // Check testimonial names and companies for localization
  for (let i = 1; i <= 5; i++) {
    const enName = getNestedValue(en, `testimonials.testimonial${i}.name`);
    const csName = getNestedValue(cs, `testimonials.testimonial${i}.name`);
    const itName = getNestedValue(it, `testimonials.testimonial${i}.name`);

    const enCompany = getNestedValue(en, `testimonials.testimonial${i}.company`);
    const csCompany = getNestedValue(cs, `testimonials.testimonial${i}.company`);
    const itCompany = getNestedValue(it, `testimonials.testimonial${i}.company`);

    if (enName && csName && itName) {
      // Check if names are properly localized
      const isEnglishName = /^[A-Za-z\s]+$/.test(enName);
      const isCzechName = /^[A-Za-z\s]+$/.test(csName);
      const isItalianName = /^[A-Za-z\s]+$/.test(itName);

      if (enName === csName && enName === itName) {
        issues.push({
          type: 'LOCALIZATION_MISSING',
          priority: 'LOW',
          path: `testimonials.testimonial${i}.name`,
          description: `Testimonial names not localized across languages`,
          values: { en: enName, cs: csName, it: itName }
        });
      }
    }

    if (enCompany && csCompany && itCompany) {
      // Check company name localization
      if (enCompany !== csCompany || enCompany !== itCompany) {
        // This is actually good - companies should be localized
      } else {
        issues.push({
          type: 'LOCALIZATION_OPPORTUNITY',
          priority: 'LOW',
          path: `testimonials.testimonial${i}.company`,
          description: `Company names could be more localized`,
          values: { en: enCompany, cs: csCompany, it: itCompany }
        });
      }
    }
  }

  return issues;
};

const analyzeMetrics = (translations) => {
  const { cs, en, it } = translations;
  const issues = [];

  // Check hero metrics
  const metricsKeys = ['hoursSaved', 'roiImprovement', 'clarity'];

  for (const key of metricsKeys) {
    const enValue = getNestedValue(en, `hero.metrics.${key}`);
    const csValue = getNestedValue(cs, `hero.metrics.${key}`);
    const itValue = getNestedValue(it, `hero.metrics.${key}`);

    if (enValue && csValue && itValue) {
      // Extract numbers
      const enNumber = enValue.match(/\d+/)?.[0];
      const csNumber = csValue.match(/\d+/)?.[0];
      const itNumber = itValue.match(/\d+/)?.[0];

      if (enNumber !== csNumber || enNumber !== itNumber) {
        issues.push({
          type: 'METRIC_INCONSISTENCY',
          priority: 'CRITICAL',
          path: `hero.metrics.${key}`,
          description: `Metric values differ across languages`,
          values: { en: enValue, cs: csValue, it: itValue },
          numbers: { en: enNumber, cs: csNumber, it: itNumber }
        });
      }
    }
  }

  return issues;
};

// Main analysis function
const runComprehensiveAnalysis = () => {
  console.log('🔍 QuickFy Translation Consistency Analysis\n');
  console.log('==========================================\n');

  const translations = loadTranslations();

  const allIssues = [
    ...analyzeStructuralConsistency(translations),
    ...analyzeMeaningConsistency(translations),
    ...analyzeTechnicalTerms(translations),
    ...analyzeBrandVoice(translations),
    ...analyzeFeatureDescriptions(translations),
    ...analyzeTestimonials(translations),
    ...analyzeMetrics(translations)
  ];

  // Group by priority
  const critical = allIssues.filter(issue => issue.priority === 'CRITICAL');
  const high = allIssues.filter(issue => issue.priority === 'HIGH');
  const medium = allIssues.filter(issue => issue.priority === 'MEDIUM');
  const low = allIssues.filter(issue => issue.priority === 'LOW');

  console.log(`📊 SUMMARY:`);
  console.log(`   Total Issues: ${allIssues.length}`);
  console.log(`   Critical: ${critical.length}`);
  console.log(`   High: ${high.length}`);
  console.log(`   Medium: ${medium.length}`);
  console.log(`   Low: ${low.length}\n`);

  // Display critical issues first
  if (critical.length > 0) {
    console.log('🚨 CRITICAL ISSUES:\n');
    critical.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.type}: ${issue.description}`);
      console.log(`   Path: ${issue.path}`);
      if (issue.values) {
        console.log(`   EN: "${issue.values.en}"`);
        console.log(`   CS: "${issue.values.cs}"`);
        console.log(`   IT: "${issue.values.it}"`);
      }
      if (issue.numbers) {
        console.log(`   Numbers - EN: ${issue.numbers.en}, CS: ${issue.numbers.cs}, IT: ${issue.numbers.it}`);
      }
      if (issue.missing) {
        console.log(`   Missing in: ${issue.missing.join(', ')}`);
      }
      console.log('');
    });
  }

  if (high.length > 0) {
    console.log('⚠️  HIGH PRIORITY ISSUES:\n');
    high.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.type}: ${issue.description}`);
      console.log(`   Path: ${issue.path}`);
      if (issue.values) {
        console.log(`   EN: "${issue.values.en}"`);
        console.log(`   CS: "${issue.values.cs}"`);
        console.log(`   IT: "${issue.values.it}"`);
      }
      if (issue.concept) {
        console.log(`   Concept: ${issue.concept}`);
      }
      console.log('');
    });
  }

  if (medium.length > 0) {
    console.log('📝 MEDIUM PRIORITY ISSUES:\n');
    medium.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.type}: ${issue.description}`);
      console.log(`   Path: ${issue.path}`);
      if (issue.values) {
        console.log(`   EN: "${issue.values.en}"`);
        console.log(`   CS: "${issue.values.cs}"`);
        console.log(`   IT: "${issue.values.it}"`);
      }
      console.log('');
    });
  }

  if (low.length > 0) {
    console.log('💡 LOW PRIORITY ISSUES:\n');
    low.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.type}: ${issue.description}`);
      console.log(`   Path: ${issue.path}`);
      console.log('');
    });
  }

  // Recommendations
  console.log('📋 RECOMMENDATIONS:\n');

  if (critical.length > 0) {
    console.log('1. IMMEDIATE ACTION REQUIRED:');
    console.log('   • Fix metric inconsistencies immediately');
    console.log('   • Resolve missing translation keys');
    console.log('   • Ensure all critical content is available in all languages\n');
  }

  if (high.length > 0) {
    console.log('2. HIGH PRIORITY ACTIONS:');
    console.log('   • Align core concept usage across languages');
    console.log('   • Standardize CTA urgency and tone');
    console.log('   • Ensure feature descriptions convey same value propositions\n');
  }

  if (medium.length > 0) {
    console.log('3. MEDIUM PRIORITY IMPROVEMENTS:');
    console.log('   • Standardize technical term usage');
    console.log('   • Review feature benefit descriptions for consistency');
    console.log('   • Ensure automation concepts are consistently described\n');
  }

  if (low.length > 0) {
    console.log('4. OPTIMIZATION OPPORTUNITIES:');
    console.log('   • Consider localizing testimonial names and companies');
    console.log('   • Review cultural adaptation opportunities');
    console.log('   • Fine-tune brand voice for each market\n');
  }

  console.log('✅ Analysis Complete!');
  console.log(`\nNext steps: Address ${critical.length + high.length} high-impact issues first.`);
};

// Run the analysis
runComprehensiveAnalysis();