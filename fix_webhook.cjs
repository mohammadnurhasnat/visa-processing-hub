const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /app\.post\("\/api\/webhook-summary", \(req, res\) => \{\n  res\.json\(\{ success: true \}\);\n\}\);/;
const replacement = `app.post("/api/webhook-summary", async (req, res) => {
  try {
    const { history, formDetails } = req.body;
    
    // Convert history to string
    const historyStr = (history || []).map((h: any) => \`\${h.role === 'user' ? 'User' : 'Assistant'}: \${h.content}\`).join('\\n');
    
    const prompt = \`
Analyze the following chat history and contact form details for an Indian Visa processing agency.
Extract a concise summary of what the customer wants, their requested service, and their contact information.
Return the result STRICTLY as a JSON object with the following keys:
- name (string)
- phone (string)
- email (string)
- requested_service (string)
- customer_intent_summary (string)

Contact Form Details:
\${JSON.stringify(formDetails, null, 2)}

Chat History:
\${historyStr}
\`;

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
});`;

code = code.replace(regex, replacement);
fs.writeFileSync('server.ts', code);
