import { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Briefcase, GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineProps {
  language: Language;
}

export default function Timeline({ language }: TimelineProps) {
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<'all' | 'work' | 'education'>('all');

  const timelineData = [
    {
      id: 'reselling',
      type: 'work',
      title: t.resellingTitle,
      company: t.resellingCompany,
      period: `2022 - ${t.present}`,
      icon: Briefcase,
      bullets: [
        t.resellingBullet1,
        t.resellingBullet2,
        t.resellingBullet3,
        t.resellingBullet4
      ],
    },
    {
      id: 'dreamakers',
      type: 'work',
      title: t.dreamakersTitle,
      company: t.dreamakersCompany,
      period: '2022',
      icon: Award,
      bullets: [
        t.dreamakersBullet1,
        t.dreamakersBullet2,
        t.dreamakersBullet3
      ],
    },
    {
      id: 'florist',
      type: 'work',
      title: t.floristTitle,
      company: t.floristCompany,
      period: '2022 - 2024',
      icon: Briefcase,
      bullets: [
        t.floristBullet1,
        t.floristBullet2,
        t.floristBullet3,
        t.floristBullet4
      ],
    },
    {
      id: 'transcription',
      type: 'work',
      title: t.transcriptionTitle,
      company: t.transcriptionCompany,
      period: '2022 - 2023',
      icon: Briefcase,
      bullets: [
        t.transcriptionBullet1,
        t.transcriptionBullet2,
        t.transcriptionBullet3
      ],
    },
    {
      id: 'education-uni',
      type: 'education',
      title: "IAE Lille - Bachelor's Degree",
      company: 'University of Lille, France',
      period: '2022 - Present',
      icon: GraduationCap,
      bullets: [
        'Specializing in International Management and Corporate Finance.',
        'Extensive study in microeconomics, financial analysis, asset pricing models, and strategic marketing.',
        'Actively involved in peer finance workshops and entrepreneurial student chapters.'
      ]
    },
    {
      id: 'education-exchange',
      type: 'education',
      title: t.studyExchange,
      company: 'Hochschule Anhalt (University of Applied Sciences), Germany',
      period: '2024 - 2025',
      icon: GraduationCap,
      bullets: [
        'Immersive study abroad curriculum centered on Business Development, Growth Strategies & SME Leadership.',
        'Strengthening of German academic language and international trade structures.',
        'Analyzing global macroeconomics, trade dynamics, and corporate taxation modules.'
      ]
    }
  ];

  const filteredData = timelineData.filter(item => {
    if (activeCategory === 'all') return true;
    return item.type === activeCategory;
  });

  return (
    <div className="w-full space-y-6" id="career-timeline-container">
      {/* Category selector pill tabs */}
      <div className="flex gap-2 justify-center sm:justify-start" id="timeline-filter-tabs">
        <button
          onClick={() => setActiveCategory('all')}
          id="timeline-filter-all"
          className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-indigo-600 text-white border border-indigo-500 shadow-sm'
              : 'bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200'
          }`}
        >
          Show All
        </button>
        <button
          onClick={() => setActiveCategory('work')}
          id="timeline-filter-work"
          className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
            activeCategory === 'work'
              ? 'bg-indigo-600 text-white border border-indigo-500 shadow-sm'
              : 'bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200'
          }`}
        >
          Professional
        </button>
        <button
          onClick={() => setActiveCategory('education')}
          id="timeline-filter-education"
          className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
            activeCategory === 'education'
              ? 'bg-indigo-600 text-white border border-indigo-500 shadow-sm'
              : 'bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200'
          }`}
        >
          Academic
        </button>
      </div>

      {/* Main vertical line stream */}
      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 py-2">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative pl-8 md:pl-10 group"
                id={`timeline-node-${item.id}`}
              >
                {/* Colored visual pulse node */}
                <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm group-hover:scale-115 group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all duration-300">
                  <IconComponent className="w-3 h-3 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                </div>

                {/* Main Card */}
                <div className="bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all duration-300 rounded-xl p-5 md:p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-indigo-600 font-bold tracking-wide">
                        {item.company}
                      </p>
                    </div>
                    {/* Period flag */}
                    <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-[10px] font-mono self-start sm:self-center">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Bullet points mapping */}
                  <ul className="space-y-2 mt-4 text-xs text-slate-600 list-disc list-inside">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed pl-1">
                        <span className="font-sans text-slate-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
