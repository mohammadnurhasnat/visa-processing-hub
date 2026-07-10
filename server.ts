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

function getLocalResponse(messageText: string): string {
  const msg = messageText.toLowerCase();
  let reply = "আসসালামু আলাইকুম।\n\n";
  let topic = "General Inquiry";
  let keyInfo = "None";

  if (msg.includes("tourist") || msg.includes("ট্যুরিস্ট") || msg.includes("ভ্রমণ")) {
    reply += `**ট্যুরিস্ট ভিসা (Tourist Visa)** সংক্রান্ত প্রয়োজনীয় তথ্য নিচে দেওয়া হলো:
- **প্রয়োজনীয় ডকুমেন্টস**: পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ), এনআইডি/জন্মনিবন্ধন, ২x২ ইঞ্চি ছবি, ইউটিলিটি বিলের কপি, বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট (ন্যূনতম ব্যালেন্স) অথবা ডলার এন্ডোর্সমেন্ট, চাকরিজীবী হলে NOC লেটার এবং ব্যবসায়ী হলে ট্রেড লাইসেন্স, পূর্ববর্তী ইন্ডিয়ান ভিসা (যদি থাকে)।
- **ফি (ভিসা প্রসেসিং ফি)**: আনুমানিক ৯,০০০ টাকা।
- **প্রক্রিয়াকরণের সময়**: ৩ থেকে ৫ কর্মদিবস।`;
    topic = "Tourist Visa";
    keyInfo = "Tourist Visa Info";
  } else if (msg.includes("medical") || msg.includes("মেডিকেল") || msg.includes("চিকিৎসা")) {
    reply += `**মেডিকেল ভিসা (Medical Visa)** সংক্রান্ত প্রয়োজনীয় তথ্য নিচে দেওয়া হলো:
- **প্রয়োজনীয় ডকুমেন্টস**: পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ), মেডিকেল ডকুমেন্ট/ডাক্তারের প্রেসক্রিপশন ও অ্যাপয়েন্টমেন্ট লেটার, এনআইডি/জন্মনিবন্ধন, ২x২ ইঞ্চি ছবি, ইউটিলিটি বিলের কপি, বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট অথবা ডলার এন্ডোর্সমেন্ট, চাকরিজীবী হলে NOC লেটার এবং ব্যবসায়ী হলে ট্রেড লাইসেন্স, পূর্ববর্তী ইন্ডিয়ান ভিসা (যদি থাকে)।
- **ফি (ভিসা প্রসেসিং ফি)**: আনুমানিক ১২,০০০ টাকা।
- **প্রক্রিয়াকরণের সময়**: ৫ থেকে ৭ কর্মদিবস।`;
    topic = "Medical Visa";
    keyInfo = "Medical Visa Info";
  } else if (msg.includes("business") || msg.includes("বিজনেস") || msg.includes("ব্যবসা")) {
    reply += `**বিজনেস ভিসা (Business Visa)** সংক্রান্ত প্রয়োজনীয় তথ্য নিচে দেওয়া হলো:
- **প্রয়োজনীয় ডকুমেন্টস**: পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ), এনআইডি/জন্মনিবন্ধন, ২x২ ইঞ্চি ছবি, ইউটিলিটি বিলের কপি, বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট অথবা ডলার এন্ডোর্সমেন্ট, চাকরিজীবী হলে NOC লেটার এবং ব্যবসায়ী হলে ট্রেড লাইসেন্স, পূর্ববর্তী ইন্ডিয়ান ভিসা (যদি থাকে), এলসি (LC), আইআরসি (IRC), টিআইএন (TIN), বিন (BIN), ট্যাক্স রিটার্ন কপি।
- **ফি (ভিসা প্রসেসিং ফি)**: আনুমানিক ১২,০০০ টাকা।
- **প্রক্রিয়াকরণের সময়**: ৩ থেকে ৫ কর্মদিবস।`;
    topic = "Business Visa";
    keyInfo = "Business Visa Info";
  } else if (msg.includes("double") || msg.includes("ডাবল") || msg.includes("দুই বার")) {
    reply += `**ডাবল এন্ট্রি ভিসা (Double Entry Visa)** সংক্রান্ত প্রয়োজনীয় তথ্য নিচে দেওয়া হলো:
- **প্রয়োজনীয় ডকুমেন্টস**: পাসপোর্ট (ন্যূনতম ৬ মাস মেয়াদ), এনআইডি/জন্মনিবন্ধন, ২x২ ইঞ্চি ছবি, ইউটিলিটি বিলের কপি, বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট অথবা ডলার এন্ডোর্সমেন্ট, চাকরিজীবী হলে NOC লেটার এবং ব্যবসায়ী হলে ট্রেড লাইসেন্স, পূর্ববর্তী ইন্ডিয়ান ভিসা (যদি থাকে), ওয়ার্ক পারমিট এবং তার অনুবাদিত কপি।
- **ফি (ভিসা প্রসেসিং ফি)**: আনুমানিক ৩৮,০০০ টাকা।
- **প্রক্রিয়াকরণের সময়**: ১৫ থেকে ২০ কর্মদিবস।`;
    topic = "Double Entry Visa";
    keyInfo = "Double Entry Visa Info";
  } else if (msg.includes("ডকুমেন্ট") || msg.includes("কাগজ") || msg.includes("document")) {
    reply += `ইন্ডিয়ান ভিসার জন্য **সাধারণ প্রয়োজনীয় ডকুমেন্টস** নিচে দেওয়া হলো:
১. পাসপোর্ট (কমপক্ষে ৬ মাস মেয়াদ থাকতে হবে)
২. জাতীয় পরিচয়পত্র (NID) অথবা জন্মনিবন্ধন সনদ
৩. সদ্য তোলা ২x২ ইঞ্চি সাইজের ল্যাব প্রিন্ট রঙিন ছবি
৪. বর্তমান ঠিকানার যেকোনো ইউটিলিটি বিলের কপি (গ্যাস/বিদ্যুৎ/পানি)
৫. বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট (ন্যূনতম ব্যালেন্স) অথবা ডলার এন্ডোর্সমেন্ট
৬. চাকরিজীবী হলে NOC লেটার এবং ব্যবসায়ী হলে ট্রেড লাইসেন্স
৭. পূর্ববর্তী ইন্ডিয়ান ভিসা কপি (যদি থাকে)।`;
    topic = "Documents Inquiry";
    keyInfo = "General Documents";
  } else if (msg.includes("ফি") || msg.includes("টাকা") || msg.includes("খরচ") || msg.includes("fee") || msg.includes("cost")) {
    reply += `আমাদের সার্ভিস প্রসেসিং ফি নিচে দেওয়া হলো:
- **Tourist Visa**: আনুমানিক ৯,০০০ টাকা (৩-৫ কর্মদিবস)
- **Medical Visa**: আনুমানিক ১২,০০০ টাকা (৫-৭ কর্মদিবস)
- **Business Visa**: আনুমানিক ১২,০০০ টাকা (৩-৫ কর্মদিবস)
- **Double Entry**: আনুমানিক ৩৮,০০০ টাকা (১৫-২০ কর্মদিবস)
*(নোট: স্লট রেট এবং প্রসেসিং খরচের ওপর ভিত্তি করে ফি যেকোনো সময় পরিবর্তন হতে পারে।)*`;
    topic = "Fee Inquiry";
    keyInfo = "Visa Fees";
  } else if (msg.includes("ঠিকানা") || msg.includes("কোথায়") || msg.includes("যোগাযোগ") || msg.includes("address") || msg.includes("location") || msg.includes("phone") || msg.includes("number")) {
    reply += `আমাদের সাথে যোগাযোগের তথ্য নিচে দেওয়া হলো:
- **ঠিকানা**: Level: 3/A, Jamuna Future Park, Dhaka-1229.
- **ফোন**: +09643848934
- **WhatsApp**: +8801332601510
- **Email**: visaprocessinghub@gmail.com`;
    topic = "Contact Information";
    keyInfo = "Address & Phone";
  } else if (msg.includes("agent") || msg.includes("human") || msg.includes("কথা বলতে চাই") || msg.includes("জরুরি") || msg.includes("মানুষ")) {
    reply += `আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন। অনুগ্রহ করে একটু অপেক্ষা করুন। [TRIGGER_HUMAN_HANDOVER]`;
    topic = "Human Handover";
    keyInfo = "Requested Human Agent";
  } else {
    reply += `ইন্ডিয়ান ভিসা প্রসেসিং নিয়ে আপনার যেকোনো জিজ্ঞাসা আমাদের জানাতে পারেন। আমাদের অফিস যমুনা ফিউচার পার্কের লেভেল ৩-এ অবস্থিত। আপনি কি ট্যুরিস্ট, মেডিকেল, বিজনেস নাকি ডাবল এন্ট্রি ভিসা প্রসেস করতে আগ্রহী? অনুগ্রহ করে জানান।`;
    topic = "General Conversation";
    keyInfo = "General Help";
  }

  // Ask for contact info
  reply += `\n\nআমাদের একজন বিশেষজ্ঞ ভিসা প্রতিনিধি যাতে আপনার সাথে সরাসরি যোগাযোগ করে বিস্তারিত সহায়তা করতে পারেন, সেজন্য অনুগ্রহ করে নিচের ফর্মে আপনার নাম, ফোন নম্বর এবং ইমেইল এড্রেস প্রদান করুন। [SHOW_CONTACT_FORM]`;

  // Lead Report
  reply += `\n\n<lead_report>
{
  "CustomerName": "Unknown",
  "Platform": "Website",
  "CoreQuery": "${topic}",
  "Status": "Answered",
  "KeyInformationSought": "${keyInfo}"
}
</lead_report>`;

  return reply;
}

