import React, { useState } from "react";
import {
  FileText,
  Search,
  Copy,
  Check,
  Printer,
  Sparkles
} from "lucide-react";

export function CheatSheet({ deck }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  const categories = deck?.cheatSheet || [];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredCategories = categories
    .map((cat) => {
      const filteredItems = cat.items.filter(
        (it) =>
          it.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
          it.value.toLowerCase().includes(filterQuery.toLowerCase())
      );
      return { ...cat, items: filteredItems };
    })
    .filter((cat) => cat.items.length > 0);

  if (!categories.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        <FileText className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p>No cheat sheet formulas or summary items defined for this deck yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-1">
            <FileText className="h-4 w-4" />
            <span>High-Yield Revision & Formulas Cheat Sheet</span>
          </div>
          <p className="text-xs text-slate-400">
            Rapid reference for formulas, architecture constants, axioms, and exam-critical rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter cheat sheet..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-950/80 py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 shadow-sm"
          >
            <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {cat.category}
              </span>
              <span className="text-xs font-mono text-slate-500 font-normal">
                {cat.items.length} items
              </span>
            </h3>

            <div className="divide-y divide-slate-800/60">
              {cat.items.map((item, itemIdx) => {
                const uniqueKey = `${catIdx}-${itemIdx}`;
                const isCopied = copiedIndex === uniqueKey;

                return (
                  <div
                    key={itemIdx}
                    className="group py-3 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 flex-1">
                      <span className="font-semibold text-slate-200 block">
                        {item.label}
                      </span>
                      <span className="font-mono text-indigo-300 block bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 text-[11px] leading-relaxed">
                        {item.value}
                      </span>
                    </div>

                    <button
                      title="Copy item"
                      onClick={() => handleCopy(`${item.label}: ${item.value}`, uniqueKey)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-opacity cursor-pointer shrink-0 mt-1"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
