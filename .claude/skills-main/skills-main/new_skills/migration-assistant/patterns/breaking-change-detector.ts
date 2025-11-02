import { Project, SyntaxKind, Node, CallExpression } from 'ts-morph'
import * as fs from 'fs'
import * as path from 'path'

/**
 * BREAKING CHANGE DETECTOR
 *
 * Scans codebase for usage of deprecated APIs and breaking changes
 */

interface BreakingChange {
  file: string
  line: number
  column: number
  code: string
  api: string
  type: 'deprecated' | 'removed' | 'changed'
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
}

/**
 * React 18 Breaking Changes
 */
const REACT_18_BREAKING_CHANGES = {
  // Removed APIs
  'ReactDOM.render': {
    type: 'removed' as const,
    severity: 'error' as const,
    message: 'ReactDOM.render has been removed in React 18',
    suggestion: 'Use createRoot().render() instead',
  },
  'ReactDOM.hydrate': {
    type: 'removed' as const,
    severity: 'error' as const,
    message: 'ReactDOM.hydrate has been removed in React 18',
    suggestion: 'Use hydrateRoot() instead',
  },
  'ReactDOM.unmountComponentAtNode': {
    type: 'removed' as const,
    severity: 'error' as const,
    message: 'ReactDOM.unmountComponentAtNode has been removed',
    suggestion: 'Use root.unmount() instead',
  },
  'ReactDOM.renderSubtreeIntoContainer': {
    type: 'removed' as const,
    severity: 'error' as const,
    message: 'ReactDOM.renderSubtreeIntoContainer has been removed',
    suggestion: 'Use Portals instead',
  },

  // Deprecated APIs
  'ReactDOM.findDOMNode': {
    type: 'deprecated' as const,
    severity: 'warning' as const,
    message: 'ReactDOM.findDOMNode is deprecated',
    suggestion: 'Use refs instead',
  },

  // Changed APIs
  'React.FC': {
    type: 'changed' as const,
    severity: 'warning' as const,
    message: 'React.FC no longer includes implicit children',
    suggestion: 'Add children prop explicitly to Props interface',
  },
}

/**
 * Scan project for breaking changes
 */
export function scanForBreakingChanges(projectPath: string): BreakingChange[] {
  const project = new Project({
    tsConfigFilePath: path.join(projectPath, 'tsconfig.json'),
  })

  const breakingChanges: BreakingChange[] = []

  // Scan all source files
  project.getSourceFiles().forEach((sourceFile) => {
    const filePath = sourceFile.getFilePath()

    // Skip node_modules
    if (filePath.includes('node_modules')) return

    // Find ReactDOM calls
    sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
      const expression = call.getExpression()

      // Check for ReactDOM.method() calls
      if (Node.isPropertyAccessExpression(expression)) {
        const object = expression.getExpression()
        const property = expression.getName()

        if (object.getText() === 'ReactDOM') {
          const apiName = `ReactDOM.${property}`
          const change = REACT_18_BREAKING_CHANGES[apiName as keyof typeof REACT_18_BREAKING_CHANGES]

          if (change) {
            breakingChanges.push({
              file: filePath,
              line: call.getStartLineNumber(),
              column: call.getStartLinePos(),
              code: call.getText(),
              api: apiName,
              ...change,
            })
          }
        }
      }
    })

    // Find React.FC usage
    sourceFile
      .getDescendantsOfKind(SyntaxKind.TypeReference)
      .forEach((typeRef) => {
        const typeName = typeRef.getTypeName()
        if (Node.isQualifiedName(typeName)) {
          const left = typeName.getLeft()
          const right = typeName.getRight()

          if (left.getText() === 'React' && right.getText() === 'FC') {
            const change = REACT_18_BREAKING_CHANGES['React.FC']
            if (change) {
              breakingChanges.push({
                file: filePath,
                line: typeRef.getStartLineNumber(),
                column: typeRef.getStartLinePos(),
                code: typeRef.getText(),
                api: 'React.FC',
                ...change,
              })
            }
          }
        }
      })

    // Find string refs (deprecated)
    sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute).forEach((attr) => {
      if (attr.getName() === 'ref') {
        const initializer = attr.getInitializer()
        if (
          initializer &&
          Node.isJsxExpression(initializer) &&
          initializer.getExpression()
        ) {
          const expr = initializer.getExpression()
          if (expr && Node.isStringLiteral(expr)) {
            breakingChanges.push({
              file: filePath,
              line: attr.getStartLineNumber(),
              column: attr.getStartLinePos(),
              code: attr.getText(),
              api: 'String Ref',
              type: 'deprecated',
              severity: 'warning',
              message: 'String refs are deprecated',
              suggestion: 'Use callback refs or useRef hook',
            })
          }
        }
      }
    })

    // Find UNSAFE_ lifecycle methods
    sourceFile.getDescendantsOfKind(SyntaxKind.MethodDeclaration).forEach((method) => {
      const name = method.getName()
      if (name.startsWith('UNSAFE_')) {
        breakingChanges.push({
          file: filePath,
          line: method.getStartLineNumber(),
          column: method.getStartLinePos(),
          code: method.getText().substring(0, 50) + '...',
          api: name,
          type: 'deprecated',
          severity: 'warning',
          message: `${name} is unsafe and may be removed`,
          suggestion: 'Use recommended lifecycle methods or hooks',
        })
      }
    })
  })

  return breakingChanges
}

