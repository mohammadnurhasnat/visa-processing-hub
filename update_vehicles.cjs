const fs = require('fs');

const content = `import React from 'react';
import { motion } from 'motion/react';
import { Plane, Bike, TrainFront, Bus, Sailboat } from 'lucide-react';

export default function AnimatedVehicles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] opacity-100">
      {/* Airplane: Takeoff, Cruise, Land, Turn, Repeat */}
      <motion.div
        className="absolute text-blue-600 flex items-center"
        initial={{ x: "-20vw", y: "80%" }}
        animate={{ 
          x: ["-20vw", "30vw", "70vw", "120vw", "120vw", "70vw", "30vw", "-20vw"],
          y: ["80%", "15%", "15%", "80%", "80%", "15%", "15%", "80%"],
          rotate: [-25, 0, 0, 25, -25, 0, 0, 25],
          rotateY: [0, 0, 0, 0, 180, 180, 180, 180]
        }}
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.5, 0.501, 0.7, 0.9, 1]
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Wind effect / Contrails */}
          <motion.div 
            className="absolute right-full w-24 h-[4px] bg-gradient-to-r from-transparent to-blue-400 rounded-full origin-right mr-2"
            animate={{ opacity: [0.4, 1, 0.4], scaleX: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <Plane size={64} className="drop-shadow-2xl rotate-45" fill="currentColor" fillOpacity={0.3} />
        </div>
      </motion.div>

      {/* Sailboat */}
      <motion.div
        className="absolute top-[35%] md:top-[40%] text-cyan-600 flex flex-col items-center"
        initial={{ x: "-20vw" }}
        animate={{ 
          x: ["-20vw", "120vw"],
          y: [0, -15, 0, 15, 0]
        }}
        transition={{ 
          x: { duration: 40, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative flex flex-col items-center">
          <Sailboat size={56} className="drop-shadow-xl" fill="currentColor" fillOpacity={0.3} />
          {/* Water ripples */}
          <motion.div 
            className="absolute -bottom-1 w-20 h-2 border-b-[4px] border-cyan-400 rounded-[50%]"
            animate={{ scaleX: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-3 w-28 h-2 border-b-[4px] border-cyan-300 rounded-[50%]"
            animate={{ scaleX: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Train */}
      <motion.div
        className="absolute top-[55%] text-gray-700 flex flex-col items-center"
        initial={{ x: "120vw" }}
        animate={{ x: ["120vw", "-20vw"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
      >
        <div className="relative">
          {/* Wind effect for train */}
          <motion.div 
            className="absolute left-full bottom-2 w-28 h-[4px] bg-gradient-to-l from-transparent to-gray-500 rounded-full ml-2"
            animate={{ opacity: [0.3, 0.9, 0.3], x: [0, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <TrainFront size={64} className="-scale-x-100 drop-shadow-xl" fill="currentColor" fillOpacity={0.2} />
          {/* Tracks effect */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[150vw] h-[3px] border-b-[4px] border-dashed border-gray-400 -z-10"></div>
        </div>
      </motion.div>

      {/* Motorcycle */}
      <motion.div
        className="absolute top-[70%] text-emerald-700"
        initial={{ x: "-20vw" }}
        animate={{ 
          x: ["-20vw", "120vw"],
          y: [0, -8, 0, -4, 0]
        }}
        transition={{ 
          x: { duration: 22, repeat: Infinity, ease: "linear", delay: 4 },
          y: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          <Bike size={52} className="drop-shadow-xl" />
          {/* Wind/dust effect */}
          <motion.div 
            className="absolute right-full bottom-0 w-20 h-8 mr-2"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <div className="absolute top-2 right-0 w-12 h-[4px] bg-gradient-to-r from-transparent to-emerald-500 rounded-full" />
            <div className="absolute top-6 right-2 w-10 h-[4px] bg-gradient-to-r from-transparent to-emerald-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Bus */}
      <motion.div
        className="absolute top-[85%] text-orange-600"
        initial={{ x: "120vw" }}
        animate={{ x: ["120vw", "-20vw"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 1 }}
      >
        <div className="relative">
          <Bus size={60} className="-scale-x-100 drop-shadow-2xl" fill="currentColor" fillOpacity={0.2} />
          {/* Exhaust/Wind effect */}
          <motion.div 
            className="absolute left-full bottom-2 w-20 h-8 flex flex-col justify-end gap-2 ml-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <div className="w-full h-[4px] bg-gradient-to-l from-transparent to-orange-500 rounded-full" />
            <div className="w-3/4 h-[4px] bg-gradient-to-l from-transparent to-orange-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/AnimatedVehicles.tsx', content);
