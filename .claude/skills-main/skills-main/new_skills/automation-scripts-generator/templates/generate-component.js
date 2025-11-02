#!/usr/bin/env node
/**
 * Component Generator Script
 * Generates React components with tests, stories, and documentation
 *
 * Usage: node generate-component.js ComponentName [options]
 */

const fs = require('fs').promises
const path = require('path')

// Templates
const templates = {
  component: (name) => `import React from 'react'
import { ${name}Props } from './${name}.types'

export function ${name}({ children, className, ...props }: ${name}Props) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
`,

  types: (name) => `import React from 'react'

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}
`,

  test: (name) => `import { render, screen } from '@testing-library/react'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('renders children', () => {
    render(<${name}>Hello World</${name}>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies className', () => {
    render(<${name} className="custom">Content</${name}>)
    expect(screen.getByText('Content')).toHaveClass('custom')
  })
})
`,

  story: (name) => `import type { Meta, StoryObj } from '@storybook/react'
import { ${name} } from './${name}'

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ${name}>

export const Default: Story = {
  args: {
    children: '${name} component',
  },
}

export const WithClassName: Story = {
  args: {
    children: 'Styled ${name}',
    className: 'bg-blue-500 text-white p-4 rounded',
  },
}
`,

  readme: (name) => `# ${name}

## Description

[Add component description here]

## Usage

\`\`\`tsx
import { ${name} } from '@/components/${name}'

function Example() {
  return (
    <${name}>
      Content here
    </${name}>
  )
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Content to render |
| className | string | - | Additional CSS classes |

## Examples

### Basic

\`\`\`tsx
<${name}>Hello World</${name}>
\`\`\`

### With Custom Styling

\`\`\`tsx
<${name} className="custom-class">
  Styled content
</${name}>
\`\`\`
`,

  index: (name) => `export { ${name} } from './${name}'
export type { ${name}Props } from './${name}.types'
`,
}

async function generateComponent(name, options = {}) {
  const {
    baseDir = 'src/components',
    withTests = true,
    withStories = true,
    withDocs = true,
  } = options

  console.log(`\n🚀 Generating component: ${name}\n`)

  const componentDir = path.join(process.cwd(), baseDir, name)

  // Create directory
  await fs.mkdir(componentDir, { recursive: true })

  // Generate files
  const files = [
    { name: `${name}.tsx`, content: templates.component(name) },
    { name: `${name}.types.ts`, content: templates.types(name) },
    { name: 'index.ts', content: templates.index(name) },
  ]

  if (withTests) {
    files.push({ name: `${name}.test.tsx`, content: templates.test(name) })
  }

  if (withStories) {
    files.push({ name: `${name}.stories.tsx`, content: templates.story(name) })
  }

  if (withDocs) {
    files.push({ name: 'README.md', content: templates.readme(name) })
  }

  // Write files
  for (const file of files) {
    const filePath = path.join(componentDir, file.name)
    await fs.writeFile(filePath, file.content)
    console.log(`✅ Created ${file.name}`)
  }

  // Update barrel export
  try {
    const indexPath = path.join(process.cwd(), baseDir, 'index.ts')
    const exportLine = `export * from './${name}'\n`

    try {
      const content = await fs.readFile(indexPath, 'utf-8')
      if (!content.includes(exportLine)) {
        await fs.appendFile(indexPath, exportLine)
        console.log(`✅ Updated index.ts`)
      }
    } catch {
      // Create index if it doesn't exist
      await fs.writeFile(indexPath, exportLine)
      console.log(`✅ Created index.ts`)
    }
  } catch (error) {
    console.error('⚠️  Could not update barrel export:', error.message)
  }

  console.log(`\n✨ Component ${name} generated successfully!\n`)
}

// CLI
const args = process.argv.slice(2)

if (args.length === 0 || args.includes('--help')) {
  console.log(`
Component Generator

Usage: node generate-component.js <ComponentName> [options]

Options:
  --no-tests     Skip test file generation
  --no-stories   Skip Storybook story generation
  --no-docs      Skip README generation
  --dir <path>   Custom base directory (default: src/components)

Examples:
  node generate-component.js Button
  node generate-component.js Card --no-tests
  node generate-component.js Modal --dir src/ui
`)
  process.exit(0)
}

const componentName = args[0]
const options = {
  withTests: !args.includes('--no-tests'),
  withStories: !args.includes('--no-stories'),
  withDocs: !args.includes('--no-docs'),
  baseDir: args.includes('--dir') ? args[args.indexOf('--dir') + 1] : 'src/components',
}

// Validate component name
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Component name must be PascalCase (e.g., Button, MyComponent)')
  process.exit(1)
}

generateComponent(componentName, options).catch((error) => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})
