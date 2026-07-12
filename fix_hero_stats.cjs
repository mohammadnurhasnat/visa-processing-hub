const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

content = content.replace(
  "{ label: 'Accurate guidelines', value: '100%', desc: 'Accurate guidelines' },",
  "{ label: 'Accurate guidelines', value: '100%', desc: '' },"
);
content = content.replace(
  "{ label: 'Years Experience', value: '4+', desc: 'Experienced visa support' },",
  "{ label: 'Years Experience', value: '4+', desc: '' },"
);

fs.writeFileSync('src/components/Hero.tsx', content);
