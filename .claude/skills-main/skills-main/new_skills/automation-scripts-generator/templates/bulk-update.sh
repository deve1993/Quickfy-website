#!/bin/bash
# Bulk update script for component files
# Usage: ./bulk-update.sh [pattern] [action]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Actions
action_add_export() {
  local file=$1
  print_info "Adding export to $file"

  # Check if file already has export
  if grep -q "export \* from" "$file"; then
    print_warning "File already has exports, skipping"
    return
  fi

  # Get component name from file path
  local component=$(basename $(dirname "$file"))

  # Add export
  echo "export * from './$component'" >> "$file"
  print_success "Added export for $component"
}

action_add_type_export() {
  local file=$1
  local component=$(basename $(dirname "$file"))

  if grep -q "export type.*Props" "$file"; then
    print_warning "File already exports types, skipping"
    return
  fi

  echo "export type { ${component}Props } from './${component}.types'" >> "$file"
  print_success "Added type export for $component"
}

action_update_imports() {
  local file=$1
  print_info "Updating imports in $file"

  # Replace old import pattern with new
  sed -i.bak "s/import React from 'react'/import { type FC } from 'react'/g" "$file"

  # Remove backup file
  rm -f "${file}.bak"

  print_success "Updated imports in $file"
}

action_add_displayname() {
  local file=$1
  local component=$(basename "$file" .tsx)

  print_info "Adding displayName to $component"

  # Check if displayName already exists
  if grep -q "displayName" "$file"; then
    print_warning "Component already has displayName, skipping"
    return
  fi

  # Add displayName after component declaration
  sed -i.bak "s/export function ${component}/export function ${component}()\n\n${component}.displayName = '${component}'/g" "$file"

  # Remove backup
  rm -f "${file}.bak"

  print_success "Added displayName to $component"
}

action_format_all() {
  local file=$1
  print_info "Formatting $file"

  # Run prettier
  npx prettier --write "$file" > /dev/null 2>&1

  print_success "Formatted $file"
}

# Main script
main() {
  local pattern=${1:-"src/components/**/index.ts"}
  local action=${2:-"add_export"}

  print_info "Pattern: $pattern"
  print_info "Action: $action"
  echo ""

  # Find files matching pattern
  files=$(find . -path "$pattern" -type f)

  if [ -z "$files" ]; then
    print_error "No files found matching pattern: $pattern"
    exit 1
  fi

  echo "Files to process:"
  echo "$files"
  echo ""

  # Confirm
  read -p "Continue? (y/n) " -n 1 -r
  echo ""

  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Cancelled"
    exit 0
  fi

  # Process each file
  for file in $files; do
    case $action in
      add_export)
        action_add_export "$file"
        ;;
      add_type_export)
        action_add_type_export "$file"
        ;;
      update_imports)
        action_update_imports "$file"
        ;;
      add_displayname)
        action_add_displayname "$file"
        ;;
      format)
        action_format_all "$file"
        ;;
      *)
        print_error "Unknown action: $action"
        exit 1
        ;;
    esac
  done

  echo ""
  print_success "Bulk update complete!"
}

# Help
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  cat << EOF
Bulk Update Script

Usage: ./bulk-update.sh [pattern] [action]

Patterns:
  src/components/**/index.ts    All index files (default)
  src/components/**/*.tsx       All component files
  src/**/*.test.tsx             All test files

Actions:
  add_export       Add barrel exports to index files
  add_type_export  Add type exports to index files
  update_imports   Update import statements
  add_displayname  Add displayName to components
  format           Format files with Prettier

Examples:
  ./bulk-update.sh                                       # Add exports to all index files
  ./bulk-update.sh "src/**/*.tsx" add_displayname       # Add displayName to all components
  ./bulk-update.sh "src/**/*.ts" format                 # Format all TypeScript files

EOF
  exit 0
fi

main "$@"