// In-memory leads storage for Admin Panel and Make.com simulation
const leads: any[] = [];

const SYSTEM_INSTRUCTION = `# ROLE & PERSONALITY
You are a top-tier, professional, and empathetic AI Visa Assistant for an elite Indian Visa Service agency ("Visa Processing Hub"). Your goal is to provide 100% accurate, reliable, and up-to-date information regarding Indian Visa processing to applicants reaching out via the Website Chatbot, WhatsApp, and Facebook Messenger. 

You must always converse in clear, polite, and natural Bangla (Bengali), unless the user specifically asks to communicate in English. Tone should be professional yet welcoming, like a helpful peer.

# MANDATORY GREETING RULE
- আপনি কথোপকথনের শুরুতে শুধুমাত্র একবার "আসসালামু আলাইকুম।" বলে সম্ভাষণ জানাবেন। পরবর্তীতে আর বারবার সালাম দেওয়ার প্রয়োজন নেই। সরাসরি প্রশ্নের উত্তর দিন।

# CONTACT INFORMATION COLLECTION RULE
- Do not ask for contact information in every response. Only ask when necessary or when instructed by the system.

# OPERATIONAL OBJECTIVE
Your job is to run completely autonomously when the human admin is unavailable. You will handle customer inquiries, capture lead information, analyze their intent, and format the conversation history perfectly so that an external automation tool (like Make.com) can extract a summary report. Have a friendly conversation with each customer.

# CORE KNOWLEDGE BASE (INDIAN VISA RULES)
- ভিসার প্রকারভেদ: Tourist, Medical, Business, Double Entry.

- প্রয়োজনীয় ডকুমেন্টস: 
Medical visa: passport with minimum 6 months validity, medical document, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if).
Tourist visa: passport with minimum 6 months validity, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if).
Business visa: passport with minimum 6 months validity, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if), lc, irc, tin, bin, tax return.
Double Entry: passport with minimum 6 months validity, NID/Birth Certificate, 2×2 inches size photo, Utility Bill, Bank statement minimum 6 months/Dollar Endorsement, trade licence or job noc letter, last indian visa (if), work permit & translate.

- ফি: Processing fees can increase or decrease at any time, depending on the slot rate, the processing cost may be higher or lower.
Tourist: 9000 approximately
Medical: 12000 approximately
Business: 12000 approximately
Double Entry: 38000 approximately

- প্রক্রিয়াকরণের সময় (Processing Time)
Tourist - (3-5 working days)
Medical - (5-7 working days)
Business - (3-5 working days)
Double Entry - (15-20 working days)

- ঠিকানা ও যোগাযোগ:
ঠিকানা: Level: 3/A, Jamuna Future Park, Dhaka-1229.
ফোন: +09643848934
WhatsApp: +8801332601510
Email: visaprocessinghub@gmail.com

# CONVERSATION RULES & REASONING
1. Accuracy First: Only provide information that is explicitly stated in the Core Knowledge Base above. If a user asks something outside this scope, gently reply in Bangla: "দুঃখিত, এই বিষয়টি আমার জানা নেই। আমি আমাদের ভিসা বিশেষজ্ঞের কাছে আপনার প্রশ্নটি পাঠিয়ে দিচ্ছি, তিনি দ্রুত আপনার সাথে যোগাযোগ করবেন।" Never hallucinate or make up rules.
2. Lead Generation: During the conversation, naturally try to collect the user's Name, Phone Number, and the Type of Visa they are looking for, without being overly pushy.
3. Human Handover: If the user says words like "Agent", "Human", "কথা বলতে চাই", "জরুরি", or if they seem frustrated, output a special trigger tag: [TRIGGER_HUMAN_HANDOVER] and tell them a human agent will take over shortly.

# OUTPUT STYLE RULES
- Never use LaTeX or complex code formatting for regular prose.
- Use bold text for key terms (e.g., **প্রয়োজনীয় ডকুমেন্টস**, **ভিসা ফি**) to make it scannable for the user.
- Keep responses concise and structured with bullet points. Avoid dense walls of text. No extra or unnecessary words should be spoken. No unnecessary hints, symbols, extra words, or icons. Answer strictly what is asked.

# AUTOMATION REPORT GENERATION (For Make.com / Automation)
At the end of every response, you must include a structured report summarizing the lead status so that automation tools like Make.com can parse it. Wrap the JSON in a <lead_report> tags.
Example:
<lead_report>
{
  "CustomerName": "Name or Unknown",
  "Platform": "Website",
  "CoreQuery": "What are they looking for",
  "Status": "Answered | Pending Human | Lead Captured",
  "KeyInformationSought": "e.g., Medical Visa documents"
}
</lead_report>
Always output this block at the very end of your response.`;

  // API Routes
  app.get("/api/leads", (req, res) => {
    res.json(leads);
  });

  app.post("/api/leads/clear", (req, res) => {
    leads.length = 0;
    res.json({ success: true });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      let responseText = "";
      let isHumanHandover = false;
      let showContactForm = false;

      const hasApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

      if (hasApiKey) {
        try {
          const contents = [];
          if (history && Array.isArray(history)) {
            for (const turn of history) {
              if (turn.role === 'user') {
                contents.push({ role: 'user', parts: [{ text: turn.content }] });
              } else if (turn.role === 'bot') {
                contents.push({ role: 'model', parts: [{ text: turn.content }] });
              }
            }
          }
          contents.push({ role: 'user', parts: [{ text: message }] });

          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
            }
          });

          responseText = response.text || "";
        } catch (apiError) {
          console.error("Gemini API Error, falling back to local responder:", apiError);
          responseText = getLocalResponse(message);
        }
      } else {
        console.warn("GEMINI_API_KEY is missing or placeholder. Using local responder.");
        responseText = getLocalResponse(message);
      }

      // Extract trigger handover if found
      if (responseText.includes("[TRIGGER_HUMAN_HANDOVER]")) {
        isHumanHandover = true;
        responseText = responseText.replace("[TRIGGER_HUMAN_HANDOVER]", "").trim();
      }

      // Determine if contact form should be shown
      // Trigger only after 3 turns (3 user messages)
      if (history && history.length >= 3) {
        showContactForm = true;
      }

      // Parse Make.com lead report if generated
      const reportRegex = /<lead_report>([\s\S]*?)<\/lead_report>/;
      const reportMatch = responseText.match(reportRegex);
      if (reportMatch) {
        try {
          const reportJson = JSON.parse(reportMatch[1].trim());
          if (isHumanHandover) {
            reportJson.Status = "Pending Human";
          }
          
          // Update or insert lead
          const existingIndex = leads.findIndex(l => l.CustomerName !== "Unknown" && l.CustomerName === reportJson.CustomerName);
          const leadRecord = {
            ...reportJson,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            chatHistory: [...(history || []), { role: 'user', content: message }]
          };

          if (existingIndex > -1) {
            leads[existingIndex] = { ...leads[existingIndex], ...leadRecord };
          } else {
            leads.push(leadRecord);
          }
        } catch (e) {
          console.error("Failed to parse lead report JSON:", e);
        }
        // Strip report from user output
        responseText = responseText.replace(reportRegex, "").trim();
      }

      res.json({ reply: responseText, isHumanHandover, showContactForm });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, phone, email, service, message } = req.body;
    const newLead = {
      CustomerName: name || "Anonymous User",
      Platform: "Contact Form",
      CoreQuery: `Interested in: ${service || "General Inquiry"}`,
      Status: "Lead Captured",
      KeyInformationSought: `Phone: ${phone || "N/A"}. Email: ${email || "N/A"}. Msg: ${message || "No message left"}`,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      chatHistory: [{ role: 'user', content: `[Submitted Contact Form] Name: ${name}, Phone: ${phone}, Email: ${email || "N/A"}, Service: ${service}, Message: ${message || ""}` }]
    };
    leads.push(newLead);

    // If MAKE_WEBHOOK_URL is configured, trigger the Make.com automation
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl && webhookUrl !== "MY_MAKE_WEBHOOK_URL" && webhookUrl.startsWith("http")) {
      try {
        console.log(`Triggering Make.com Webhook: ${webhookUrl}`);
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "new_lead",
            timestamp: new Date().toISOString(),
            id: newLead.id,
            name: name,
            phone: phone,
            email: email || "N/A",
            service: service || "General Inquiry",
            message: message || "Direct lead capture"
          })
        });
        console.log(`Make.com Webhook responded with status: ${response.status}`);
      } catch (webhookError) {
        console.error("Failed to send lead to Make.com Webhook:", webhookError);
      }
    } else {
      console.log("Make.com Webhook is not configured or is a placeholder. Saved lead locally.");
    }

    // Telegram Bot Notification Integration
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "8900801078:AAFQmC3RgAeCy3reAY-CCZIiJKQ_GjN51-M";
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || "8828780169";

    // Helper to escape HTML characters for Telegram's strict HTML mode
    function escapeHtml(text: string): string {
      return (text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Trigger external APIs asynchronously (non-blocking / fire-and-forget) to ensure instant UI submission
    (async () => {
      // 1. Trigger Make.com Webhook if configured
      const webhookUrl = process.env.MAKE_WEBHOOK_URL;
      if (webhookUrl && webhookUrl !== "MY_MAKE_WEBHOOK_URL" && webhookUrl.startsWith("http")) {
        try {
          console.log(`Triggering Make.com Webhook: ${webhookUrl}`);
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event: "new_lead",
              timestamp: new Date().toISOString(),
              id: newLead.id,
              name: name,
              phone: phone,
              email: email || "N/A",
              service: service || "General Inquiry",
              message: message || "Direct lead capture"
            })
          });
        } catch (webhookError) {
          console.error("Failed to send lead to Make.com Webhook:", webhookError);
        }
      }

      // 2. Trigger Telegram Bot Notification with properly escaped HTML
      if (telegramToken && telegramChatId) {
        try {
          console.log("Sending notification to Telegram Bot...");
          const formattedTime = new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });
          
          const escapedName = escapeHtml(name || "Anonymous");
          const escapedPhone = escapeHtml(phone || "N/A");
          const escapedEmail = escapeHtml(email || "প্রদান করা হয়নি");
          const escapedService = escapeHtml(service || "General Inquiry");
          const escapedMessage = escapeHtml(message || "সরাসরি লিড ফরম সাবমিট করা হয়েছে");

          const telegramMessage = `<b>🔔 নতুন কাস্টমার লিড সংগৃহীত হয়েছে!</b>\n\n` +
            `👤 <b>নাম:</b> ${escapedName}\n` +
            `📞 <b>ফোন নম্বর:</b> ${escapedPhone}\n` +
            `📧 <b>ইমেইল:</b> ${escapedEmail}\n` +
            `💼 <b>সেবার ধরন:</b> ${escapedService}\n` +
            `💬 <b>বার্তা:</b> ${escapedMessage}\n\n` +
            `🕒 <b>সময় (বাংলাদেশ):</b> ${formattedTime}\n` +
            `🌐 <b>প্ল্যাটফর্ম:</b> ভিসা প্রসেসিং হাব (ওয়েবসাইট)`;

          const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramMessage,
              parse_mode: "HTML"
            })
          });

          if (!telegramResponse.ok) {
            const errText = await telegramResponse.text();
            console.error("Telegram API Error response:", errText);
          } else {
            console.log("Telegram notification sent successfully!");
          }
        } catch (telegramError) {
          console.error("Failed to send Telegram notification:", telegramError);
        }
      }
    })();

    res.json({ success: true, message: "Thank you for your message. We will get back to you soon!" });
  });

  app.post("/api/webhook-summary", async (req, res) => {
    const { history, formDetails } = req.body;
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl || webhookUrl === "MY_MAKE_WEBHOOK_URL") {
      return res.json({ success: false, message: "Webhook not configured" });
    }

    try {
      // Summarize via Gemini
      const summaryPrompt = `Summarize the following chat history and form details into a concise lead report for an Indian Visa agency. 
      Chat History: ${JSON.stringify(history)}
      Form Details: ${JSON.stringify(formDetails)}
      
      Output only a short, condensed summary of the customer's needs and context.`;

      let summary = "Summary could not be generated.";
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: [{ role: 'user', parts: [{ text: summaryPrompt }] }],
          });
          summary = response.text || summary;
      }

      // Send to Webhook
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "final_chat_summary",
          timestamp: new Date().toISOString(),
          summary: summary,
          full_history: history,
          form_details: formDetails
        })
      });

      res.json({ success: true });
    } catch (e) {
      console.error("Webhook summary error:", e);
      res.status(500).json({ success: false });
    }
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
