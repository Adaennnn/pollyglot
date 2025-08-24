# PollyGlot - Perfect Translation Every Time

A modern web application for instant language translation powered by OpenAI's GPT-4o-mini model. Built with TypeScript, Vite, and a modular architecture for production-ready deployment.

## Features

- 🌍 Multi-language translation (French, Spanish, Japanese)
- ⚡ Fast, modern build system with Vite
- 🔒 Secure API key management with environment variables
- 📦 Modular TypeScript architecture
- 🎨 Responsive design with clean UI
- ⌨️ Keyboard shortcuts (Ctrl+Enter to translate)

## Tech Stack

- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS with modular organization
- **API**: OpenAI GPT-4o-mini
- **Architecture**: Service-based with separation of concerns

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Adaennnn/pollyglot.git
cd pollyglot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to the `.env` file:
```
VITE_OPENAI_API_KEY=your_actual_api_key_here
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
pollyglot/
├── src/
│   ├── assets/          # Images and static files
│   ├── services/        # Business logic and API services
│   │   ├── translationService.ts
│   │   └── uiController.ts
│   ├── styles/          # CSS files
│   │   └── main.css
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── config.ts
│   └── main.ts          # Application entry point
├── index.html           # Main HTML file
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── .env.example         # Environment variables template
└── package.json         # Project dependencies and scripts
```

## Configuration

### Environment Variables

The application uses environment variables for configuration:

- `VITE_OPENAI_API_KEY` - Your OpenAI API key (required)
- `VITE_OPENAI_API_URL` - Custom API endpoint (optional)

### Build Configuration

Build settings can be modified in `vite.config.ts`:
- Port configuration
- Build output directory
- Source maps
- Minification options

## Architecture Overview

The application follows a modular architecture with clear separation of concerns:

- **TranslationService**: Handles all API communication with OpenAI
- **UIController**: Manages DOM interactions and user interface state
- **Config**: Centralized configuration management with environment validation
- **Types**: Shared TypeScript interfaces for type safety

## Security

- API keys are stored in environment variables, never in source code
- Environment validation ensures required variables are present
- Production builds exclude source maps by default

## Building for Production

```bash
npm run build
```

This will:
1. Run TypeScript compilation
2. Bundle and optimize assets
3. Generate production-ready files in the `dist/` directory

## Deployment

The built application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Traditional web servers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

ISC