/**
 * Webpack plugin to inject environment variables into external scripts
 * This replaces placeholder tokens with actual environment values at build time
 */

const fs = require('fs');
const path = require('path');

class EnvInjectionPlugin {
  constructor(options = {}) {
    this.options = {
      // Default configuration
      scriptDir: 'public/js',
      envVars: {},
      verbose: false,
      ...options
    };
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('EnvInjectionPlugin', (compilation, callback) => {
      this.injectEnvIntoScripts(compilation);
      callback();
    });
  }

  injectEnvIntoScripts(compilation) {
    const { scriptDir, envVars, verbose } = this.options;
    const publicPath = path.join(process.cwd(), scriptDir);

    if (!fs.existsSync(publicPath)) {
      if (verbose) {
        console.log(`EnvInjectionPlugin: Script directory ${scriptDir} does not exist`);
      }
      return;
    }

    // Get all JavaScript files in the script directory
    const scriptFiles = fs.readdirSync(publicPath)
      .filter(file => file.endsWith('.js'))
      .map(file => path.join(publicPath, file));

    scriptFiles.forEach(scriptPath => {
      try {
        let content = fs.readFileSync(scriptPath, 'utf8');
        let modified = false;

        // Replace environment variable placeholders
        Object.entries(envVars).forEach(([key, value]) => {
          const placeholder = `__ENV_${key}__`;
          if (content.includes(placeholder)) {
            content = content.replace(new RegExp(placeholder, 'g'), JSON.stringify(value));
            modified = true;
            if (verbose) {
              console.log(`EnvInjectionPlugin: Replaced ${placeholder} with ${JSON.stringify(value)} in ${path.basename(scriptPath)}`);
            }
          }
        });

        // Write back the modified content if changes were made
        if (modified) {
          fs.writeFileSync(scriptPath, content, 'utf8');
          if (verbose) {
            console.log(`EnvInjectionPlugin: Updated ${path.basename(scriptPath)}`);
          }
        }
      } catch (error) {
        console.error(`EnvInjectionPlugin: Failed to process ${scriptPath}:`, error);
      }
    });
  }
}

module.exports = EnvInjectionPlugin;