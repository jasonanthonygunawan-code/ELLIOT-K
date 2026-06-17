import { useState, useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { TrendingUp, Coins, Calendar, Award } from 'lucide-react';

interface FinanceCalculatorProps {
  language: Language;
}

export default function FinanceCalculator({ language }: FinanceCalculatorProps) {
  const t = translations[language];

  const [principal, setPrincipal] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(250);
  const [interestRate, setInterestRate] = useState(7);
  const [years, setYears] = useState(15);

  const calculations = useMemo(() => {
    let currentTotal = principal;
    const dataPoints: { year: number; principalSaved: number; totalWealth: number }[] = [];
    let savedPrincipal = principal;

    const r = interestRate / 100 / 12; // monthly interest rate

    // Year-by-year calculation for graphing
    for (let i = 1; i <= years; i++) {
      // Calculate 12 months for this year
      for (let m = 0; m < 12; m++) {
        currentTotal = currentTotal * (1 + r) + monthlyContribution;
        savedPrincipal += monthlyContribution;
      }
      dataPoints.push({
        year: i,
        principalSaved: Math.round(savedPrincipal),
        totalWealth: Math.round(currentTotal),
      });
    }

    const finalValue = Math.round(currentTotal);
    const finalSaved = Math.round(savedPrincipal);
    const finalInterest = Math.max(0, finalValue - finalSaved);

    return {
      finalValue,
      finalSaved,
      finalInterest,
      dataPoints,
    };
  }, [principal, monthlyContribution, interestRate, years]);

  // Generate SVG path for visual portfolio growth
  const svgPathData = useMemo(() => {
    if (calculations.dataPoints.length === 0) return '';
    const width = 500;
    const height = 200;
    const padding = 20;

    const maxX = years;
    const maxY = Math.max(...calculations.dataPoints.map(d => d.totalWealth));

    const mapX = (x: number) => padding + ((x / maxX) * (width - 2 * padding));
    const mapY = (y: number) => height - padding - ((y / maxY) * (height - 2 * padding));

    // Area points start from bottom left (0, height-padding)
    let path = `M ${mapX(0)} ${mapY(0)} `;
    let linePath = `M ${mapX(0)} ${mapY(principal)} `;

    calculations.dataPoints.forEach(dp => {
      path += `L ${mapX(dp.year)} ${mapY(dp.totalWealth)} `;
      linePath += `L ${mapX(dp.year)} ${mapY(dp.totalWealth)} `;
    });

    // Close the area path at the bottom right, then bottom left
    const closeAreaPath = `${path} L ${mapX(years)} ${mapY(0)} Z`;

    // Principal path (saved line)
    let principalLinePath = `M ${mapX(0)} ${mapY(principal)} `;
    calculations.dataPoints.forEach(dp => {
      principalLinePath += `L ${mapX(dp.year)} ${mapY(dp.principalSaved)} `;
    });

    return {
      areaPath: closeAreaPath,
      linePath,
      principalLinePath,
      points: calculations.dataPoints,
    };
  }, [calculations, years, principal]);

  const valueFormatter = (val: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white text-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm" id="finance-calculator-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-indigo-600 text-xs font-bold tracking-wider uppercase flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-indigo-500" />
            PROJEKTIONS-RECHNER
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-slate-900">{t.savingsPlanTitle}</h3>
          <p className="text-sm text-slate-500 mt-1">{t.savingsPlanSubtitle}</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 self-start">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{t.futureValueText}</div>
            <div className="text-xl font-bold font-mono text-indigo-600">{valueFormatter(calculations.finalValue)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders Console */}
        <div className="space-y-6">
          {/* Slider 1: Principal */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="principal-slider">{t.initialDeposit}</label>
              <span className="text-base font-bold font-mono text-indigo-600">{valueFormatter(principal)}</span>
            </div>
            <input
              id="principal-slider"
              type="range"
              min="0"
              max="50000"
              step="500"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-slate-200 accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>€0</span>
              <span>€25K</span>
              <span>€50K</span>
            </div>
          </div>

          {/* Slider 2: Monthly Additions */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="monthly-contribution-slider">{t.monthlyAddition}</label>
              <span className="text-base font-bold font-mono text-indigo-600">{valueFormatter(monthlyContribution)}</span>
            </div>
            <input
              id="monthly-contribution-slider"
              type="range"
              min="0"
              max="2000"
              step="25"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-slate-200 accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>€0</span>
              <span>€1K</span>
              <span>€2K</span>
            </div>
          </div>

          {/* Slider 3: Interest Yield */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="interest-rate-slider">{t.annualInterest}</label>
              <span className="text-base font-bold font-mono text-indigo-600">{interestRate}%</span>
            </div>
            <input
              id="interest-rate-slider"
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-slate-200 accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>0%</span>
              <span>7.5%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Slider 4: Saving years */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="years-slider">{t.calcPeriod}</label>
              <span className="text-base font-bold font-mono text-indigo-600">{years} {t.years}</span>
            </div>
            <input
              id="years-slider"
              type="range"
              min="1"
              max="35"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-slate-200 accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>1 yr</span>
              <span>15 yrs</span>
              <span>35 yrs</span>
            </div>
          </div>
        </div>

        {/* Multi-tier Output Dashboard */}
        <div className="flex flex-col justify-between bg-slate-50/50 border border-slate-200 rounded-xl p-5 md:p-6">
          {/* Small numeric widgets */}
          <div className="grid grid-cols-2 gap-4 mb-6" id="calc-kpi-widgets">
            <div className="bg-white border border-slate-200 p-3.5 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none mb-1">{t.totalContributionsText}</div>
              <div className="text-lg font-bold font-mono text-slate-700">{valueFormatter(calculations.finalSaved)}</div>
            </div>
            <div className="bg-white border border-slate-200 p-3.5 rounded-lg">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none mb-1">{t.totalInterestText}</div>
              <div className="text-lg font-bold font-mono text-indigo-600">{valueFormatter(calculations.finalInterest)}</div>
            </div>
          </div>

          {/* SVG Compounding Chart Area */}
          <div className="w-full bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden h-[220px]" id="calc-svg-graph-container">
            <div className="absolute top-2 left-3 flex gap-4 text-[10px] text-slate-400 font-bold z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-indigo-600 inline-block rounded-full" />
                <span>{t.projectedWealth}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-sky-400 inline-block rounded-full" />
                <span>{t.totalContributionsText}</span>
              </div>
            </div>

            {/* Live Chart */}
            <svg 
              viewBox="0 0 500 200" 
              className="w-full h-[155px] overflow-visible mt-6"
              id="calc-interest-chart-svg"
            >
              <defs>
                <linearGradient id="totalWealthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="20" x2="480" y2="20" stroke="#64748B" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="3,3" />
              <line x1="20" y1="90" x2="480" y2="90" stroke="#64748B" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="3,3" />
              <line x1="20" y1="160" x2="480" y2="160" stroke="#64748B" strokeWidth="1" strokeOpacity="0.08" />

              {/* Area filled graph */}
              {svgPathData.areaPath && (
                <path d={svgPathData.areaPath} fill="url(#totalWealthGradient)" />
              )}

              {/* Principal linear progression line */}
              {svgPathData.principalLinePath && (
                <path d={svgPathData.principalLinePath} fill="none" stroke="#38BDF8" strokeWidth="2.5" />
              )}

              {/* Total wealth exponential line */}
              {svgPathData.linePath && (
                <path d={svgPathData.linePath} fill="none" stroke="#4F46E5" strokeWidth="3" />
              )}

              {/* Hover dot highlights for first, middle, last indices */}
              {svgPathData.points.length > 0 && (
                <>
                  <circle cx="20" cy={200 - 20 - ((principal / Math.max(...svgPathData.points.map(d=>d.totalWealth))) * (160))} r="4" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="480" cy={200 - 20 - ((calculations.finalValue / Math.max(...svgPathData.points.map(d=>d.totalWealth))) * (160))} r="5" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="2" />
                </>
              )}
            </svg>

            {/* X-Axis labels for Timeline years */}
            <div className="flex justify-between text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-1 mt-1 px-3">
              <span>0 yr</span>
              <span>{Math.round(years / 2)} yrs</span>
              <span>{years} yrs</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2 items-start text-xs text-slate-500 bg-indigo-50/50 border border-indigo-100 rounded-xl p-3">
            <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              La capitalización compuesta es la inversión de los rendimientos obtenidos en periodos previos, 
              generando un efecto multiplicador. Elliot Kramarski aprovecha estas dinámicas en el análisis financiero.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
