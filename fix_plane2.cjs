const fs = require('fs');
let content = fs.readFileSync('src/components/AnimatedVehicles.tsx', 'utf8');

content = content.replace(
  /initial={{ x: "-10%", y: "70%" }}.*?times: \[0, 0\.3, 0\.7, 1\]\s*}}/s,
  `initial={{ x: "-10%", y: "70%" }}
        animate={{ 
          x: ["-10%", "50%", "80%", "110%"],
          y: ["70%", "30%", "20%", "60%"],
          rotate: [-15, -10, 15, 30],
        }}
        transition={{ 
          duration: 16, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.4, 0.7, 1]
        }}`
);

fs.writeFileSync('src/components/AnimatedVehicles.tsx', content);
