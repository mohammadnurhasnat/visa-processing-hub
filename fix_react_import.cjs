const fs = require('fs');
let code = fs.readFileSync('src/components/ChatWidget.tsx', 'utf8');

if (!code.includes('import React')) {
  code = code.replace(/import \{ useState/, "import React, { useState");
  fs.writeFileSync('src/components/ChatWidget.tsx', code);
}
