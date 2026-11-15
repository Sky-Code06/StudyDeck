import React from "react";
import {
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Network,
  HelpCircle,
  FileText,
  FileCheck,
  BarChart3
} from "lucide-react";

export function DashboardOverview({
  deck,
  analytics,
  progress,
  setActiveTab,
  setSelectedTopicId,
  toggleTopicMastered
}) {
  if (!deck) return null;

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/30">
              {deck.category || "Study Deck"}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5" /> Zero-Omission Guaranteed
            </span>
            <span className="flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-0.5 text-xs text-slate-300 border border-slate-700">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> ~{deck.estimatedHours || 15} hrs deep mastery
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            {deck.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {deck.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab("notes")}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Read Exhaustive Notes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setActiveTab("papers")}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-950/60 px-4 py-2.5 text-xs sm:text-sm font-semibold text-indigo-300 hover:bg-indigo-900/60 hover:text-white transition-all cursor-pointer shadow-md shadow-indigo-950/50"
            >
              <FileCheck className="h-4 w-4 text-indigo-400" />
              <span>Solved Papers (CAT-1)</span>
            </button>
            <button
              onClick={() => setActiveTab("flashcards")}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Drill Flashcards ({analytics.totalCards})</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <HelpCircle className="h-4 w-4 text-indigo-400" />
              <span>Take Quiz ({analytics.totalQuizzes})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Syllabus Progress */}
        <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Mastery Progress</span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-white">{analytics.percentComplete}%</span>
            <span className="text-xs text-slate-400">
              ({analytics.masteredTopics}/{analytics.totalTopics} topics)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${analytics.percentComplete}%` }}
            />
          </div>
        </div>

        {/* Card 2: Active Recall Drill */}
        <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Flashcards Reviewed</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-white">{analytics.reviewedCardsCount}</span>
            <span className="text-xs text-slate-400">/ {analytics.totalCards} cards</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {analytics.totalCards - analytics.reviewedCardsCount === 0
              ? "All flashcards reviewed in this cycle!"
              : `${analytics.totalCards - analytics.reviewedCardsCount} cards ready for review`}
          </p>
        </div>

        {/* Card 3: Quiz Accuracy */}
        <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Practice Quiz Accuracy</span>
            <HelpCircle className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-white">
              {analytics.quizAnsweredCount > 0
                ? `${Math.round((analytics.quizCorrectCount / analytics.quizAnsweredCount) * 100)}%`
                : "—"}
            </span>
            <span className="text-xs text-slate-400">
              ({analytics.quizCorrectCount}/{analytics.quizAnsweredCount} correct)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {analytics.totalQuizzes - analytics.quizAnsweredCount} questions remaining
          </p>
        </div>

        {/* Card 4: Retention Engine */}
        <div className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Study Focus Time</span>
            <Zap className="h-4 w-4 text-violet-400" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-white">{analytics.studyMinutes}m</span>
            <span className="text-xs text-slate-400">logged</span>
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {analytics.studyStreak}-day streak active
          </p>
        </div>
      </div>

      {/* Modules & Topics Syllabus Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">Comprehensive Curriculum & Topic Mastery</h2>
            <p className="text-xs text-slate-400">
              Every topic is broken down with zero omissions. Click any topic to study its in-depth notes.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {deck.modules?.length || 0} Modules Total
          </span>
        </div>

        <div className="space-y-6">
          {deck.modules?.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/70 pb-3 mb-3">
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/20 text-[11px] font-bold text-indigo-400">
                      {modIdx + 1}
                    </span>
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{mod.summary}</p>
                </div>
                <div className="text-xs text-slate-500">
                  {mod.topics?.length || 0} Topics
                </div>
              </div>

              {/* Topics list */}
              <div className="divide-y divide-slate-800/40">
                {mod.topics?.map((topic) => {
                  const isMastered = progress.masteredTopicIds?.includes(topic.id);

                  return (
                    <div
                      key={topic.id}
                      className="group flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-900/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          title={isMastered ? "Mark as unmastered" : "Mark as mastered"}
                          onClick={() => toggleTopicMastered(topic.id)}
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                            isMastered
                              ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                              : "border-slate-700 bg-slate-900 text-transparent hover:border-slate-500"
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 fill-current" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedTopicId(topic.id);
                            setActiveTab("notes");
                          }}
                          className="text-left cursor-pointer"
                        >
                          <span
                            className={`text-xs sm:text-sm font-medium hover:text-indigo-300 transition-colors ${
                              isMastered ? "text-slate-400 line-through decoration-slate-600" : "text-slate-200"
                            }`}
                          >
                            {topic.title}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                            <span>⏱ ~{topic.readTimeMinutes || 15} min</span>
                            <span>•</span>
                            <span className="text-indigo-400/80">{topic.masteryLevel || "Comprehensive"}</span>
                          </div>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedTopicId(topic.id);
                          setActiveTab("notes");
                        }}
                        className="opacity-80 group-hover:opacity-100 flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition-all cursor-pointer"
                      >
                        <span>Study</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zero-Omission Guarantee Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Ready to learn from your own files or syllabus?</span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Send us your textbooks, lecture notes, syllabus, slides, or transcripts. We will analyze every page line-by-line and generate full exhaustive study notes, flashcards, concept graphs, and exam quizzes without skipping a single detail!
          </p>
        </div>
        <button
          onClick={() => setActiveTab("builder")}
          className="whitespace-nowrap rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-500 transition-all cursor-pointer"
        >
          Upload / Generate New Deck
        </button>
      </div>
    </div>
  );
}
