# WINDOSE_42

A high-performance interactive portfolio inspired by Needy Girl Overdose and PostHog, featuring a retro-cyberpunk desktop interface in a sleek black colorway.

## Features

- **Desktop Interface**: Windows-like desktop environment with draggable windows, taskbar, and start menu
- **Multiple Apps**:
  - About.md - Personal information
  - Projects - Showcase of work
  - Terminal - Command-line interface
  - Travel Log - Interactive map of locations
  - Skills - Technical stack breakdown
  - System - Stats and system information
  - Achievements - Notable accomplishments
  - Messages - AI-powered chat with multiple personas
  - Stream - Live streaming interface
- **AI Chat**: Powered by Google Gemini with multiple agent personas (OS_GUIDE, HIRING_BOT, DEV_PEER)
- **Interactive Map**: Travel log with metro-style visualization
- **Retro Aesthetic**: Cyberpunk-inspired design with glitch effects and scanlines

## Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (package manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd windose-42
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```env
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   - Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Running Locally

### Development Mode

For full functionality including the chat feature:

```bash
# Option 1: Use Vercel CLI (Recommended)
npm i -g vercel
vercel dev
```

```bash
# Option 2: Use dev server + Vite
pnpm run dev:all
```

This starts:

- Dev server on `http://localhost:3001` (handles API routes)
- Vite dev server on `http://localhost:3000` (proxies API calls)

### UI Only (No Chat)

If you just want to test the UI without the chat feature:

```bash
pnpm run dev
```

The app will be available at `http://localhost:3000`

## Building for Production

```bash
pnpm run build
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the repository in Vercel
3. Add `GEMINI_API_KEY` as an environment variable in Vercel project settings
4. Deploy

The API route will automatically be available at `/api/chat` in production.

## Chat Setup

For detailed information about setting up the Gemini chat feature, see [SETUP.md](./SETUP.md).

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Gemini AI** - Chat functionality
- **Vercel** - Deployment and serverless functions

## Project Structure

```
windose-42/
├── api/
│   └── chat.ts              # Vercel serverless function for chat
├── components/
│   ├── apps/                # Application components
│   │   ├── AboutApp.tsx
│   │   ├── ChatApp.tsx
│   │   ├── ProjectsApp.tsx
│   │   ├── TerminalApp.tsx
│   │   ├── StreamApp.tsx
│   │   └── ...
│   ├── Taskbar.tsx          # Taskbar component
│   ├── Window.tsx           # Window wrapper component
│   └── ...
├── constants.tsx             # App constants and data
├── App.tsx                   # Main app component
└── vercel.json              # Vercel configuration
```

## License

Clone if you want :P MIT License