/**
 * Generate breaking changes report
 */
export function generateReport(changes: BreakingChange[]): string {
  const errors = changes.filter((c) => c.severity === 'error')
  const warnings = changes.filter((c) => c.severity === 'warning')
  const info = changes.filter((c) => c.severity === 'info')

  let report = '# Breaking Changes Report\n\n'
  report += `**Total Issues:** ${changes.length}\n`
  report += `- Errors: ${errors.length}\n`
  report += `- Warnings: ${warnings.length}\n`
  report += `- Info: ${info.length}\n\n`

  // Group by file
  const byFile = changes.reduce((acc, change) => {
    if (!acc[change.file]) acc[change.file] = []
    acc[change.file].push(change)
    return acc
  }, {} as Record<string, BreakingChange[]>)

  for (const [file, fileChanges] of Object.entries(byFile)) {
    report += `## ${file}\n\n`

    fileChanges.forEach((change) => {
      const icon = change.severity === 'error' ? '❌' : change.severity === 'warning' ? '⚠️' : 'ℹ️'
      report += `${icon} **Line ${change.line}:** ${change.message}\n`
      report += `   \`\`\`${change.code}\`\`\`\n`
      if (change.suggestion) {
        report += `   💡 ${change.suggestion}\n`
      }
      report += '\n'
    })
  }

  return report
}

/**
 * CLI tool
 */
export function runDetector(projectPath: string, outputPath?: string) {
  console.log('🔍 Scanning for breaking changes...\n')

  const changes = scanForBreakingChanges(projectPath)

  if (changes.length === 0) {
    console.log('✅ No breaking changes detected!')
    return
  }

  console.log(`Found ${changes.length} potential issues:\n`)

  const report = generateReport(changes)
  console.log(report)

  if (outputPath) {
    fs.writeFileSync(outputPath, report)
    console.log(`\n📄 Report saved to: ${outputPath}`)
  }
}

/**
 * React Router v6 Breaking Changes
 */
const REACT_ROUTER_V6_CHANGES = {
  'Switch': {
    type: 'removed' as const,
    severity: 'error' as const,
    message: 'Switch has been replaced with Routes',
    suggestion: 'Replace <Switch> with <Routes>',
  },
  'useHistory': {
    type: 'removed' as const,
    severity: 'error' as const,
    message: 'useHistory has been replaced with useNavigate',
    suggestion: 'Use useNavigate() instead',
  },
  'Redirect': {
    type: 'removed' as const,
    severity: 'error' as const,
    message: 'Redirect has been replaced with Navigate',
    suggestion: 'Replace <Redirect> with <Navigate>',
  },
}

/**
 * Redux Breaking Changes (v4 to v5)
 */
const REDUX_V5_CHANGES = {
  'createStore': {
    type: 'deprecated' as const,
    severity: 'warning' as const,
    message: 'createStore is deprecated',
    suggestion: 'Use configureStore from @reduxjs/toolkit',
  },
}

/**
 * Export detector for different libraries
 */
export const detectors = {
  react: (projectPath: string) => scanForBreakingChanges(projectPath),
  // Add more detectors as needed
}

/**
 * Example usage:
 *
 * ```bash
 * ts-node breaking-change-detector.ts /path/to/project
 * ```
 *
 * Or in code:
 *
 * ```ts
 * const changes = scanForBreakingChanges('./my-project')
 * const report = generateReport(changes)
 * console.log(report)
 * ```
 */

// CLI execution
if (require.main === module) {
  const projectPath = process.argv[2] || process.cwd()
  const outputPath = process.argv[3]

  runDetector(projectPath, outputPath)
}
