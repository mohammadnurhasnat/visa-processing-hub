const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

content = content.replace(
  "{ label: 'Happy Clients', value: '4k+', desc: 'Across Bangladesh' },",
  "{ label: 'Happy Clients', value: '4k+', desc: '' },"
);
content = content.replace(
  "{ label: 'Tours Covered', value: '10+', desc: 'Specialized tourist spots' },",
  "{ label: 'Tours Covered', value: '10+', desc: '' },"
);

fs.writeFileSync('src/components/Hero.tsx', content);
