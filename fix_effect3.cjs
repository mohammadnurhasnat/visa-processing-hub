const fs = require('fs');
let code = fs.readFileSync('src/components/ChatWidget.tsx', 'utf8');

// The code now has two identical useEffect blocks. Let's find one and remove it.
const regex = /useEffect\(\(\) => \{\s*const handleTrigger = \(e: Event\) => \{[\s\S]*?\}, \[chatHistory, onOpen\]\);\s*useEffect\(\(\) => \{\s*const handleTrigger = \(e: Event\) => \{[\s\S]*?\}, \[chatHistory, onOpen\]\);/g;

const match = code.match(regex);
if (match) {
  const replacement = `useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent;
      const text = customEvent.detail;
      if (onOpen) onOpen();
      else setInternalIsOpen(true);
      
      handleSend(text);
    };
    window.addEventListener('TRIGGER_CHAT', handleTrigger);
    return () => window.removeEventListener('TRIGGER_CHAT', handleTrigger);
  }, [chatHistory, onOpen]);`;
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/ChatWidget.tsx', code);
  console.log("Fixed double insertion");
}
