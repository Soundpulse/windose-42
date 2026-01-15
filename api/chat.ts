import { GoogleGenerativeAI } from "@google/generative-ai";

// Vercel serverless function
export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
  } catch (error: any) {
    console.error("Error in chat API:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message || "Internal server error" });
    } else {
      const errorData = JSON.stringify({ error: error.message, done: true });
      res.write(`data: ${errorData}\n\n`);
      res.end();
    }
  }
}
