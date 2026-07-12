import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage for leads
interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
}
let leads: Lead[] = [];

// Gemini Setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// API Routes
app.get("/api/leads", (req, res) => {
  res.json({ leads });
});

app.post("/api/leads/clear", (req, res) => {
  leads = [];
  res.json({ success: true });
});

app.post("/api/contact", (req, res) => {
  const { name, phone, email, service } = req.body;
  const newLead: Lead = {
    id: Date.now().toString(),
    name: name || "Unknown",
    phone: phone || "Unknown",
    email: email || "",
    service: service || "General Inquiry",
    date: new Date().toISOString(),
  };
  leads.push(newLead);
  res.json({ success: true, lead: newLead });
});

app.post("/api/webhook-summary", async (req, res) => {
  try {
    const { history, formDetails } = req.body;
    
    // Convert history to string
    const historyStr = (history || []).map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n');
    
    const prompt = `
Analyze the following chat history and contact form details for an Indian Visa processing agency.
Extract a concise summary of what the customer wants, their requested service, and their contact information.
Return the result STRICTLY as a JSON object with the following keys:
- name (string)
- phone (string)
- email (string)
- requested_service (string)
- customer_intent_summary (string)

Contact Form Details:
${JSON.stringify(formDetails, null, 2)}

Chat History:
${historyStr}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const summaryJson = result.text || "{}";
    
    // Try to send to webhook if configured
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: summaryJson
        });
        console.log("Sent summary to Make.com webhook");
      } catch (e) {
        console.error("Failed to send to webhook:", e);
      }
    } else {
      console.log("MAKE_WEBHOOK_URL not configured. Summary that would be sent:", summaryJson);
    }
    
    res.json({ success: true, summary: JSON.parse(summaryJson) });
  } catch (error) {
    console.error("Webhook summary error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    let userMsg = (message || "").toLowerCase().trim();

    const systemInstruction = `
You are a helpful, professional visa processing assistant for "Processing Hub" located at Level: 3/A, Jamuna Future Park, Dhaka-1229. You answer questions mostly in Bengali (বাংলা).

CORE RULES:
1. NEVER mention visa processing fees, costs, or prices upfront. ONLY mention them if the user explicitly asks about cost, fee, price, or "কত টাকা". 
   - If they ask for costs, use these rates: 
     Tourist Visa: Only Documentation - 1500 BDT, Only slot - 4500 BDT, Full processing with documents - 6000 BDT.
     Medical Visa: Only Documentation - 2000 BDT, Only slot - 5000 BDT, Full processing with documents - 7000 BDT.
     Business Visa: Only Documentation - 2500 BDT, Only slot - 5000 BDT, Full processing with documents - 7500 BDT. 
     Double Entry Visa: Only Documentation - 3500 BDT, Only slot - 13000 BDT, Full processing - 16500 BDT.
2. If the user asks for required documents, provide the following information:
   - Tourist Visa: Passport (min 6 months validity), NID/Birth Certificate, 2x2 inch photo, Utility Bill, Bank statement (min 6 months) or Dollar Endorsement, NOC letter (if employed), Trade License (if business), previous Indian visa (if any).
   - Medical Visa: Same as Tourist, plus Medical documents/Doctor's prescription and Appointment letter.
   - Business Visa: Same as Tourist, plus LC, IRC, TIN, BIN, Tax Return copy.
   - Double Entry Visa: Same as Tourist, plus Work permit and translated copy.
3. If the user says "Hi", "Hello", or similar greetings, your response MUST start with "Assalamualaikum".
4. If the user greets you with a Salam (e.g., "Assalamualaikum", "সালাম", "আসসালামু আলাইকুম"), your response MUST start with "Waalaikum assalam" (অথবা "ওয়ালাইকুম আসসালাম").
5. Keep your answers concise, helpful, and polite. 
6. Always ask clarifying questions if the user's intent is unclear.
7. If the user wants to submit their contact info, talk to a human, or book a specific service (e.g. "আমি Tourist Visa বুক করতে চাই"), acknowledge their request and immediately output [SHOW_CONTACT_FORM] to collect their details.
    `;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // We'll construct a single prompt with history
    const contextStr = (history || []).map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join("\n");
    const fullPrompt = `History:\n${contextStr}\n\nCurrent user message: ${userMsg}`;

    const responseStream = await chatSession.sendMessageStream({ message: fullPrompt });

    let fullText = "";
    let showContactForm = false;

    for await (const chunk of responseStream) {
      const text = chunk.text || "";
      fullText += text;
      res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
    }

    if (fullText.includes("[SHOW_CONTACT_FORM]")) {
      showContactForm = true;
      fullText = fullText.replace(/\[SHOW_CONTACT_FORM\]/g, "");
    }

    res.write(
      `data: ${JSON.stringify({
        done: true,
        reply: fullText.trim(),
        showContactForm,
        isHumanHandover: false,
      })}\n\n`
    );
    res.end();
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat" });
  }
});

async function startServer() {
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
