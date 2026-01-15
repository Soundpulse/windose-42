import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vercel automatically parses JSON body into req.body
    const { message, personaId, prompt } = req.body;

    if (!message || !personaId || !prompt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not configured");
      return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: prompt,
    });

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no"); // Disable buffering for nginx/Vercel

    // Handle request cancellation
    let cancelled = false;
    req.on("error", (error) => {
      if (error.message === "aborted") {
        console.log("Request aborted");
      }
      cancelled = true;
    });

    try {
      // Generate content stream
      const result = await model.generateContentStream(message);

      // Stream responses
      for await (const chunk of result.stream) {
        if (cancelled) {
          res.end();
          return;
        }

        try {
          const chunkText = chunk.text();
          if (chunkText) {
            const data = JSON.stringify({ text: chunkText, done: false });
            res.write(`data: ${data}\n\n`);
          }
        } catch (chunkError: any) {
          console.error("Error processing chunk:", chunkError);
          // Continue streaming even if one chunk fails
        }
      }

      // Send completion signal
      const done = JSON.stringify({ text: "", done: true });
      res.write(`data: ${done}\n\n`);
      res.end();
    } catch (error: any) {
      console.error("Error in chat API stream:", error);
      const errorData = JSON.stringify({
        error: error.message || "Internal server error",
        done: true,
      });
      try {
        res.write(`data: ${errorData}\n\n`);
      } catch (e) {
        // Stream might already be closed
        console.error("Failed to send error to stream:", e);
      }
      res.end();
    }
  } catch (error: any) {
    console.error("Error in chat API handler:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
