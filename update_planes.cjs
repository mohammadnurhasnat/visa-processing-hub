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
      
      {/* Plane 1: Left to Right (Straight) */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "-15vw", y: "15%" }}
        animate={{ x: "115vw", y: "15%" }}
        transition={{ duration: 7, repeat: Infinity, repeatDelay: 1.5, ease: "linear", delay: 0 }}
      >
        <div className="rotate-0"><PlaneWrapper size={28} /></div>
      </motion.div>

      {/* Plane 2: Bottom-Left to Top-Right */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "-15vw", y: "115%" }}
        animate={{ x: "115vw", y: "-15%" }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 2.5, ease: "linear", delay: 1 }}
      >
        <div className="-rotate-45"><PlaneWrapper size={36} /></div>
      </motion.div>

      {/* Plane 3: Right to Left (Straight) */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "115vw", y: "75%" }}
        animate={{ x: "-15vw", y: "75%" }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 2, ease: "linear", delay: 2.5 }}
      >
        <div className="rotate-180"><PlaneWrapper size={24} /></div>
      </motion.div>

      {/* Plane 4: Top-Left to Bottom-Right */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "-15vw", y: "-15%" }}
        animate={{ x: "115vw", y: "115%" }}
        transition={{ duration: 11, repeat: Infinity, repeatDelay: 3, ease: "linear", delay: 1.5 }}
      >
        <div className="rotate-45"><PlaneWrapper size={40} /></div>
      </motion.div>

      {/* Plane 5: Top-Right to Bottom-Left */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "115vw", y: "-15%" }}
        animate={{ x: "-15vw", y: "115%" }}
        transition={{ duration: 10, repeat: Infinity, repeatDelay: 2, ease: "linear", delay: 3 }}
      >
        <div className="rotate-[135deg]"><PlaneWrapper size={32} /></div>
      </motion.div>

      {/* Plane 6: Left to Right (Slightly Up) */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        initial={{ x: "-15vw", y: "90%" }}
        animate={{ x: "115vw", y: "40%" }}
        transition={{ duration: 8.5, repeat: Infinity, repeatDelay: 1.5, ease: "linear", delay: 0.5 }}
      >
        <div className="-rotate-[20deg]"><PlaneWrapper size={28} /></div>
      </motion.div>
      
    </div>
  );
}
`

fs.writeFileSync('src/components/AnimatedVehicles.tsx', content);
