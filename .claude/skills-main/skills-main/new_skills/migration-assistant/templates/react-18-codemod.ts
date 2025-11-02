import { Transform, API, FileInfo, Options } from 'jscodeshift'

/**
 * REACT 18 MIGRATION CODEMOD
 *
 * Automatically transforms React code for React 18 compatibility
 */

const transform: Transform = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasModifications = false

  /**
   * TRANSFORM 1: Update ReactDOM.render to createRoot
   *
   * Before: ReactDOM.render(<App />, document.getElementById('root'))
   * After:  const root = createRoot(document.getElementById('root')!)
   *         root.render(<App />)
   */
  root
    .find(j.ExpressionStatement, {
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: { name: 'ReactDOM' },
          property: { name: 'render' },
        },
      },
    })
    .forEach((path) => {
      const callExpr = path.value.expression as any
      const [element, container] = callExpr.arguments

      // Add createRoot import
      const importDecl = j.importDeclaration(
        [j.importSpecifier(j.identifier('createRoot'))],
        j.literal('react-dom/client')
      )

      // Check if import already exists
      const hasImport = root
        .find(j.ImportDeclaration, {
          source: { value: 'react-dom/client' },
        })
        .length > 0

      if (!hasImport) {
        root.find(j.Program).get('body', 0).insertBefore(importDecl)
      }

      // Create new statements
      const rootVar = j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier('root'),
          j.callExpression(j.identifier('createRoot'), [container])
        ),
      ])

      const renderCall = j.expressionStatement(
        j.callExpression(
          j.memberExpression(j.identifier('root'), j.identifier('render')),
          [element]
        )
      )

      // Replace old with new
      j(path).replaceWith([rootVar, renderCall])
      hasModifications = true
    })

  /**
   * TRANSFORM 2: Update ReactDOM.hydrate to hydrateRoot
   */
  root
    .find(j.ExpressionStatement, {
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: { name: 'ReactDOM' },
          property: { name: 'hydrate' },
        },
      },
    })
    .forEach((path) => {
      const callExpr = path.value.expression as any
      const [element, container] = callExpr.arguments

      // Add hydrateRoot import
      const importDecl = j.importDeclaration(
        [j.importSpecifier(j.identifier('hydrateRoot'))],
        j.literal('react-dom/client')
      )

      const hasImport = root
        .find(j.ImportDeclaration, {
          source: { value: 'react-dom/client' },
        })
        .length > 0

      if (!hasImport) {
        root.find(j.Program).get('body', 0).insertBefore(importDecl)
      }

      // Replace with hydrateRoot
      const newCall = j.expressionStatement(
        j.callExpression(j.identifier('hydrateRoot'), [container, element])
      )

      j(path).replaceWith(newCall)
      hasModifications = true
    })

  /**
   * TRANSFORM 3: Update ReactDOM.unmountComponentAtNode
   *
   * Before: ReactDOM.unmountComponentAtNode(container)
   * After:  root.unmount()
   */
  root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: { name: 'ReactDOM' },
        property: { name: 'unmountComponentAtNode' },
      },
    })
    .forEach((path) => {
      // Replace with root.unmount()
      const newCall = j.callExpression(
        j.memberExpression(j.identifier('root'), j.identifier('unmount')),
        []
      )

      j(path).replaceWith(newCall)
      hasModifications = true
    })

  /**
   * TRANSFORM 4: Remove ReactDOM import if no longer needed
   */
  if (hasModifications) {
    root
      .find(j.ImportDeclaration, {
        source: { value: 'react-dom' },
      })
      .forEach((path) => {
        const specifiers = path.value.specifiers || []
        const filteredSpecifiers = specifiers.filter((spec: any) => {
          if (spec.type === 'ImportDefaultSpecifier') {
            // Keep default import if it's not ReactDOM
            return spec.local?.name !== 'ReactDOM'
          }
          return true
        })

        if (filteredSpecifiers.length === 0) {
          j(path).remove()
        } else {
          path.value.specifiers = filteredSpecifiers
        }
      })
  }

  /**
   * TRANSFORM 5: Class Component to Function Component
   *
   * Convert simple class components to function components with hooks
   */
  root.find(j.ClassDeclaration).forEach((path) => {
    const classDecl = path.value
    const className = classDecl.id?.name

    if (!className) return

    // Only convert if extends React.Component
    const extendsReactComponent =
      classDecl.superClass &&
      ((classDecl.superClass.type === 'MemberExpression' &&
        (classDecl.superClass.object as any).name === 'React' &&
        (classDecl.superClass.property as any).name === 'Component') ||
        (classDecl.superClass.type === 'Identifier' &&
          classDecl.superClass.name === 'Component'))

    if (!extendsReactComponent) return

    // Find render method
    const renderMethod = classDecl.body.body.find(
      (member: any) =>
        member.type === 'MethodDefinition' &&
        member.key.name === 'render' &&
        member.kind === 'method'
    ) as any

    if (!renderMethod) return

    // Extract state initialization
    const stateProperty = classDecl.body.body.find(
      (member: any) =>
        member.type === 'ClassProperty' && member.key.name === 'state'
    ) as any

    // Create function component
    const functionBody: any[] = []

    // Add useState for each state property
    if (stateProperty && stateProperty.value.type === 'ObjectExpression') {
      stateProperty.value.properties.forEach((prop: any) => {
        const stateKey = prop.key.name
        const stateValue = prop.value

        const useState = j.variableDeclaration('const', [
          j.variableDeclarator(
            j.arrayPattern([
              j.identifier(stateKey),
              j.identifier(`set${capitalize(stateKey)}`),
            ]),
            j.callExpression(j.identifier('useState'), [stateValue])
          ),
        ])

        functionBody.push(useState)
      })
    }

    // Add render return
    const renderReturn = renderMethod.value.body.body.find(
      (stmt: any) => stmt.type === 'ReturnStatement'
    )

    if (renderReturn) {
      functionBody.push(renderReturn)
    }

    // Create function component
    const functionComponent = j.functionDeclaration(
      j.identifier(className),
      [],
      j.blockStatement(functionBody)
    )

    // Replace class with function
    j(path).replaceWith(functionComponent)
    hasModifications = true
  })

  return hasModifications ? root.toSource() : file.source
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default transform

/**
 * USAGE:
 *
 * Run this codemod with jscodeshift:
 *
 * npx jscodeshift -t react-18-codemod.ts src/
 *
 * Options:
 * --dry          Do a dry-run, no files will be written
 * --print        Print output, useful for development
 * -v, --verbose  Show more information about the transform process
 */

/**
 * Example transformations:
 */

/*
// BEFORE
import ReactDOM from 'react-dom'

const container = document.getElementById('root')
ReactDOM.render(<App />, container)

// AFTER
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App />)
*/

/*
// BEFORE
class Counter extends React.Component {
  state = { count: 0 }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}

// AFTER
function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  )
}
*/
