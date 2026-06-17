/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent } from 'react';
import { Language } from './types';
import { translations } from './data/translations';
import LanguageSelector from './components/LanguageSelector';
import FinanceCalculator from './components/FinanceCalculator';
import FloristLedger from './components/FloristLedger';
import PortfolioSandbox from './components/PortfolioSandbox';
import Timeline from './components/Timeline';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  ChevronRight, 
  TrendingUp, 
  Globe2, 
  User, 
  FileText, 
  Award, 
  Briefcase, 
  Activity, 
  CheckCircle,
  Clock
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'career' | 'sandbox'>('dashboard');
  
  // Contact Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const t = translations[language];

  // List of core competencies
  const coreCompetencies = [
    { name: 'Financial Modeling', val: 90 },
    { name: 'SME Accounting', val: 85 },
    { name: 'Market Arbitrage', val: 95 },
    { name: 'Sales & Negotiation', val: 80 },
    { name: 'Asset Allocation', val: 75 },
    { name: 'Valuation Metrics', val: 85 }
  ];

  // Handle Contact Form Submission
  const handleSubmitContact = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
    }, 1200);
  };

  // Mock CV Download summary download action
  const handleDownloadCV = () => {
    const text = `
ELLIOT KRAMARSKI - FINANCIAL INVESTMENT & MANAGEMENT PROFILE
============================================================
Age: 19 years old
Origin: France / Germany
Studying: IAE Lille / Hochschule Anhalt Germany
Native Language: French
TOEFL Certified: English
German Speaker: Academic Proficiency

EXPERIENCES:
- Buying & Reselling Arbitrage Project (2022-Present)
- Florist Shop Bookkeeping & Accounting Support (2022-Present)
- Freelance Subtitling & Transcription (2022-2023)
- regional 1st Place Entrepreneurship Winner (Dreamakers 2022)

PORTFOLIO ACCREDITATION DETAILS GENERATED FROM https://ai.studio/build
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Elliot_Kramarski_Financial_Bio.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* GLOBAL HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 h-16 md:h-20 px-4 md:px-8 flex items-center justify-between" id="app-header">
        
        {/* Brand Logo representing EK Capital */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')} id="header-brand-logo">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-emerald-500 p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-black tracking-widest text-indigo-600 font-mono">EK</span>
            </div>
          </div>
          <div>
            <div className="text-indigo-600 text-xs font-black tracking-widest font-mono leading-none">EK CAPITAL</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5 font-mono">Institutional Portfolio</div>
          </div>
        </div>

        {/* Dynamic Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 border border-slate-200 p-1 rounded-full" id="desktop-tabs-nav">
          <button
            onClick={() => setActiveTab('dashboard')}
            id="nav-tab-dashboard-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            {t.navDashboard}
          </button>
          <button
            onClick={() => setActiveTab('career')}
            id="nav-tab-career-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
              activeTab === 'career'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            {t.navCareer}
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            id="nav-tab-sandbox-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
              activeTab === 'sandbox'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            {t.navSandbox}
          </button>
        </nav>

        {/* Translation Selector dial */}
        <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
      </header>

      {/* MOBILE TAB DRAWER BAR */}
      <div className="md:hidden sticky top-16 z-40 bg-white border-b border-slate-200 px-4 py-2 flex justify-around text-xs font-bold" id="mobile-tabs-drawer">
        <button
          onClick={() => setActiveTab('dashboard')}
          id="mobile-tab-dashboard"
          className={`flex-1 py-1.5 text-center rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'text-indigo-600 bg-indigo-50/70 border border-indigo-100 font-bold' : 'text-slate-500'
          }`}
        >
          {t.navDashboard}
        </button>
        <button
          onClick={() => setActiveTab('career')}
          id="mobile-tab-career"
          className={`flex-1 py-1.5 text-center rounded-xl transition-all ${
            activeTab === 'career' ? 'text-indigo-600 bg-indigo-50/70 border border-indigo-100 font-bold' : 'text-slate-500'
          }`}
        >
          {t.navCareer}
        </button>
        <button
          onClick={() => setActiveTab('sandbox')}
          id="mobile-tab-sandbox"
          className={`flex-1 py-1.5 text-center rounded-xl transition-all ${
            activeTab === 'sandbox' ? 'text-indigo-600 bg-indigo-50/70 border border-indigo-100 font-bold' : 'text-slate-500'
          }`}
        >
          {t.navSandbox}
        </button>
      </div>

      {/* DYNAMIC CONTENT SPACE */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-10" id="main-content-flow">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
              id="dashboard-tab-view"
            >
              {/* Profile Card & Bio Introduction */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-slate-200 p-6 md:p-8 rounded-2xl bg-white shadow-sm relative overflow-hidden">
                {/* Visual mesh design accent */}
                <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-indigo-50 blur-3xl pointer-events-none" />

                {/* Left Side Avatar & Info */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                  {/* Luxury coin initials emblem represented as Elliot's avatar portrait */}
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 p-[2px] shadow-sm relative group">
                    <div className="w-full h-full rounded-full bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
                      {/* Inside initials with elegant text styling */}
                      <span className="text-4xl font-extrabold tracking-widest text-indigo-600 font-mono select-none">EK</span>
                      {/* Subtitle inside */}
                      <span className="text-[8px] tracking-widest text-slate-400 font-mono mt-1 uppercase font-bold">MANAGEMENT</span>
                    </div>
                    {/* Status Dot */}
                    <div className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse" title="Active on HSA Germany Study Abroad" />
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-black font-sans text-slate-950">{t.studentTitle}</h2>
                    <p className="text-xs md:text-sm text-indigo-600 font-bold tracking-wider mt-1 uppercase">{t.managementStudent}</p>
                    <div className="flex flex-col gap-1.5 mt-3 text-xs text-slate-600 self-center lg:self-start">
                      <span className="inline-flex items-center gap-1.5 justify-center lg:justify-start">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {t.locationText}
                      </span>
                      <span className="inline-flex items-center gap-1.5 justify-center lg:justify-start">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        elliotkramarski@gmail.com
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 w-full pt-2 justify-center lg:justify-start">
                    <button
                      onClick={handleDownloadCV}
                      id="download-cv-btn"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      {t.downloadCV}
                    </button>
                    <a
                      href="https://www.linkedin.com/in/elliot-kramarski-53a337416"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-150 text-slate-600 hover:text-indigo-600 rounded-xl text-xs font-bold transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4 text-indigo-500" />
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* Right Side Bio Description */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xs font-black tracking-widest text-indigo-600 uppercase mb-2 font-mono">{t.profileTitle}</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {t.profileDescription}
                    </p>
                  </div>

                  {/* Multi-tier analytical dashboard statistics */}
                  <div>
                    <h4 className="text-xs font-black tracking-widest text-indigo-600 uppercase mb-3 font-mono">{t.quickStats}</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Asset Focus</div>
                        <div className="text-slate-900 font-semibold mt-1 text-xs">Wealth & Venture</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Competencies</div>
                        <div className="text-slate-900 font-semibold mt-1 text-xs">{t.statLanguages}</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Experience</div>
                        <div className="text-slate-900 font-semibold mt-1 text-xs">{t.statExperience}</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Credentials</div>
                        <div className="text-slate-900 font-semibold mt-1 text-xs">{t.statAchievements}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Interactive section for compound savings */}
              <div className="pt-2">
                <FinanceCalculator language={language} />
              </div>
            </motion.div>
          )}

          {/* TAB 2: CAREER & PROJECTS VIEW */}
          {activeTab === 'career' && (
            <motion.div
              key="career"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
              id="career-tab-view"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Timeline Stream (cols 1-8) */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{t.experienceTitle}</h3>
                    <p className="text-xs text-slate-500 mt-1">A detailed trace of Elliot's professional operations, start-up ventures, and academic credentials.</p>
                  </div>
                  <Timeline language={language} />
                </div>

                {/* Side Competency Analytics Matrix (cols 9-12) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Competency Meter */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
                    <h4 className="text-sm font-bold font-mono tracking-wider text-indigo-600 uppercase border-b border-slate-100 pb-2">
                       {t.skillsTitle}
                    </h4>
                    <div className="space-y-4 text-xs">
                      {coreCompetencies.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex justify-between font-mono">
                            <span className="text-slate-600 font-semibold">{skill.name}</span>
                            <span className="text-indigo-600 font-bold">{skill.val}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 rounded-full" 
                              style={{ width: `${skill.val}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High Quality credentials list */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 text-xs text-slate-600 shadow-sm">
                    <h4 className="text-sm font-bold font-mono tracking-wider text-indigo-600 uppercase border-b border-slate-100 pb-2">
                       LANGUAGES SPOKEN
                    </h4>
                    <div className="space-y-3 font-mono">
                      <div className="flex justify-between">
                        <span>French</span>
                        <span className="text-emerald-600 font-bold">Native Speaker</span>
                      </div>
                      <div className="flex justify-between">
                        <span>English</span>
                        <span className="text-emerald-600 font-bold">TOEFL Certified</span>
                      </div>
                      <div className="flex justify-between">
                        <span>German</span>
                        <span className="text-emerald-500 font-semibold">Active Proficiency</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chinese</span>
                        <span className="text-slate-400">Beginner Basics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Florist Ledger Books bookkeeping demo workbench */}
              <div className="pt-2">
                <FloristLedger language={language} />
              </div>
            </motion.div>
          )}

          {/* TAB 3: INVESTMENT SANDBOX & CONTACT VIEW */}
          {activeTab === 'sandbox' && (
            <motion.div
              key="sandbox"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
              id="sandbox-tab-view"
            >
              {/* Asset Allocation Unit */}
              <div>
                <PortfolioSandbox language={language} />
              </div>

              {/* Connect Opportunities Form & Coordinates */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                
                {/* Form component (cols 1-7) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm" id="contact-form-pane">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-950">{t.contactTitle}</h3>
                    <p className="text-xs text-slate-500 mt-1">{t.contactSubtitle}</p>
                  </div>

                  {formStatus === 'success' ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl flex flex-col items-center text-center space-y-3" id="form-success-wrapper">
                      <CheckCircle className="w-12 h-12 text-emerald-600 animate-bounce" />
                      <p className="text-sm text-emerald-800 font-medium leading-relaxed max-w-md">
                        {t.formSuccess}
                      </p>
                      <button
                        onClick={() => setFormStatus('idle')}
                        className="text-xs text-indigo-600 font-bold underline hover:text-indigo-800 pt-2 cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitContact} className="space-y-4 text-xs font-semibold text-slate-600">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold" htmlFor="form-full-name">
                            {t.formName} *
                          </label>
                          <input
                            id="form-full-name"
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder={t.formPlaceholderName}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold" htmlFor="form-email-address">
                            {t.formEmail} *
                          </label>
                          <input
                            id="form-email-address"
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder={t.formPlaceholderEmail}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold" htmlFor="form-message-subject">
                          {t.formSubject}
                        </label>
                        <input
                          id="form-message-subject"
                          type="text"
                          value={formSubject}
                          onChange={(e) => setFormSubject(e.target.value)}
                          placeholder={t.formPlaceholderSubject}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold" htmlFor="form-message-body">
                          {t.formMessage} *
                        </label>
                        <textarea
                          id="form-message-body"
                          rows={4}
                          required
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder={t.formPlaceholderMessage}
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                      </div>

                      <button
                        type="submit"
                        id="submit-contact-form-btn"
                        disabled={formStatus === 'sending'}
                        className="inline-flex items-center gap-1.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold tracking-wider rounded-xl transition cursor-pointer shadow-sm"
                      >
                        {formStatus === 'sending' ? t.formSending : t.formSend}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>

                {/* Direct Coordinates card (cols 8-12) */}
                <div className="lg:col-span-5 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-sm" id="direct-coordinates-pane">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold font-mono tracking-wider text-indigo-600 uppercase border-b border-slate-100 pb-2">
                      Direct Coordinates
                    </h4>

                    {/* Direct methods */}
                    <div className="space-y-4 text-xs font-semibold">
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Institutional Phone</div>
                          <div className="text-slate-800 mt-0.5 font-mono font-semibold">+33 6 44 95 48 19</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Corporate Email</div>
                          <div className="text-slate-800 mt-0.5 font-mono font-semibold">elliotkramarski@gmail.com</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Academic Hubs</div>
                          <div className="text-slate-800 mt-0.5 font-semibold">Lille, France / Bernburg, Germany</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed font-mono">
                    <div className="flex items-center gap-1.5 text-indigo-600 font-bold mb-1">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      UTC Chrono sync
                    </div>
                    <span>Active Semester: exchange session at Hochschule Anhalt. Secure TLS 1.3 protocol backed channel.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER METRIC BANNER */}
      <footer className="bg-slate-100 border-t border-slate-200/80 py-6 px-4 md:px-8 text-center" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
          <div>
            © 2026 ELLIOT KRAMARSKI. All asset simulations & books reconciled in realtime.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-indigo-600 font-bold flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" />
              EN • DE • FR • ES
            </span>
            <span>•</span>
            <a 
              href="https://www.linkedin.com/in/elliot-kramarski-53a337416"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-800 text-indigo-600 font-bold"
            >
              SECURE CONNECTION
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

