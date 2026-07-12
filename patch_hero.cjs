const fs = require('fs');

let heroContent = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Add import
if (!heroContent.includes('AnimatedVehicles')) {
  heroContent = heroContent.replace("import { ArrowRight, CheckCircle2 } from 'lucide-react';", "import { ArrowRight, CheckCircle2 } from 'lucide-react';\nimport AnimatedVehicles from './AnimatedVehicles';");
}

// Add component before the grid starts
heroContent = heroContent.replace(
  '<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">',
  '<AnimatedVehicles />\n        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">'
);

fs.writeFileSync('src/components/Hero.tsx', heroContent);
