import { useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Wallet, Info, Activity, Star } from 'lucide-react';

interface PortfolioSandboxProps {
  language: Language;
}

export default function PortfolioSandbox({ language }: PortfolioSandboxProps) {
  const t = translations[language];

  // Allocation weights state
  const [equities, setEquities] = useState(45);
  const [bonds, setBonds] = useState(30);
  const [gold, setGold] = useState(10);
  const [crypto, setCrypto] = useState(5);
  const [cash, setCash] = useState(10);

  // Apply Risk Profile Presets
  const applyPreset = (preset: 'conservative' | 'balanced' | 'aggressive') => {
    switch (preset) {
      case 'conservative':
        setEquities(15);
        setBonds(55);
        setGold(15);
        setCrypto(0);
        setCash(15);
        break;
      case 'balanced':
        setEquities(45);
        setBonds(30);
        setGold(10);
        setCrypto(5);
        setCash(10);
        break;
      case 'aggressive':
        setEquities(65);
        setBonds(5);
        setGold(5);
        setCrypto(20);
        setCash(5);
        break;
    }
  };

  // Rebalance helper to sum to exactly 100
  const totalWeight = equities + bonds + gold + crypto + cash;

  // Expected returns and volatility configuration for calculations
  const assetSpecs = {
    equities: { yield: 0.085, vol: 0.15 },
    bonds: { yield: 0.035, vol: 0.05 },
    gold: { yield: 0.045, vol: 0.12 },
    crypto: { yield: 0.22, vol: 0.65 },
    cash: { yield: 0.0275, vol: 0.01 },
  };

  // Calculated compound metrics
  const stats = useMemo(() => {
    const sum = totalWeight || 1;
    const wEq = equities / sum;
    const wBo = bonds / sum;
    const wGo = gold / sum;
    const wCr = crypto / sum;
    const wCa = cash / sum;

    // Expected yield calculation (Weighted average)
    const expectedYield = (
      wEq * assetSpecs.equities.yield +
      wBo * assetSpecs.bonds.yield +
      wGo * assetSpecs.gold.yield +
      wCr * assetSpecs.crypto.yield +
      wCa * assetSpecs.cash.yield
    );

    // Dynamic standard deviation approximation (Portfolio volatility)
    const vol = Math.sqrt(
      Math.pow(wEq * assetSpecs.equities.vol, 2) +
      Math.pow(wBo * assetSpecs.bonds.vol, 2) +
      Math.pow(wGo * assetSpecs.gold.vol, 2) +
      Math.pow(wCr * assetSpecs.crypto.vol, 2) +
      Math.pow(wCa * assetSpecs.cash.vol, 2)
    );

    // Risk-free rate (assumed 2.5% cash-like safe return)
    const riskFreeRate = 0.025;
    const sharpe = vol > 0.01 ? (expectedYield - riskFreeRate) / vol : 0;

    return {
      expectedYield: expectedYield * 100,
      vol: vol * 100,
      sharpe: Math.max(0, parseFloat(sharpe.toFixed(2))),
    };
  }, [equities, bonds, gold, crypto, cash, totalWeight]);

  // Adjust sliders elegantly
  const adjustWeight = (asset: string, val: number) => {
    // Basic scaling logic to ensure nice visual feedback
    const maxVal = Math.min(100, val);
    if (asset === 'equities') setEquities(maxVal);
    if (asset === 'bonds') setBonds(maxVal);
    if (asset === 'gold') setGold(maxVal);
    if (asset === 'crypto') setCrypto(maxVal);
    if (asset === 'cash') setCash(maxVal);
  };

  // Force normalize to 100% on click of a special optimizer button
  const handleOptimize = () => {
    const sum = totalWeight || 1;
    setEquities(Math.round((equities / sum) * 100));
    setBonds(Math.round((bonds / sum) * 100));
    setGold(Math.round((gold / sum) * 100));
    setCrypto(Math.round((crypto / sum) * 100));
    setCash(Math.round((cash / sum) * 100));
  };

  // Generate simple responsive SVG donut chart coordinates
  const donutChart = useMemo(() => {
    const sum = totalWeight || 1;
    const values = [
      { percentage: equities / sum, color: '#4F46E5' }, // Equities - Indigo
      { percentage: bonds / sum, color: '#10B981' },    // Bonds - Emerald
      { percentage: gold / sum, color: '#F59E0B' },     // Gold - Amber/Gold
      { percentage: crypto / sum, color: '#EC4899' },   // Crypto - Pink
      { percentage: cash / sum, color: '#64748B' },     // Cash - Slate
    ];

    let accumulatedAngle = 0;
    const radius = 60;
    const cx = 100;
    const cy = 100;
    const circum = 2 * Math.PI * radius;

    const sectors = values.map((v) => {
      const strokeDasharray = `${v.percentage * circum} ${circum}`;
      const strokeDashoffset = -accumulatedAngle * circum;
      accumulatedAngle += v.percentage;
      return {
        strokeDasharray,
        strokeDashoffset,
        color: v.color,
      };
    });

    return sectors;
  }, [equities, bonds, gold, crypto, cash, totalWeight]);

  return (
    <div className="bg-white text-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm" id="portfolio-sandbox-widget">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-indigo-600 text-xs font-bold tracking-wider uppercase flex items-center gap-2 mb-1">
            <Wallet className="w-4 h-4 text-indigo-500" />
            ASSET MANAGEMENT UNIT
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-slate-900">{t.sandboxTitle}</h3>
          <p className="text-sm text-slate-500 mt-1">{t.sandboxSubtitle}</p>
        </div>

        {/* Risk Presets */}
        <div className="flex flex-wrap gap-2" id="portfolio-preset-chips">
          <button
            onClick={() => applyPreset('conservative')}
            id="preset-conservative"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-50 border border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
          >
            {t.conservative}
          </button>
          <button
            onClick={() => applyPreset('balanced')}
            id="preset-balanced"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-200 hover:border-indigo-400 text-indigo-600 transition cursor-pointer"
          >
            {t.balanced}
          </button>
          <button
            onClick={() => applyPreset('aggressive')}
            id="preset-aggressive"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-50 border border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
          >
            {t.aggressive}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Control Pane (cols 1-7) */}
        <div className="lg:col-span-7 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-mono leading-none mb-4">{t.assetAllocation}</h4>

          {/* Slider 1: Equities */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <span className="w-2.5 h-2.5 bg-[#4F46E5] inline-block rounded-sm" />
                {t.equitiesLabel}
              </span>
              <span className="font-mono font-bold text-slate-800">{equities}%</span>
            </div>
            <input
              type="range"
              id="slider-equities"
              min="0"
              max="100"
              value={equities}
              onChange={(e) => adjustWeight('equities', Number(e.target.value))}
              className="w-full h-1.5 rounded bg-slate-100 accent-[#4F46E5] cursor-pointer"
            />
          </div>

          {/* Slider 2: Sovereign bonds */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <span className="w-2.5 h-2.5 bg-[#10B981] inline-block rounded-sm" />
                {t.bondsLabel}
              </span>
              <span className="font-mono font-bold text-slate-800">{bonds}%</span>
            </div>
            <input
              type="range"
              id="slider-bonds"
              min="0"
              max="100"
              value={bonds}
              onChange={(e) => adjustWeight('bonds', Number(e.target.value))}
              className="w-full h-1.5 rounded bg-slate-100 accent-[#10B981] cursor-pointer"
            />
          </div>

          {/* Slider 3: Hedge Gold */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <span className="w-2.5 h-2.5 bg-[#F59E0B] inline-block rounded-sm" />
                {t.goldLabel}
              </span>
              <span className="font-mono font-bold text-slate-800">{gold}%</span>
            </div>
            <input
              type="range"
              id="slider-gold"
              min="0"
              max="100"
              value={gold}
              onChange={(e) => adjustWeight('gold', Number(e.target.value))}
              className="w-full h-1.5 rounded bg-slate-100 accent-[#F59E0B] cursor-pointer"
            />
          </div>

          {/* Slider 4: Dynamic Cryptocurrencies */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <span className="w-2.5 h-2.5 bg-[#EC4899] inline-block rounded-sm" />
                {t.cryptoLabel}
              </span>
              <span className="font-mono font-bold text-slate-800">{crypto}%</span>
            </div>
            <input
              type="range"
              id="slider-crypto"
              min="0"
              max="100"
              value={crypto}
              onChange={(e) => adjustWeight('crypto', Number(e.target.value))}
              className="w-full h-1.5 rounded bg-slate-100 accent-[#EC4899] cursor-pointer"
            />
          </div>

          {/* Slider 5: Cash liquidity */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <span className="w-2.5 h-2.5 bg-[#64748B] inline-block rounded-sm" />
                {t.cashLabel}
              </span>
              <span className="font-mono font-bold text-slate-800">{cash}%</span>
            </div>
            <input
              type="range"
              id="slider-cash"
              min="0"
              max="100"
              value={cash}
              onChange={(e) => adjustWeight('cash', Number(e.target.value))}
              className="w-full h-1.5 rounded bg-slate-100 accent-[#64748B] cursor-pointer"
            />
          </div>

          {/* Real-time Warnings & Optimizer Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span className={totalWeight !== 100 ? 'text-amber-600 font-bold' : 'text-slate-500'}>
                Sum: <span className="font-mono font-semibold">{totalWeight}%</span> {totalWeight !== 100 && '(Recommended: 100%)'}
              </span>
            </div>
            {totalWeight !== 100 && (
              <button
                onClick={handleOptimize}
                id="optimize-normalize-btn"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition shadow-sm cursor-pointer"
              >
                {t.rebalanceButton}
              </button>
            )}
          </div>
        </div>

        {/* Visual outputs & Metrics reporting (cols 8-12) */}
        <div className="lg:col-span-5 flex flex-col items-center bg-slate-50 border border-slate-200 p-6 rounded-xl relative overflow-hidden">
          <h4 className="text-xs uppercase tracking-widest text-slate-800 font-bold leading-none mb-6 self-start w-full border-b border-slate-200 pb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-500" />
            {t.backtestResults}
          </h4>

          {/* Interactive Donut SVG */}
          <div className="relative w-40 h-40 flex items-center justify-center mb-6" id="portfolio-backtest-donut">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {donutChart.map((sector, index) => (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r="60"
                  fill="transparent"
                  stroke={sector.color}
                  strokeWidth="24"
                  strokeDasharray={sector.strokeDasharray}
                  strokeDashoffset={sector.strokeDashoffset}
                  className="transition-all duration-500"
                />
              ))}
            </svg>
            <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center bg-transparent">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Metrics</span>
              <span className="text-indigo-600 text-2xl font-black font-mono leading-none">{totalWeight}%</span>
            </div>
          </div>

          {/* Analytical Numbers (Return / Volatility / Sharpe) */}
          <div className="w-full space-y-3 font-mono text-xs" id="sandbox-metrics-dashboard">
            <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-bold">{t.expectedAnnualReturn}</span>
              <span className="text-emerald-600 font-bold text-sm">+{stats.expectedYield.toFixed(2)}%</span>
            </div>

            <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-bold">{t.volatilityLabel}</span>
              <span className="text-[#EA580C] font-bold text-sm">~{stats.vol.toFixed(2)}%</span>
            </div>

            <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-bold flex items-center gap-1">
                {t.sharpeRatio}
                <Star className="w-3.5 h-3.5 text-indigo-500" />
              </span>
              <span className="text-indigo-600 font-bold text-sm">{stats.sharpe}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
