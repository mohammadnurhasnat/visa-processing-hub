const fs = require('fs');

const content = `import React from 'react';
import { motion } from 'motion/react';
import { Plane } from 'lucide-react';

const PlaneWrapper = ({ size = 32 }) => (
  <div className="relative flex items-center justify-center">
    {/* Plane icon rotated to point right naturally in this wrapper */}
    <Plane size={size} className="drop-shadow-sm rotate-45 text-blue-200" fill="currentColor" fillOpacity={0.15} strokeWidth={1.5} />
    {/* Contrail pointing left from the plane */}
    <motion.div 
      className="absolute right-[65%] w-16 md:w-24 h-[1.5px] bg-gradient-to-r from-transparent to-blue-200/60 rounded-full"
      animate={{ opacity: [0.1, 0.6, 0.1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default function AnimatedVehicles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] opacity-90">
      
      {/* 1. From the left */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "-15vw", y: "25%" }}
        animate={{ x: "115vw", y: "25%" }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 3, ease: "linear", delay: 0 }}
      >
        <div style={{ transform: 'rotate(0deg)' }}><PlaneWrapper size={32} /></div>
      </motion.div>

      {/* 2. From the right side, low down */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "115vw", y: "85%" }}
        animate={{ x: "-15vw", y: "85%" }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 2.5, ease: "linear", delay: 1 }}
      >
        <div style={{ transform: 'rotate(180deg)' }}><PlaneWrapper size={40} /></div>
      </motion.div>

      {/* 3. From above */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "30vw", y: "-15%" }}
        animate={{ x: "80vw", y: "115%" }}
        transition={{ duration: 10, repeat: Infinity, repeatDelay: 4, ease: "linear", delay: 2.5 }}
      >
        <div style={{ transform: 'rotate(60deg)' }}><PlaneWrapper size={28} /></div>
      </motion.div>

      {/* 4. Fly over a section (Diagonal up) */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "-15vw", y: "60%" }}
        animate={{ x: "115vw", y: "10%" }}
        transition={{ duration: 11, repeat: Infinity, repeatDelay: 3.5, ease: "linear", delay: 4 }}
      >
        <div style={{ transform: 'rotate(-20deg)' }}><PlaneWrapper size={36} /></div>
      </motion.div>
      
    </div>
  );
}
`

fs.writeFileSync('src/components/AnimatedVehicles.tsx', content);
