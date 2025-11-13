/**
 * Content Length Analysis Tool
 * Analyzes content variations across cs/en/it translations
 * Identifies inconsistencies and suggests standardization
 */

const fs = require('fs');
const path = require('path');

// Load translation files
const loadTranslations = () => {
  const langs = ['cs', 'en', 'it'];
  const translations = {};

  langs.forEach(lang => {
    const filePath = path.join(__dirname, '..', 'messages', `${lang}.json`);
    translations[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });

  return translations;
};

// Analyze content lengths
const analyzeContentLengths = (translations) => {
  const analysis = {
    critical: [],
    warnings: [],
    stats: {}
  };

  // Key sections to analyze for consistency
  const keyPaths = [
    'hero.headline',
    'hero.headlineHighlight',
    'hero.subheadline',
    'hero.cta.primary',
    'hero.cta.secondary',
    'features.title',
    'features.titleHighlight',
    'features.subtitle',
    'benefits.title',
    'benefits.titleHighlight',
    'benefits.subtitle',
    'pricing.title',
    'pricing.subtitle',
    'contact.title',
    'contact.titleHighlight',
    'contact.subtitle'
  ];

  keyPaths.forEach(path => {
    const lengths = {};
    const values = {};

    Object.keys(translations).forEach(lang => {
      const value = getNestedValue(translations[lang], path);
      if (value) {
        lengths[lang] = value.length;
        values[lang] = value;
      }
    });

    if (Object.keys(lengths).length === 3) {
      const lengthValues = Object.values(lengths);
      const min = Math.min(...lengthValues);
      const max = Math.max(...lengthValues);
      const variance = ((max - min) / min) * 100;

      analysis.stats[path] = {
        lengths,
        values,
        variance: Math.round(variance),
        recommendation: getRecommendation(variance, path)
      };

      // Flag critical issues (>25% variance)
      if (variance > 25) {
        analysis.critical.push({
          path,
          variance: Math.round(variance),
          lengths,
          suggestion: getSuggestion(values, path)
        });
      }
      // Flag warnings (>15% variance)
      else if (variance > 15) {
        analysis.warnings.push({
          path,
          variance: Math.round(variance),
          lengths,
          suggestion: getSuggestion(values, path)
        });
      }
    }
  });

  return analysis;
};

// Helper: Get nested object value by path
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
};

// Helper: Get recommendation based on variance
const getRecommendation = (variance, path) => {
  if (variance > 25) return 'CRITICAL - Immediate standardization needed';
  if (variance > 15) return 'WARNING - Review for consistency';
  if (variance > 10) return 'MINOR - Monitor for UX impact';
  return 'GOOD - Within acceptable range';
};

// Helper: Generate standardization suggestions
const getSuggestion = (values, path) => {
  const lengths = Object.entries(values).map(([lang, text]) => ({
    lang,
    text,
    length: text.length
  })).sort((a, b) => a.length - b.length);

  const shortest = lengths[0];
  const longest = lengths[lengths.length - 1];

  // For headlines and titles, suggest keeping concise
  if (path.includes('title') || path.includes('headline')) {
    return {
      action: 'STANDARDIZE_TO_SHORTEST',
      target: shortest.lang,
      targetText: shortest.text,
      reason: 'Headlines should be concise across all languages'
    };
  }

  // For descriptions and subtitles, suggest middle ground
  return {
    action: 'STANDARDIZE_TO_MEDIUM',
    suggestions: lengths.map(l => ({
      lang: l.lang,
      currentLength: l.length,
      suggestedLength: Math.round((shortest.length + longest.length) / 2),
      action: l.length > longest.length * 0.8 ? 'SHORTEN' : 'EXPAND'
    }))
  };
};

// Generate standardized content suggestions
const generateStandardizedContent = (analysis) => {
  const suggestions = {
    hero: {
      headline: {
        cs: "Marketing automatizace pro",
        en: "Marketing automation for",
        it: "Automazione marketing per"
      },
      headlineHighlight: {
        cs: "růst malých firem",
        en: "small business growth",
        it: "crescita piccole imprese"
      },
      subheadline: {
        cs: "Integrovaný CRM s marketing automatizací pro SME. Transformujte digitální marketing s analytikou a dosáhněte o 35% lepšího ROI.",
        en: "Integrated CRM with marketing automation for SMEs. Transform digital marketing with analytics and achieve 35% better ROI.",
        it: "CRM integrato con automazione marketing per PMI. Trasforma il marketing digitale con analisi e ottieni il 35% di ROI in più."
      }
    },
    features: {
      title: {
        cs: "Marketing Automatizace:",
        en: "Marketing Automation:",
        it: "Automazione Marketing:"
      },
      titleHighlight: {
        cs: "3 Klíčové Moduly",
        en: "3 Core Solutions",
        it: "3 Soluzioni Essenziali"
      }
    }
  };

  return suggestions;
};

// Generate report
const generateReport = () => {
  console.log('🔍 CONTENT CONSISTENCY ANALYSIS\n');

  const translations = loadTranslations();
  const analysis = analyzeContentLengths(translations);

  console.log('📊 CRITICAL ISSUES (>25% variance):');
  if (analysis.critical.length === 0) {
    console.log('✅ No critical issues found\n');
  } else {
    analysis.critical.forEach(issue => {
      console.log(`❌ ${issue.path}: ${issue.variance}% variance`);
      console.log(`   Lengths: CS(${issue.lengths.cs}) EN(${issue.lengths.en}) IT(${issue.lengths.it})`);
      console.log(`   Suggestion: ${issue.suggestion.action}\n`);
    });
  }

  console.log('⚠️ WARNINGS (15-25% variance):');
  if (analysis.warnings.length === 0) {
    console.log('✅ No warnings found\n');
  } else {
    analysis.warnings.forEach(warning => {
      console.log(`⚠️ ${warning.path}: ${warning.variance}% variance`);
      console.log(`   Lengths: CS(${warning.lengths.cs}) EN(${warning.lengths.en}) IT(${warning.lengths.it})\n`);
    });
  }

  console.log('📈 SUMMARY:');
  console.log(`Total paths analyzed: ${Object.keys(analysis.stats).length}`);
  console.log(`Critical issues: ${analysis.critical.length}`);
  console.log(`Warnings: ${analysis.warnings.length}`);
  console.log(`Good consistency: ${Object.keys(analysis.stats).length - analysis.critical.length - analysis.warnings.length}`);

  // Generate standardization recommendations
  const standardized = generateStandardizedContent(analysis);

  console.log('\n💡 STANDARDIZATION RECOMMENDATIONS:');
  console.log('Apply these changes to achieve ±10% content length variance:');
  console.log(JSON.stringify(standardized, null, 2));

  return { analysis, standardized };
};

// Export for use in other scripts
module.exports = {
  analyzeContentLengths,
  generateStandardizedContent,
  generateReport
};

// Run analysis if called directly
if (require.main === module) {
  generateReport();
}