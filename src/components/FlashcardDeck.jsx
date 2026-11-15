import React, { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  RotateCw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  Flame,
  Award,
  Zap,
  RotateCcw
} from "lucide-react";

export function FlashcardDeck({
  deck,
  progress,
  recordFlashcardReview
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState("all");
  const [highYieldOnly, setHighYieldOnly] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter flashcards
  const filteredCards = useMemo(() => {
    let list = deck?.flashcards || [];
    if (selectedModuleFilter !== "all") {
      list = list.filter((c) => c.moduleId === selectedModuleFilter);
    }
    if (highYieldOnly) {
      list = list.filter((c) => c.highYield);
    }
    return list;
  }, [deck, selectedModuleFilter, highYieldOnly]);

  const currentCard = filteredCards[currentIndex] || null;

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex, selectedModuleFilter, highYieldOnly]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid hotkeys if typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === "1" && isFlipped) {
        handleRate("again");
      } else if (e.key === "2" && isFlipped) {
        handleRate("hard");
      } else if (e.key === "3" && isFlipped) {
        handleRate("good");
      } else if (e.key === "4" && isFlipped) {
        handleRate("easy");
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentIndex, filteredCards]);

  const handleRate = (rating) => {
    if (!currentCard) return;
    recordFlashcardReview(currentCard.id, rating);

    // If last card, trigger confetti
    if (currentIndex >= filteredCards.length - 1) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handleSpeak = (text) => {
    if (!window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!filteredCards.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        <Sparkles className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p className="text-sm">No flashcards match the selected filter.</p>
        <button
          onClick={() => {
            setSelectedModuleFilter("all");
            setHighYieldOnly(false);
          }}
          className="mt-4 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  const currentStatus = currentCard ? progress.flashcardStatuses?.[currentCard.id] : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Controls & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        {/* Module filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={selectedModuleFilter}
            onChange={(e) => {
              setSelectedModuleFilter(e.target.value);
              setCurrentIndex(0);
            }}
            className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Modules ({deck?.flashcards?.length || 0})</option>
            {deck?.modules?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </div>

        {/* High Yield toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={highYieldOnly}
              onChange={(e) => {
                setHighYieldOnly(e.target.checked);
                setCurrentIndex(0);
              }}
              className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500/20"
            />
            <span className="flex items-center gap-1 font-medium">
              <Flame className="h-3.5 w-3.5 text-amber-400" /> High Yield Only
            </span>
          </label>

          <span className="text-xs text-slate-500 font-mono">
            {currentIndex + 1} / {filteredCards.length}
          </span>
        </div>
      </div>

      {/* Progress bar across current card deck */}
      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
        />
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="relative min-h-[380px] w-full cursor-pointer select-none [perspective:1000px]"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div
          className={`relative h-full w-full rounded-3xl border border-slate-800/90 bg-gradient-to-br transition-all duration-500 [transform-style:preserve-3d] shadow-2xl ${
            isFlipped
              ? "from-slate-900 via-indigo-950/40 to-slate-900 ring-1 ring-indigo-500/30"
              : "from-slate-900 via-slate-950 to-slate-900 hover:border-slate-700"
          }`}
        >
          {/* Card Content Wrapper */}
          <div className="p-8 sm:p-10 flex flex-col justify-between min-h-[380px]">
            {/* Top Badge & Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 ring-1 ring-indigo-500/20">
                  {currentCard.conceptTag || "Core Concept"}
                </span>
                {currentCard.highYield && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300 ring-1 ring-amber-500/20">
                    <Flame className="h-3 w-3" /> High Yield
                  </span>
                )}
                {currentStatus && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      currentStatus.status === "easy"
                        ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                        : currentStatus.status === "again"
                        ? "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20"
                        : "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"
                    }`}
                  >
                    Rating: {currentStatus.status}
                  </span>
                )}
              </div>

              {/* TTS Read Aloud */}
              <button
                type="button"
                title="Read aloud"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(isFlipped ? currentCard.answer : currentCard.question);
                }}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isSpeaking
                    ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 animate-pulse"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"
                }`}
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* Middle Prompt / Answer Body */}
            <div className="py-6">
              {!isFlipped ? (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                    Question / Active Prompt
                  </span>
                  <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                    {currentCard.question}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">
                    Answer & Explanation
                  </span>
                  <div className="text-sm sm:text-base text-slate-100 leading-relaxed whitespace-pre-line bg-slate-950/40 p-5 rounded-2xl border border-indigo-500/20">
                    {currentCard.answer}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Flip Cue */}
            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/60 pt-4">
              <span className="flex items-center gap-1.5">
                <RotateCw className="h-3.5 w-3.5" />
                {!isFlipped ? "Click or press Space to reveal answer" : "Click or press Space to view prompt"}
              </span>
              <span className="hidden sm:inline font-mono text-[11px]">
                Keys: Space (Flip) • 1-4 (Rate) • ← → (Nav)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spaced Repetition Rating Buttons (Visible when flipped) */}
      {isFlipped ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
          <div className="text-center text-xs font-semibold text-slate-400">
            How well did you recall this concept?
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => handleRate("again")}
              className="flex flex-col items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 py-3 px-2 text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer font-medium text-xs"
            >
              <span className="font-bold text-sm">1 • Again</span>
              <span className="text-[10px] text-rose-400/80 mt-0.5">&lt; 1 min</span>
            </button>
            <button
              onClick={() => handleRate("hard")}
              className="flex flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 py-3 px-2 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer font-medium text-xs"
            >
              <span className="font-bold text-sm">2 • Hard</span>
              <span className="text-[10px] text-amber-400/80 mt-0.5">12 hours</span>
            </button>
            <button
              onClick={() => handleRate("good")}
              className="flex flex-col items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 py-3 px-2 text-blue-300 hover:bg-blue-500/20 transition-all cursor-pointer font-medium text-xs"
            >
              <span className="font-bold text-sm">3 • Good</span>
              <span className="text-[10px] text-blue-400/80 mt-0.5">1 day</span>
            </button>
            <button
              onClick={() => handleRate("easy")}
              className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3 px-2 text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer font-medium text-xs"
            >
              <span className="font-bold text-sm">4 • Easy</span>
              <span className="text-[10px] text-emerald-400/80 mt-0.5">3 days</span>
            </button>
          </div>
        </div>
      ) : (
        /* Navigation Controls when un-flipped */
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={() => setIsFlipped(true)}
            className="rounded-xl bg-indigo-600 px-6 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Show Answer (Space)
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
