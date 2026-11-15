import React, { useMemo } from "react";
import {
  CheckCircle2,
  Clock,
  Lightbulb,
  AlertTriangle,
  Code2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  FileCheck2
} from "lucide-react";

export function NotesViewer({
  deck,
  selectedTopicId,
  setSelectedTopicId,
  progress,
  toggleTopicMastered,
  setActiveTab
}) {
  // Flatten all topics to support next/prev navigation
  const allTopics = useMemo(() => {
    const list = [];
    deck?.modules?.forEach((mod) => {
      mod.topics?.forEach((t) => {
        list.push({ ...t, moduleTitle: mod.title, moduleId: mod.id });
      });
    });
    return list;
  }, [deck]);

  const activeTopic = useMemo(() => {
    return allTopics.find((t) => t.id === selectedTopicId) || allTopics[0] || null;
  }, [allTopics, selectedTopicId]);

  const currentIndex = allTopics.findIndex((t) => t.id === activeTopic?.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const isMastered = activeTopic && progress.masteredTopicIds?.includes(activeTopic.id);

  if (!activeTopic) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        <BookOpen className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p>No topic selected. Choose a topic from the curriculum to begin studying.</p>
      </div>
    );
  }

  const { content } = activeTopic;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
      {/* Sidebar Navigation: Modules & Topics */}
      <div className="lg:col-span-1 space-y-4">
        <div className="sticky top-28 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 max-h-[calc(100vh-140px)] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Curriculum Outline
            </span>
            <span className="text-[11px] text-slate-400">
              {progress.masteredTopicIds?.length || 0}/{allTopics.length} done
            </span>
          </div>

          <div className="space-y-4">
            {deck?.modules?.map((mod) => (
              <div key={mod.id} className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1">
                  {mod.title}
                </div>
                <div className="space-y-0.5">
                  {mod.topics?.map((topic) => {
                    const active = topic.id === activeTopic.id;
                    const mastered = progress.masteredTopicIds?.includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          active
                            ? "bg-indigo-600/20 text-indigo-300 font-semibold border-l-2 border-indigo-500"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                      >
                        <span className="truncate pr-2">{topic.title}</span>
                        {mastered && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="lg:col-span-3 space-y-8">
        {/* Topic Header Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <span>{activeTopic.moduleTitle}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3 w-3" /> ~{activeTopic.readTimeMinutes || 15} mins read
              </span>
            </div>

            <button
              onClick={() => toggleTopicMastered(activeTopic.id)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                isMastered
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25"
                  : "bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-white"
              }`}
            >
              <CheckCircle2 className={`h-4 w-4 ${isMastered ? "text-emerald-400" : "text-slate-400"}`} />
              <span>{isMastered ? "Topic Mastered ✓" : "Mark as Mastered"}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            {activeTopic.title}
          </h1>

          {content?.introduction && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
              {content.introduction}
            </p>
          )}
        </div>

        {/* Core Concepts Breakdown */}
        {content?.coreConcepts?.map((concept, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 sm:p-8 space-y-4"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-400">
                {idx + 1}
              </span>
              {concept.heading}
            </h2>

            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
              {concept.explanation}
            </div>

            {concept.keyPoints && concept.keyPoints.length > 0 && (
              <div className="mt-4 rounded-xl bg-slate-950/60 border border-slate-800/80 p-4 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                  Core Axioms & Critical Rules:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {concept.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Real-World Analogies Section */}
        {content?.analogies && content.analogies.length > 0 && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Lightbulb className="h-4 w-4" />
              <span>Intuitive Mental Model & Real-World Analogy</span>
            </div>
            {content.analogies.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xs font-semibold text-amber-200">{item.concept}:</div>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic">
                  "{item.analogy}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Common Traps & Misconceptions */}
        {content?.commonMisconceptions && content.commonMisconceptions.length > 0 && (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Common Traps, Exam Gotchas & Misconceptions</span>
            </div>
            <div className="space-y-3">
              {content.commonMisconceptions.map((trap, idx) => (
                <div key={idx} className="rounded-xl bg-slate-950/70 border border-rose-500/20 p-4 space-y-1.5">
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <span className="text-rose-500">✕ Trap:</span> {trap.trap}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 pl-4 border-l-2 border-emerald-500">
                    <span className="font-semibold text-emerald-400">✓ Reality:</span> {trap.reality}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deep Dive Formula or Code Block */}
        {content?.deepDiveFormulaOrCode && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Code2 className="h-4 w-4" />
                <span>{content.deepDiveFormulaOrCode.title}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Formula / Implementation</span>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-indigo-300 overflow-x-auto">
              <code>{content.deepDiveFormulaOrCode.formula}</code>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {content.deepDiveFormulaOrCode.explanation}
            </p>
          </div>
        )}

        {/* Key Takeaways */}
        {content?.takeaways && content.takeaways.length > 0 && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <FileCheck2 className="h-4 w-4" />
              <span>Key Takeaways & Retention Checklist</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {content.takeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice Quick-Action Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white">Test Your Retention Now</h4>
            <p className="text-xs text-slate-400">Reinforce this topic with active recall and practice questions.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("flashcards")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Drill Flashcards</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>

        {/* Next / Previous Topic Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {prevTopic ? (
            <button
              onClick={() => setSelectedTopicId(prevTopic.id)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase">Previous</div>
                <div className="font-semibold truncate max-w-[140px] sm:max-w-[200px]">
                  {prevTopic.title}
                </div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextTopic ? (
            <button
              onClick={() => setSelectedTopicId(nextTopic.id)}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-600/10 px-4 py-2 text-xs font-medium text-indigo-300 hover:bg-indigo-600/20 hover:border-indigo-500 transition-all cursor-pointer"
            >
              <div className="text-right">
                <div className="text-[10px] text-indigo-400/80 uppercase">Next Topic</div>
                <div className="font-semibold truncate max-w-[140px] sm:max-w-[200px]">
                  {nextTopic.title}
                </div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> Curriculum Complete!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
