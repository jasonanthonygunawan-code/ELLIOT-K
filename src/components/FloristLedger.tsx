import { useState, FormEvent } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { PlusCircle, Receipt, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface FloristLedgerProps {
  language: Language;
}

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  debit: number; // Expense
  credit: number; // Sale
}

export default function FloristLedger({ language }: FloristLedgerProps) {
  const t = translations[language];

  // Realistic initial transaction log
  const [entries, setEntries] = useState<LedgerEntry[]>([
    { id: '1', date: '2026-06-10', description: 'Sale: 15 Premium Red Roses Bouquets', debit: 0, credit: 180 },
    { id: '2', date: '2026-06-11', description: 'Purchase: Silk Wrappings & Ribbons', debit: 45, credit: 0 },
    { id: '3', date: '2026-06-12', description: 'Sale: Summer Sunflower Centerpieces', debit: 0, credit: 320 },
    { id: '4', date: '2026-06-14', description: 'Expense: Local Courier Delivery Fuel', debit: 35, credit: 0 },
    { id: '5', date: '2026-06-15', description: 'Sale: Wedding Eucalyptus Garlands', debit: 0, credit: 450 },
    { id: '6', date: '2026-06-16', description: 'Purchase: Fresh Wholesale Hydrangeas', debit: 120, credit: 0 },
  ]);

  const [descriptionInput, setDescriptionInput] = useState('');
  const [typeInput, setTypeInput] = useState<'credit' | 'debit'>('credit');
  const [amountInput, setAmountInput] = useState('');

  // Form handling
  const handleAddTransaction = (e: FormEvent) => {
    e.preventDefault();
    if (!descriptionInput.trim() || !amountInput || Number(amountInput) <= 0) return;

    const amount = parseFloat(amountInput);
    const newEntry: LedgerEntry = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      description: descriptionInput,
      debit: typeInput === 'debit' ? amount : 0,
      credit: typeInput === 'credit' ? amount : 0,
    };

    setEntries([newEntry, ...entries]);
    setDescriptionInput('');
    setAmountInput('');
  };

  // Compute rolling scores
  const totals = entries.reduce(
    (acc, cur) => {
      acc.revenue += cur.credit;
      acc.expenses += cur.debit;
      return acc;
    },
    { revenue: 0, expenses: 0 }
  );

  const balance = totals.revenue - totals.expenses;

  const currencyFormatter = (val: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(val);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" id="florist-ledger-component">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-indigo-600 text-xs font-bold tracking-wider uppercase flex items-center gap-2 mb-1">
            <Receipt className="w-4 h-4 text-indigo-500" />
            BOOKKEEPING WORKBENCH
          </span>
          <h4 className="text-xl md:text-2xl font-bold font-sans text-slate-900">{t.floristDemoTitle}</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">{t.floristDemoSubtitle}</p>
        </div>
        <div className="flex gap-2 font-mono text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 min-w-[100px]">
            <div className="text-slate-500 text-[10px] font-bold uppercase">{t.ledgerRevenue}</div>
            <div className="text-emerald-600 font-bold mt-0.5">{currencyFormatter(totals.revenue)}</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 min-w-[100px]">
            <div className="text-slate-500 text-[10px] font-bold uppercase">{t.ledgerExpenses}</div>
            <div className="text-rose-600 font-bold mt-0.5">{currencyFormatter(totals.expenses)}</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-2 min-w-[100px]">
            <div className="text-indigo-600 text-[10px] font-bold uppercase">{t.ledgerBalance}</div>
            <div className="text-indigo-800 font-bold mt-0.5">{currencyFormatter(balance)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounting input box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 self-start">
          <h5 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-indigo-500" />
            {t.addTransaction}
          </h5>
          <form onSubmit={handleAddTransaction} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="ledger-description">
                {t.ledgerRef}
              </label>
              <input
                id="ledger-description"
                type="text"
                required
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="e.g., Sold Hydrangea arrangement"
                className="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="ledger-type">
                  {t.transactionType}
                </label>
                <select
                  id="ledger-type"
                  value={typeInput}
                  onChange={(e) => setTypeInput(e.target.value as 'credit' | 'debit')}
                  className="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="credit">Credit (Sale)</option>
                  <option value="debit">Debit (Expense)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="ledger-amount">
                  {t.transactionAmount}
                </label>
                <input
                  id="ledger-amount"
                  type="number"
                  required
                  step="0.01"
                  min="0.01"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              id="reconcile-ledger-btn"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              {t.addTransaction}
            </button>
          </form>
        </div>

        {/* Ledger Sheets Table */}
        <div className="lg:col-span-2 overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider font-mono">
                <tr>
                  <th className="p-3">{t.ledgerDate}</th>
                  <th className="p-3">{t.ledgerRef}</th>
                  <th className="p-3 text-right">{t.ledgerDebit}</th>
                  <th className="p-3 text-right">{t.ledgerCredit}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 text-slate-400">{entry.date}</td>
                    <td className="p-3 font-sans text-slate-800 text-xs">{entry.description}</td>
                    <td className="p-3 text-right font-semibold">
                      {entry.debit > 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-rose-500">
                          <ArrowDownRight className="w-3 h-3" />
                          {currencyFormatter(entry.debit)}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-3 text-right font-semibold">
                      {entry.credit > 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-emerald-600">
                          <ArrowUpRight className="w-3 h-3" />
                          {currencyFormatter(entry.credit)}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
