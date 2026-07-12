const fs = require('fs');
let code = fs.readFileSync('src/components/ChatWidget.tsx', 'utf8');

const regex = /localStorage\.setItem\('lastContactFormSubmitted', 'true'\);/;
const replacement = `localStorage.setItem('lastContactFormSubmitted', 'true');
                  
                  // Trigger webhook summary immediately
                  sendWebhookSummary();`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/ChatWidget.tsx', code);
