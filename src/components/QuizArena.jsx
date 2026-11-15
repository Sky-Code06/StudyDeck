import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  ChevronLeft
} from "lucide-react";

export function QuizArena({
  deck,
  progress,
  recordQuizResult
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizzes = deck?.quizzes || [];
  const currentQuiz = quizzes[currentIdx] || null;

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuiz) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuiz.correctIndex;
    recordQuizResult(currentQuiz.id, isCorrect);
  };

  const handleNext = () => {
    if (currentIdx < quizzes.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  if (!quizzes.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        <HelpCircle className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <p>No practice quiz questions added for this deck yet.</p>
      </div>
    );
  }

  // Calculate score
  const correctCount = Object.values(progress?.quizScores || {}).filter(Boolean).length;
  const totalAnswered = Object.keys(progress?.quizScores || {}).length;

  if (quizFinished) {
    return (
      <div className="max-w-2xl mx-auto rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30">
          <Award className="h-10 w-10" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Assessment Complete!
          </h2>
          <p className="text-sm text-slate-400">
            You've completed the practice quiz for this curriculum.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex justify-around items-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {correctCount} / {quizzes.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">Questions Correct</div>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
              {quizzes.length > 0 ? Math.round((correctCount / quizzes.length) * 100) : 0}%
            </div>
            <div className="text-xs text-slate-400 mt-1">Mastery Score</div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Retake Practice Quiz</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-400">
            ?
          </span>
          <span className="text-xs font-semibold text-slate-300">
            Question {currentIdx + 1} of {quizzes.length}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>
            Score: <strong className="text-emerald-400">{correctCount}</strong> / {totalAnswered}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-indigo-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / quizzes.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-xl space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
          {currentQuiz.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuiz.correctIndex;

            let optionStyle =
              "border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700 hover:bg-slate-900/60";

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyle = "border-emerald-500/50 bg-emerald-950/20 text-emerald-200 ring-1 ring-emerald-500/40";
              } else if (isSelected && !isCorrect) {
                optionStyle = "border-rose-500/50 bg-rose-950/20 text-rose-200 ring-1 ring-rose-500/40";
              } else {
                optionStyle = "border-slate-800/50 bg-slate-950/30 text-slate-500 opacity-60";
              }
            } else if (isSelected) {
              optionStyle = "border-indigo-500 bg-indigo-950/30 text-indigo-200 ring-1 ring-indigo-500/40";
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-700 text-[10px] font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Conceptual Explanation (Appears after submission) */}
        {isAnswerSubmitted && (
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-5 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              In-Depth Conceptual Explanation:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentQuiz.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-800">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>{currentIdx < quizzes.length - 1 ? "Next Question" : "Finish Quiz"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
