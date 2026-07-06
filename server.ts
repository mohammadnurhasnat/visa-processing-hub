import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      const prompt = `You are a helpful travel assistant for "Visa Processing Hub", a premium visa agency in Dhaka, Bangladesh located at Jamuna Future Park. 
      They specialize in Indian Visa services including:
      - Tourist Visa (Tourism)
      - Medical Visa (Hospital + attendant visa, fast-track)
      - Double Entry Visa (For embassy visits/interviews)
      - Business Visa (Meetings, trade fairs, conferences)
      - Visa Documentation (Expert assistance with all paperwork)
      
      Contact details:
      Phone: +09643848934
      WhatsApp: +8801332601510
      Email: visaprocessinghub@hmail.com
      Address: Level: 3/A, Jamuna Future Park, Dhaka-1229.
      
      Answer the user's question politely and professionally. Keep responses concise.
      
      User message: ${message}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  app.post("/api/contact", (req, res) => {
    // Mock contact form submission
    console.log("Contact form received:", req.body);
    res.json({ success: true, message: "Thank you for your message. We will get back to you soon!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
