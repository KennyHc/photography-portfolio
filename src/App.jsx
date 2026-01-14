import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Menu, X, ArrowRight } from 'lucide-react';

import SmoothScroll from './components/layout/SmoothScroll';
import Hero3D from './components/home/Hero3D';
import Gallery from './components/gallery/Gallery';
import Contact from './components/home/Contact';

// --- 1. The Navigation Overlay Component ---
function NavigationOverlay({ isOpen, onClose }) {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Custom bezier for "luxury" feel
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }
    })
  };

  const links = [
    { name: "Selected Works", href: "#gallery" },
    { name: "About Me", href: "#" },
    { name: "Services", href: "#" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-center items-center"
        >
          {/* Background Decorative Element */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/30 to-black pointer-events-none" />

          <nav className="relative z-10 flex flex-col gap-8 items-center">
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                custom={i}
                variants={linkVariants}
                href={link.href}
                onClick={onClose} // Close menu when clicked
                className="group flex items-center gap-4 text-5xl md:text-7xl font-light tracking-tighter hover:text-gray-400 transition-colors cursor-pointer"
              >
                <span>{link.name}</span>
                <ArrowRight 
                  className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" 
                  size={48} 
                  strokeWidth={1}
                />
              </motion.a>
            ))}
          </nav>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8 } }}
            className="absolute bottom-12 text-gray-500 text-sm tracking-widest uppercase"
          >
            Peru — China — Canada - Madrid
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- 2. Updated Header with Toggle Logic ---
function Header({ isOpen, toggleMenu }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
        <Camera size={24} />
        <span>KENNY</span>
      </div>
      
      <button 
        onClick={toggleMenu}
        className="group p-2 hover:bg-white/10 rounded-full transition-colors z-50 relative"
      >
        {/* Animated Icon Swap */}
        <div className="relative w-6 h-6">
            <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                <Menu size={24} />
            </span>
            <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                <X size={24} />
            </span>
        </div>
      </button>
    </nav>
  );
}

// --- 3. Main App Component ---
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-background text-primary min-h-screen selection:bg-white selection:text-black">
      <SmoothScroll>
        
        <Header 
          isOpen={isMenuOpen} 
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        />
        
        {/* The Menu Overlay */}
        <NavigationOverlay 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
        
        <main>
          <Hero3D />
          
          {/* Added ID for anchor scrolling */}
          <div id="gallery">
            <Gallery />
          </div>
          
          <div id="contact">
            <Contact />
          </div>
        </main>
        
        <footer className="h-20 flex items-center justify-center border-t border-white/5 text-gray-700 text-sm">
            <p>© 2026 Kenny Photography.</p>
        </footer>

      </SmoothScroll>
    </div>
  );
}

export default App;