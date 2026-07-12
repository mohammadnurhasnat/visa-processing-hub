const fs = require('fs');

const appContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AdminLeads from './components/AdminLeads';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeWidget, setActiveWidget] = useState<'chat' | 'admin' | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past a portion of the hero section (e.g., 400px)
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
      <Navbar onOpenAdmin={() => setActiveWidget(activeWidget === 'admin' ? null : 'admin')} />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Contact />
      </main>
      <Footer />
      
      {/* Coordinated Floating Console Panel */}
      <ChatWidget 
        isOpen={activeWidget === 'chat'} 
        onOpen={() => setActiveWidget('chat')} 
        onClose={() => setActiveWidget(null)} 
      />
      <AdminLeads 
        isOpen={activeWidget === 'admin'} 
        onOpen={() => setActiveWidget('admin')} 
        onClose={() => setActiveWidget(null)} 
      />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
`;

fs.writeFileSync('src/App.tsx', appContent);
