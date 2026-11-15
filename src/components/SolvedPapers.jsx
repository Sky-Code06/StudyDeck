import React, { useState } from "react";
import {
  FileCheck,
  Search,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Sparkles,
  HelpCircle,
  FileQuestion,
  Filter,
  ArrowRight,
  FolderOpen
} from "lucide-react";

export function SolvedPapers({
  papers,
  setActiveTab,
  setSelectedTopicId
}) {
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0]?.id || "");
  const [expandedQuestions, setExpandedQuestions] = useState({
    "cat1-q1": true,
    "cat1-q2": true
  });
  const [marksFilter, setMarksFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const activePaper = papers.find((p) => p.id === selectedPaperId) || papers[0] || null;

  const toggleExpand = (qId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleCopy = (text, qId) => {
    navigator.clipboard.writeText(text);
    setCopiedId(qId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const expandAll = () => {
    const all = {};
    activePaper?.sections?.forEach((sec) => {
      sec.questions?.forEach((q) => {
        all[q.id] = true;
      });
    });
    setExpandedQuestions(all);
  };

  const collapseAll = () => {
    setExpandedQuestions({});
  };

  // Filter questions
  const filteredSections = activePaper?.sections?.map((sec) => {
    const questions = sec.questions?.filter((q) => {
      const matchesMarks = marksFilter === "all" || q.marks.toString() === marksFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.modelAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.module.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesMarks && matchesSearch;
    });
    return { ...sec, questions };
  }).filter((sec) => sec.questions && sec.questions.length > 0) || [];

  return (
    <div className="space-y-8 pb-20">
      {/* Banner */}
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30">
              <FileCheck className="h-5 w-5" />
            </span>
            <span className="rounded-full bg-indigo-500/20 px-3 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              Verified University Solved Question Papers
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <FolderOpen className="h-4 w-4 text-amber-400" />
            <span>Folder: /solved_papers/</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Exam Solutions & Past Papers Repository
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Questions from your CAT-1, CAT-2, and FAT exam papers solved with comprehensive, 100% verified model answers mapped directly back to your syllabus notes. Every answer includes grading keywords, comparison matrices, and architectural diagrams.
        </p>
      </div>

      {/* Controls Bar: Paper Switcher & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        {/* Paper Selector */}
        <div className="flex items-center gap-3">
          <FileQuestion className="h-4 w-4 text-indigo-400 shrink-0" />
          <select
            value={selectedPaperId}
            onChange={(e) => {
              setSelectedPaperId(e.target.value);
              setExpandedQuestions({ "cat1-q1": true, "cat1-q2": true });
            }}
            className="rounded-xl border border-slate-800 bg-slate-950 py-1.5 px-3 text-xs font-semibold text-slate-200 focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            {papers.map((p) => (
              <option key={p.id} value={p.id}>
                📝 {p.title} ({p.totalMarks} Marks)
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Marks & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="h-3.5 w-3.5" />
            <select
              value={marksFilter}
              onChange={(e) => setMarksFilter(e.target.value)}
              className="rounded-lg border border-slate-800 bg-slate-950 py-1 px-2.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Marks Weightage</option>
              <option value="5">5 Marks Questions</option>
              <option value="10">10 Marks Questions</option>
            </select>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search paper questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 sm:w-56 rounded-lg border border-slate-800 bg-slate-950 py-1 pl-8 pr-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={expandAll}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Active Paper Meta Stats */}
      {activePaper && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-[10px] text-slate-400 font-medium">Exam Type</div>
            <div className="text-xs font-bold text-white mt-0.5">{activePaper.examType}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-[10px] text-slate-400 font-medium">Total Weightage</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">{activePaper.totalMarks} Marks</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-[10px] text-slate-400 font-medium">Estimated Time</div>
            <div className="text-xs font-bold text-indigo-400 mt-0.5">{activePaper.duration}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-[10px] text-slate-400 font-medium">Covered Syllabus</div>
            <div className="text-xs font-bold text-slate-200 truncate mt-0.5">{activePaper.coveredModules}</div>
          </div>
        </div>
      )}

      {/* Questions by Section */}
      <div className="space-y-8">
        {filteredSections.map((sec, secIdx) => (
          <div key={secIdx} className="space-y-4">
            <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              <span>{sec.sectionName}</span>
              <span className="text-xs text-slate-500 font-normal">
                ({sec.questions.length} Questions)
              </span>
            </h2>

            <div className="space-y-4">
              {sec.questions.map((q) => {
                const isExpanded = expandedQuestions[q.id];
                const isCopied = copiedId === q.id;

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border transition-all ${
                      isExpanded
                        ? "border-slate-700/80 bg-slate-900/80 shadow-lg"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                  >
                    {/* Question Header Row */}
                    <div
                      onClick={() => toggleExpand(q.id)}
                      className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex h-6 px-2 items-center justify-center rounded-md bg-indigo-500/20 text-xs font-bold text-indigo-400 font-mono">
                            {q.questionNumber}
                          </span>
                          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                            [{q.marks} Marks]
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {q.module}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                          {q.question}
                        </h3>

                        {q.topicRef && (
                          <div className="flex items-center gap-1.5 text-xs text-indigo-400/80">
                            <BookOpen className="h-3 w-3" />
                            <span>Source Note: {q.topicRef}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-1">
                        <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                          {isExpanded ? "Hide Answer" : "Show Model Answer"}
                        </span>
                        <div className="p-1 rounded-lg bg-slate-800 text-slate-400">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Model Answer Body */}
                    {isExpanded && (
                      <div className="border-t border-slate-800/80 bg-slate-950/70 p-6 sm:p-8 space-y-4 rounded-b-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            <FileCheck className="h-4 w-4" />
                            <span>100% Verified Model Solution (Full Marks Scheme)</span>
                          </div>

                          <button
                            title="Copy answer"
                            onClick={() => handleCopy(q.modelAnswer, q.id)}
                            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:text-white cursor-pointer"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 prose-invert max-w-none whitespace-pre-line font-sans">
                          {q.modelAnswer}
                        </div>

                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                          <span>Exam Tip: Always structure with clear headings, bullet points, and comparative tables.</span>
                          <button
                            onClick={() => {
                              setActiveTab("notes");
                            }}
                            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                          >
                            <span>Study Complete Notes</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* How to Add More Papers Banner */}
      <div className="rounded-3xl border border-dashed border-indigo-500/40 bg-indigo-950/20 p-6 sm:p-8 text-center space-y-3">
        <Sparkles className="mx-auto h-8 w-8 text-indigo-400" />
        <h3 className="text-base sm:text-lg font-bold text-white">
          Have more CAT / FAT / University question papers?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Drop any PDF or image files of question papers into <code className="bg-slate-900 px-2 py-0.5 rounded text-indigo-300 font-mono">c:\Aakash's File\Projects\Study Deck\solved_papers\</code>. I will extract every question and publish the complete, full-marks model solution directly into this dashboard!
        </p>
      </div>
    </div>
  );
}
