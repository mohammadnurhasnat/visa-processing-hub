const fs = require('fs');
let code = fs.readFileSync('src/components/ChatWidget.tsx', 'utf8');

const regex = /const handleSend = async \([^\)]*\) => {[\s\S]*?const updatedWithUser =/;
const replacement = `const handleSend = async (overrideMessage?: string | React.MouseEvent | React.KeyboardEvent) => {
    const textToSend = typeof overrideMessage === 'string' ? overrideMessage : message;
    if (!textToSend.trim()) return;
    if (typeof overrideMessage !== 'string') setMessage('');
    const userMessage = textToSend;
    
    const updatedWithUser =`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/ChatWidget.tsx', code);
