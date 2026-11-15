import React from "react";
import {
  BookOpen,
  Layers,
  Flame,
  Award,
  PlusCircle,
  Network,
  HelpCircle,
  FileText,
  FileCheck,
  Search,
  Sparkles,
  ChevronDown
} from "lucide-react";

export function Navbar({
  decks,
  activeDeckId,
  setActiveDeckId,
  activeTab,
  setActiveTab,
  analytics,
  searchQuery,
  setSearchQuery
}) {
  const tabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "notes", label: "Exhaustive Notes", icon: BookOpen },
    { id: "papers", label: "Solved Papers", icon: FileCheck, count: 5 },
    { id: "flashcards", label: "Active Recall", icon: Sparkles, count: analytics.totalCards },
    { id: "map", label: "Concept Map", icon: Network },
    { id: "quiz", label: "Practice Quiz", icon: HelpCircle, count: analytics.totalQuizzes },
    { id: "cheatsheet", label: "Cheat Sheet", icon: FileText },
    { id: "builder", label: "+ Add Files / Deck", icon: PlusCircle, highlight: true }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Header Row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Deck Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/25 ring-1 ring-white/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base">StudyDeck</span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 ring-1 ring-indigo-500/20">
                  Zero-Omission Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Master every single concept & nuance</p>
            </div>
          </div>

          <div className="hidden h-6 w-px bg-slate-800 sm:block" />

          {/* Active Deck Selector */}
          <div className="relative">
            <select
              value={activeDeckId}
              onChange={(e) => setActiveDeckId(e.target.value)}
              className="appearance-none rounded-lg border border-slate-800 bg-slate-900/90 py-1.5 pl-3 pr-8 text-xs font-medium text-slate-200 hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
            >
              {decks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  📚 {deck.title}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Global Search & Gamification Stats */}
        <div className="flex items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative hidden md:block w-56 lg:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, formulas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Streak pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
            <Flame className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>{analytics.studyStreak}d streak</span>
          </div>

          {/* Mastery pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            <span>{analytics.percentComplete}% Mastered</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6 scrollbar-none border-t border-slate-900/90">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/5"
                  : tab.highlight
                  ? "border-transparent text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/5 font-semibold"
                  : "border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : ""}`} />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
