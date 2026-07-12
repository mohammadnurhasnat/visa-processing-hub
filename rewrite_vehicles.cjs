const fs = require('fs');

const content = `import React from 'react';
import { motion } from 'motion/react';
import { Plane, Bike, TrainFront, Bus, Sailboat } from 'lucide-react';

export default function AnimatedVehicles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] opacity-60 md:opacity-80">
      {/* Airplane */}
      <motion.div
        className="absolute text-blue-300 flex flex-col items-center justify-center"
        initial={{ x: "-10%", y: "90%" }}
        animate={{ 
          x: ["-10%", "10%", "40%", "80%", "110%"],
          y: ["90%", "30%", "20%", "20%", "90%"],
          rotate: [0, 0, 90, 90, 160],
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.35, 0.55, 0.75, 1]
        }}
      >
        <div className="relative flex flex-col items-center justify-center">
          <Plane size={40} className="drop-shadow-lg -rotate-45" fill="currentColor" fillOpacity={0.1} strokeWidth={1.5} />
          {/* Contrail pointing back/down */}
          <motion.div 
            className="absolute top-[80%] w-[3px] h-16 bg-gradient-to-b from-blue-200 to-transparent rounded-full"
            animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [1, 1.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ originY: 0 }}
          />
        </div>
      </motion.div>

      {/* Sailboat */}
      <motion.div
        className="absolute top-[35%] text-cyan-300 flex flex-col items-center"
        initial={{ x: "-10%" }}
        animate={{ 
          x: ["-10%", "110%"],
          y: [0, -10, 0, 10, 0]
        }}
        transition={{ 
          x: { duration: 22, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative flex flex-col items-center">
          <Sailboat size={32} className="drop-shadow-lg" fill="currentColor" fillOpacity={0.1} strokeWidth={1.5} />
          {/* Water ripples */}
          <motion.div 
            className="absolute -bottom-1 w-12 h-1.5 border-b-[2px] border-cyan-200 rounded-[50%]"
            animate={{ scaleX: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Train */}
      <motion.div
        className="absolute top-[50%] text-gray-300 flex flex-col items-center"
        initial={{ x: "110%" }}
        animate={{ x: ["110%", "-10%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 1 }}
      >
        <div className="relative">
          <motion.div 
            className="absolute left-full bottom-1 w-16 h-[2px] bg-gradient-to-l from-transparent to-gray-300 rounded-full ml-2"
            animate={{ opacity: [0.3, 0.7, 0.3], x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <TrainFront size={36} className="-scale-x-100 drop-shadow-lg" fill="currentColor" fillOpacity={0.1} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Motorcycle */}
      <motion.div
        className="absolute top-[65%] text-emerald-300"
        initial={{ x: "-10%" }}
        animate={{ 
          x: ["-10%", "110%"],
          y: [0, -6, 0, -3, 0]
        }}
        transition={{ 
          x: { duration: 14, repeat: Infinity, ease: "linear", delay: 2 },
          y: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          <Bike size={28} className="drop-shadow-lg" strokeWidth={1.5} />
          <motion.div 
            className="absolute right-full bottom-0 w-12 h-4 mr-2"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <div className="absolute top-1 right-0 w-8 h-[2px] bg-gradient-to-r from-transparent to-emerald-200 rounded-full" />
            <div className="absolute top-3 right-2 w-6 h-[2px] bg-gradient-to-r from-transparent to-emerald-200 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Bus */}
      <motion.div
        className="absolute top-[80%] text-orange-300"
        initial={{ x: "110%" }}
        animate={{ x: ["110%", "-10%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 0.5 }}
      >
        <div className="relative">
          <Bus size={32} className="-scale-x-100 drop-shadow-lg" fill="currentColor" fillOpacity={0.1} strokeWidth={1.5} />
          <motion.div 
            className="absolute left-full bottom-1 w-12 h-4 flex flex-col justify-end gap-1 ml-2"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <div className="w-full h-[2px] bg-gradient-to-l from-transparent to-orange-200 rounded-full" />
            <div className="w-3/4 h-[2px] bg-gradient-to-l from-transparent to-orange-200 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/AnimatedVehicles.tsx', content);
