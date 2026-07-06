import { motion } from 'motion/react';
import { Menu, X, Plane, PhoneCall } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              VisaProcessing<span className="text-blue-600">Hub</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Visa Services</a>
            <a href="#packages" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Indian Visa</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="tel:+09643848934" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all flex items-center gap-2">
              <PhoneCall size={18} />
              Call Support
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 absolute w-full"
        >
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col gap-4">
            <a href="#" className="text-gray-600 font-medium py-2">Home</a>
            <a href="#services" className="text-gray-600 font-medium py-2">Services</a>
            <a href="#packages" className="text-gray-600 font-medium py-2">Packages</a>
            <a href="#about" className="text-gray-600 font-medium py-2">About Us</a>
            <a href="#contact" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium text-center">Contact Now</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
