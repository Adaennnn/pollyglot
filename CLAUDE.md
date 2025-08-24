# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PollyGlot is a TypeScript-based translation web application that uses OpenAI's GPT-4o-mini model for translations. Built with Vite for modern development and production optimization, the app features a modular architecture with service-based separation of concerns.

## Architecture

### Technology Stack
- **Language**: TypeScript with strict type checking
- **Build Tool**: Vite for fast HMR and optimized production builds
- **Styling**: Modular CSS organization
- **API**: OpenAI Chat Completions API (GPT-4o-mini)
- **Architecture Pattern**: Service-based with singleton instances

### Application Flow
1. **Main Entry** (`src/main.ts`): Initializes the App class and sets up event listeners
2. **UI Controller** (`src/services/uiController.ts`): Manages DOM interactions and view states
3. **Translation Service** (`src/services/translationService.ts`): Handles OpenAI API communication
4. **Config Management** (`src/utils/config.ts`): Centralized environment configuration with validation

### Key Components
- **index.html**: Main HTML entry point for Vite
- **src/main.ts**: Application bootstrapping and initialization
- **src/services/**: Business logic layer
  - `translationService.ts`: API integration and translation logic
  - `uiController.ts`: DOM manipulation and UI state management
- **src/types/**: TypeScript type definitions and interfaces
- **src/utils/config.ts**: Environment variable management and validation
- **src/styles/main.css**: Organized CSS with logical sections

## Development Setup

### Prerequisites
- Node.js v14+
- npm or yarn
- OpenAI API key

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key:
# VITE_OPENAI_API_KEY=your_actual_api_key_here
```

### Running the Application
```bash
# Start development server with HMR
npm run dev
# Opens at http://localhost:3000

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Important Implementation Details

### Translation API
- Uses OpenAI Chat Completions API with `gpt-4o-mini` model
- Temperature set to 0.3 for consistent translations
- System prompt instructs to return only the translation without explanations
- API key managed through environment variables (`VITE_OPENAI_API_KEY`)

### Supported Languages
- French (`french`)
- Spanish (`spanish`) 
- Japanese (`japanese`)

### TypeScript Configuration
- Strict mode enabled for type safety
- Module resolution set to bundler for Vite compatibility
- Path aliases configured (`@/` maps to `./src/`)
- Isolated modules for faster compilation

### Environment Variables
- `VITE_OPENAI_API_KEY`: Required - Your OpenAI API key
- `VITE_OPENAI_API_URL`: Optional - Custom API endpoint (defaults to OpenAI's endpoint)
- Environment validation runs on app initialization

### User Experience Flow
1. User enters text in the translation input
2. Selects target language from radio buttons
3. Clicks "Translate" or presses Ctrl+Enter
4. App shows loading state during API call
5. Displays original and translated text in results view
6. "Start Over" button resets to initial state

### Keyboard Shortcuts
- `Ctrl+Enter` or `Cmd+Enter` in the text input triggers translation

### Error Handling
- Environment validation on startup
- User-friendly error messages for missing API key
- Network error handling with fallback messages
- Loading states during API calls

## File Structure Notes

```
pollyglot/
├── src/
│   ├── assets/              # Flag images and logos
│   │   ├── fr-flag.png
│   │   ├── jpn-flag.png
│   │   ├── parrot.png
│   │   ├── sp-flag.png
│   │   └── worldmap.png
│   ├── services/            # Business logic services
│   │   ├── translationService.ts
│   │   └── uiController.ts
│   ├── styles/              # CSS modules
│   │   └── main.css
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── config.ts
│   ├── main.ts              # App entry point
│   └── vite-env.d.ts        # Vite type definitions
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
├── .env.example             # Environment template
└── .env                     # Local environment (gitignored)
```

## Build Configuration
- **Development**: Fast refresh with Vite HMR on port 3000
- **Production**: Minified with Terser, source maps included
- **Output**: Built files in `dist/` directory
- **Entry Point**: `index.html` processed by Vite

## Code Conventions
- TypeScript strict mode for type safety
- Service classes use singleton pattern
- Modular organization with clear separation of concerns
- Environment variables prefixed with `VITE_` for Vite exposure
- Async/await for promise handling
- Type definitions centralized in `src/types/`

## Security Considerations
- API keys stored in environment variables, never committed
- Environment validation ensures required variables are present
- Error messages sanitized to avoid exposing sensitive information
- HTTPS enforced for API communications