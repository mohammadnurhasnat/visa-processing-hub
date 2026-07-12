const fs = require('fs');
let code = fs.readFileSync('src/components/ChatWidget.tsx', 'utf8');

const regex = /useEffect\(\(\) => \{\s*if \(isOpen\) \{/;
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
  }, [chatHistory, onOpen]);

  useEffect(() => {
    if (isOpen) {`;

if (code.match(regex)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/ChatWidget.tsx', code);
  console.log("Replaced successfully");
} else {
  console.log("Not found");
}
