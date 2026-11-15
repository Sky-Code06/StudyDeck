import React, { useMemo } from "react";
import { useStudyDeck } from "./hooks/useStudyDeck";
import { Navbar } from "./components/Navbar";
import { DashboardOverview } from "./components/DashboardOverview";
import { NotesViewer } from "./components/NotesViewer";
import { FlashcardDeck } from "./components/FlashcardDeck";
import { ConceptMap } from "./components/ConceptMap";
import { QuizArena } from "./components/QuizArena";
import { CheatSheet } from "./components/CheatSheet";
import { DeckBuilder } from "./components/DeckBuilder";
import { SolvedPapers } from "./components/SolvedPapers";
import { solvedPapersData } from "./data/solvedPapersData";
import { BookOpen, Sparkles, ArrowRight, Search, X } from "lucide-react";

export function App() {
  const {
    decks,
    currentDeck,
    activeDeckId,
    setActiveDeckId,
    activeTab,
    setActiveTab,
    selectedTopicId,
    setSelectedTopicId,
    searchQuery,
    setSearchQuery,
    progress,
    toggleTopicMastered,
    recordFlashcardReview,
    recordQuizResult,
    updateNodeStatus,
    handleAddNewDeck,
    handleDeleteDeck,
    analytics
  } = useStudyDeck();

  // Global search filtering across notes and flashcards
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !currentDeck) return null;
    const q = searchQuery.toLowerCase();

    const matchedTopics = [];
    currentDeck.modules?.forEach((m) => {
      m.topics?.forEach((t) => {
        if (
          t.title.toLowerCase().includes(q) ||
          t.content?.introduction?.toLowerCase().includes(q) ||
          t.content?.coreConcepts?.some((c) =>
            c.heading.toLowerCase().includes(q) || c.explanation.toLowerCase().includes(q)
          )
        ) {
          matchedTopics.push({ ...t, moduleTitle: m.title });
        }
      });
    });

    const matchedCards = (currentDeck.flashcards || []).filter(
      (c) =>
        c.question.toLowerCase().includes(q) ||
        c.answer.toLowerCase().includes(q) ||
        c.conceptTag?.toLowerCase().includes(q)
    );

    return { matchedTopics, matchedCards };
  }, [searchQuery, currentDeck]);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <Navbar
        decks={decks}
        activeDeckId={activeDeckId}
        setActiveDeckId={setActiveDeckId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        analytics={analytics}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
        {/* Search Results Overlay / View */}
        {searchResults ? (
          <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Search className="h-4 w-4 text-indigo-400" />
                  <span>Search Results for "{searchQuery}"</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Found {searchResults.matchedTopics.length} topics and {searchResults.matchedCards.length} flashcards
                </p>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Clear Search</span>
              </button>
            </div>

            {/* Matched Topics */}
            {searchResults.matchedTopics.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Relevant Topics in Curriculum
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.matchedTopics.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTopicId(t.id);
                        setActiveTab("notes");
                        setSearchQuery("");
                      }}
                      className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-indigo-500 hover:bg-slate-900 cursor-pointer transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs text-indigo-400">
                        <span>{t.moduleTitle}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                      <h4 className="text-sm font-semibold text-white">{t.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {t.content?.introduction || "Click to study this topic."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Cards */}
            {searchResults.matchedCards.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Relevant Active Recall Flashcards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.matchedCards.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setActiveTab("flashcards");
                        setSearchQuery("");
                      }}
                      className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 hover:border-amber-500/50 hover:bg-slate-900 cursor-pointer transition-all space-y-2"
                    >
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                        {c.conceptTag}
                      </span>
                      <h4 className="text-xs font-semibold text-white">{c.question}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{c.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <DashboardOverview
                deck={currentDeck}
                analytics={analytics}
                progress={progress}
                setActiveTab={setActiveTab}
                setSelectedTopicId={setSelectedTopicId}
                toggleTopicMastered={toggleTopicMastered}
              />
            )}

            {activeTab === "notes" && (
              <NotesViewer
                deck={currentDeck}
                selectedTopicId={selectedTopicId}
                setSelectedTopicId={setSelectedTopicId}
                progress={progress}
                toggleTopicMastered={toggleTopicMastered}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "papers" && (
              <SolvedPapers
                papers={solvedPapersData}
                setActiveTab={setActiveTab}
                setSelectedTopicId={setSelectedTopicId}
              />
            )}

            {activeTab === "flashcards" && (
              <FlashcardDeck
                deck={currentDeck}
                progress={progress}
                recordFlashcardReview={recordFlashcardReview}
              />
            )}

            {activeTab === "map" && (
              <ConceptMap
                deck={currentDeck}
                progress={progress}
                updateNodeStatus={updateNodeStatus}
                setSelectedTopicId={setSelectedTopicId}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "quiz" && (
              <QuizArena
                deck={currentDeck}
                progress={progress}
                recordQuizResult={recordQuizResult}
              />
            )}

            {activeTab === "cheatsheet" && (
              <CheatSheet deck={currentDeck} />
            )}

            {activeTab === "builder" && (
              <DeckBuilder
                decks={decks}
                activeDeckId={activeDeckId}
                setActiveDeckId={setActiveDeckId}
                handleAddNewDeck={handleAddNewDeck}
                handleDeleteDeck={handleDeleteDeck}
                currentDeck={currentDeck}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">StudyDeck Platform</span>
            <span>•</span>
            <span>Zero-Omission Comprehensive Learning</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Spaced Repetition</span>
            <span>•</span>
            <span>Active Recall</span>
            <span>•</span>
            <span>Concept Graphing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
