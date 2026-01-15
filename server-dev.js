// Simple dev server for local development when not using Vercel CLI
// Run with: node server-dev.js
// Then use: pnpm run dev (in another terminal)

import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message, personaId, prompt } = req.body;

    if (!message || !personaId || !prompt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: prompt,
    });

    // Set up SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Generate content stream
    const result = await model.generateContentStream(message);

    // Stream responses
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        const data = JSON.stringify({ text: chunkText, done: false });
        res.write(`data: ${data}\n\n`);
      }
    }

    // Send completion signal
    const done = JSON.stringify({ text: "", done: true });
    res.write(`data: ${done}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error in chat API:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message || "Internal server error" });
    } else {
      const errorData = JSON.stringify({ error: error.message, done: true });
      res.write(`data: ${errorData}\n\n`);
      res.end();
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dev server running on http://localhost:${PORT}`);
  console.log(`✅ Proxy this from Vite dev server`);
  if (!process.env.GEMINI_API_KEY) {
    console.log(`❌ GEMINI_API_KEY not found in .env.local`);
  } else {
    console.log(`✅ GEMINI_API_KEY configured`);
  }
});
