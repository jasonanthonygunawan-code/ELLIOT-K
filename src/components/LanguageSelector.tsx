import { useState } from 'react';
import { Language } from '../types';
import { Globe, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES_CONFIG = [
  { code: 'en' as Language, label: 'EN', fullName: 'English', angle: 0, flag: '🇬🇧' },
  { code: 'de' as Language, label: 'DE', fullName: 'Deutsch', angle: 90, flag: '🇩🇪' },
  { code: 'fr' as Language, label: 'FR', fullName: 'Français', angle: 180, flag: '🇫🇷' },
  { code: 'es' as Language, label: 'ES', fullName: 'Español', angle: 270, flag: '🇪🇸' },
];

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedConfig = LANGUAGES_CONFIG.find(c => c.code === currentLanguage) || LANGUAGES_CONFIG[0];

  // Rotate the dial based on the selected language's angle to create a functional hardware dial feel!
  const rotationDegrees = -selectedConfig.angle;

  return (
    <div className="relative flex items-center gap-4 z-50" id="lang-selector-section">
      {/* Mobile Segmented Control */}
      <div className="sm:hidden flex bg-slate-100 border border-slate-200 p-1 rounded-full shadow-inner">
        {LANGUAGES_CONFIG.map((lang) => (
          <button
            key={lang.code}
            id={`lang-mobile-btn-${lang.code}`}
            onClick={() => onLanguageChange(lang.code)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold tracking-wider transition-all duration-300 ${
              currentLanguage === lang.code
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-sm border border-indigo-500'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Desktop Physical Dial Widget */}
      <div className="hidden sm:flex items-center gap-3">
        {/* Toggleable Luxury Rotating Dial Trigger */}
        <div className="relative group">
          <div className="flex bg-slate-100 border border-slate-200 rounded-full p-1 shadow-sm items-center gap-1">
            {LANGUAGES_CONFIG.map((lang) => (
              <button
                key={lang.code}
                id={`lang-desktop-btn-${lang.code}`}
                onClick={() => onLanguageChange(lang.code)}
                title={lang.fullName}
                className={`relative px-4 py-1.5 h-8 rounded-full flex items-center gap-1.5 text-xs font-bold tracking-widest transition-all duration-300 ${
                  currentLanguage === lang.code
                    ? 'text-white font-black z-10'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {currentLanguage === lang.code && (
                  <motion.div
                    layoutId="activeLangIndicator"
                    className="absolute inset-0 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-full -z-10 shadow-sm border border-indigo-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chronograph Style Visual Rotating Mechanical Crown */}
        <div 
          className="relative w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 via-slate-50 to-white border-2 border-slate-300 flex items-center justify-center shadow-sm cursor-pointer overflow-hidden group"
          onClick={() => {
            // Cycle through languages
            const currentIndex = LANGUAGES_CONFIG.findIndex(c => c.code === currentLanguage);
            const nextIndex = (currentIndex + 1) % LANGUAGES_CONFIG.length;
            onLanguageChange(LANGUAGES_CONFIG[nextIndex].code);
          }}
          title="Rotate Language Chrono"
          id="mechanical-chrono-dial"
        >
          {/* Beveled Rim */}
          <div className="absolute inset-0.5 rounded-full border border-slate-200 bg-radial from-transparent to-slate-100/50 pointer-events-none" />
          
          {/* Rotating inner mechanical dial */}
          <motion.div
            animate={{ rotate: rotationDegrees }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="w-7 h-7 rounded-full border border-dashed border-indigo-500/40 flex items-center justify-center relative"
          >
            {/* Hour markers representing 4 regions */}
            <div className="absolute top-0.5 text-[6px] text-slate-400 font-bold">EN</div>
            <div className="absolute right-0.5 text-[6px] text-slate-400 font-bold rotate-90">DE</div>
            <div className="absolute bottom-0.5 text-[6px] text-slate-400 font-bold rotate-180">FR</div>
            <div className="absolute left-0.5 text-[6px] text-slate-400 font-bold -rotate-90">ES</div>
            
            {/* Center pinion indicator */}
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-sm z-20" />
            <div className="absolute h-2.5 w-0.5 bg-indigo-600 top-1 rounded-full origin-bottom" style={{ transform: 'translateX(-50%)' }} />
          </motion.div>

          {/* Golden tactile grip ridges around outer bezel */}
          <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-slate-300 transition-all duration-300 pointer-events-none" />
          <RefreshCw className="absolute w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600 transition-all transform group-hover:rotate-180 duration-500 pointer-events-none bottom-0.5 right-0.5" />
        </div>
      </div>
    </div>
  );
}
