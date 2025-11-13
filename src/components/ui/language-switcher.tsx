'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locales } from '../../i18n/request';

export function FloatingLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  const getLanguageCode = (lang: string) => {
    return lang.toUpperCase();
  };

  // Get other languages (not current)
  const otherLanguages = locales.filter(lang => lang !== locale);

  // Close FAB when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={fabRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end space-y-reverse space-y-3"
    >
      {/* Secondary Action Buttons */}
      <AnimatePresence>
        {isOpen && otherLanguages.map((lang, index) => (
          <motion.button
            key={lang}
            initial={{ 
              opacity: 0, 
              scale: 0,
              y: 20,
              rotate: -45
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              rotate: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0,
              y: 20,
              rotate: -45
            }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleLanguageChange(lang)}
            className="group w-14 h-14 bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gray-50/95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
            aria-label={`Switch to ${getLanguageCode(lang)}`}
          >
            {/* Hover background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.2 }}
            />
            
            {/* Language code */}
            <span className="text-sm font-bold relative z-10 group-hover:scale-110 transition-transform duration-200">
              {getLanguageCode(lang)}
            </span>
            
            {/* Language code tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg border border-gray-700/50 pointer-events-none whitespace-nowrap"
            >
              {getLanguageCode(lang)}
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900/95 border-r border-b border-gray-700/50 rotate-45" />
            </motion.div>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-xl hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
        aria-label="Language switcher"
        aria-expanded={isOpen}
      >
        {/* Animated background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Current language content */}
        <motion.div
          animate={{ 
            rotate: isOpen ? 45 : 0,
            scale: isOpen ? 0.9 : 1
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center relative z-10"
        >
          <span className="text-sm font-bold tracking-wide">{getLanguageCode(locale)}</span>
        </motion.div>
        
        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: [0, 1, 0] }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>
    </div>
  );
}