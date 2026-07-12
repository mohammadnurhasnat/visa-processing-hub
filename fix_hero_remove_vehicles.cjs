const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

content = content.replace("import AnimatedVehicles from './AnimatedVehicles';\n", "");
content = content.replace("        <AnimatedVehicles />\n", "");

fs.writeFileSync('src/components/Hero.tsx', content);
