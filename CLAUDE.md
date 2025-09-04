# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QuickFy is a Next.js 15 website with internationalization support for Czech, English, and Italian markets. The project uses the App Router with TypeScript and implements multi-language support through next-intl.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Internationalization Setup
- **Supported locales**: Czech (cs), English (en), Italian (it)
- **Default locale**: Czech (cs)
- **Configuration**: `i18n.ts` configures next-intl with locale detection
- **Middleware**: `src/middleware.ts` handles routing for different locales
- **Translation files**: Located in `messages/` directory with JSON format
- **URL structure**: `/{locale}/page` format (e.g., `/en/`, `/it/`, `/cs/`)

### File Structure
- **Pages**: Located in `src/app/[locale]/` using dynamic routing for internationalization
- **Translations**: JSON files in `messages/` directory for each supported locale
- **Middleware**: Automatic locale detection and routing
- **Styling**: Tailwind CSS v4 with PostCSS configuration

### Key Configuration Files
- `next.config.ts`: Next.js configuration with next-intl plugin integration
- `i18n.ts`: Internationalization configuration and message loading
- `src/middleware.ts`: Locale-based routing middleware
- `tsconfig.json`: TypeScript configuration with path aliases (`@/*` -> `./src/*`)

### Translation System
Translation keys are nested objects in JSON files. Access translations in components using:
```tsx
import {getTranslations} from 'next-intl/server';
const t = await getTranslations();
t('hero.title'); // Accesses nested translation keys
```

### Layout Structure
The root layout (`src/app/[locale]/layout.tsx`) must be async to handle locale parameters properly. This is critical for proper internationalization functionality.