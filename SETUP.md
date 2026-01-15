# Setup Guide for Gemini Chat Integration

This guide will help you set up the Gemini-powered chat feature for the Messages app using Vercel serverless functions.

## Prerequisites

1. **Node.js** and **pnpm** installed
2. A **Google Gemini API key** (get one from [Google AI Studio](https://aistudio.google.com/app/apikey))
3. **Vercel account** (for production deployment)

## Installation Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

#### For Local Development

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

**Important**: Make sure `.env.local` is in your `.gitignore` file to keep your API key secure.

#### For Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environment**: Production, Preview, and Development (select all)

### 3. Local Development

You have three options for local development:

#### Option A: Use Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Run the development server
vercel dev
```

#### Option B: Use Dev Server + Vite (Alternative)

```bash
# Run both dev server and Vite together
pnpm run dev:all
```

This starts:

- Dev server on `http://localhost:3001` (handles API routes)
- Vite dev server on `http://localhost:3000` (proxies API calls)

#### Option C: Vite Only (UI Testing)

```bash
# Run Vite only (API routes won't work)
pnpm run dev
```

**Note**: For Option B, make sure you have `.env.local` with `GEMINI_API_KEY` set.

### 4. Access the Application

- **With Vercel CLI**: `http://localhost:3000` (or the port Vercel assigns)
- **With Vite only**: `http://localhost:3000` (API calls will fail without Vercel)

## How It Works

### Architecture

- **Vercel Serverless Functions**: API route at `/api/chat` handles Gemini API calls
- **Secure**: API key is stored server-side only, never exposed to the client
- **Stateless**: Each message is independent - no conversation history stored
- **No Storage**: Messages are only kept in React state during the session

### API Route

The serverless function at `api/chat.ts`:

- Receives POST requests with message, personaId, and prompt
- Uses server-side `GEMINI_API_KEY` environment variable
- Streams responses back to the client using Server-Sent Events (SSE)

### Agent Personas

1. **OS_GUIDE**: System support agent for navigation help
2. **HIRING_BOT**: Career assistant for professional inquiries
3. **DEV_PEER**: Technical lead for stack and architecture discussions

Each persona has its own system prompt embedded in the component.

### Streaming

The chat uses Gemini's streaming API through the Vercel serverless function to stream responses in real-time, providing a smooth typing experience.

## Important Notes

### Security

- **API Key Protection**: The API key is stored server-side in Vercel environment variables
- **No Client Exposure**: The API key is never sent to or accessible from the browser
- **Rate Limiting**: Consider setting up API key restrictions in Google Cloud Console

### Stateless Design

- Each message is sent independently with no conversation history
- Messages are only stored in React component state (lost on page refresh)
- No localStorage, sessionStorage, or server-side storage

## Troubleshooting

### API Key Issues

- **Local**: Make sure `.env.local` exists and contains `GEMINI_API_KEY`
- **Vercel**: Verify the environment variable is set in Vercel project settings
- Check that the variable name is exactly `GEMINI_API_KEY` (case-sensitive)
- Verify the API key is active in Google AI Studio

### API Route Not Working

- **Local**: Make sure you're using `vercel dev` to run the development server
- **Vercel**: Check function logs in Vercel dashboard for errors
- Verify the API route file is at `api/chat.ts` (not `api/chat.js`)

### Streaming Not Working

- Check browser console for errors
- Check Vercel function logs for server-side errors
- Verify your Gemini API key has proper permissions
- Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge)

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the repository in Vercel
3. Add `GEMINI_API_KEY` as an environment variable in Vercel project settings
4. Deploy

The API route will automatically be available at `/api/chat` in production.

### Environment Variables

Make sure `GEMINI_API_KEY` is set for:

- **Production**: Your live site
- **Preview**: Pull request previews
- **Development**: Local development with `vercel dev`

## File Structure

```
windose-42/
├── api/
│   └── chat.ts          # Vercel serverless function
├── components/
│   └── apps/
│       └── ChatApp.tsx   # Frontend chat component
└── .env.local            # Local environment variables (gitignored)
```
