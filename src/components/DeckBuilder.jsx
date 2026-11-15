import React, { useState } from "react";
import {
  Upload,
  Download,
  FileCode,
  Sparkles,
  CheckCircle2,
  Trash2,
  Copy,
  Plus,
  BookOpen,
  ArrowRight
} from "lucide-react";

export function DeckBuilder({
  decks,
  activeDeckId,
  setActiveDeckId,
  handleAddNewDeck,
  handleDeleteDeck,
  currentDeck
}) {
  const [jsonInput, setJsonInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Quick form state for manual topic creation
  const [manualTitle, setManualTitle] = useState("");
  const [manualCategory, setManualCategory] = useState("");
  const [manualDescription, setManualDescription] = useState("");

  const handleImportJson = () => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.id || !parsed.title || !parsed.modules) {
        throw new Error("Invalid deck structure: Missing required fields (id, title, or modules).");
      }
      handleAddNewDeck(parsed);
      setSuccessMsg(`Deck "${parsed.title}" imported successfully!`);
      setJsonInput("");
    } catch (err) {
      setErrorMsg(err.message || "Failed to parse JSON.");
    }
  };

  const handleExportCurrent = () => {
    if (!currentDeck) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentDeck, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentDeck.id || "study-deck"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.id || !parsed.title) {
          throw new Error("JSON file must have 'id' and 'title'.");
        }
        handleAddNewDeck(parsed);
        setSuccessMsg(`Deck "${parsed.title}" loaded successfully from file!`);
      } catch (err) {
        setErrorMsg("Failed to read JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleCreateEmptyDeck = () => {
    if (!manualTitle.trim()) {
      setErrorMsg("Please enter a deck title.");
      return;
    }
    const slug = manualTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newDeck = {
      id: `deck-${slug}-${Date.now().toString().slice(-4)}`,
      title: manualTitle,
      category: manualCategory || "General",
      description: manualDescription || "Custom study deck.",
      estimatedHours: 10,
      badge: "Custom Deck",
      modules: [
        {
          id: `mod-1-${slug}`,
          title: "Module 1: Foundations",
          summary: "Core concepts and introductory topics.",
          order: 1,
          topics: [
            {
              id: `top-1-1-${slug}`,
              title: "1.1 Introduction & Overview",
              readTimeMinutes: 10,
              masteryLevel: "Foundational",
              content: {
                introduction: "Initial topic generated for this deck.",
                coreConcepts: [
                  {
                    heading: "Fundamental Concepts",
                    explanation: "Add exhaustive notes here or paste learning files to be ingested.",
                    keyPoints: ["Key takeaway rule 1", "Key takeaway rule 2"]
                  }
                ],
                analogies: [],
                commonMisconceptions: [],
                takeaways: ["Topic initialized."]
              }
            }
          ]
        }
      ],
      flashcards: [],
      conceptNodes: [],
      quizzes: [],
      cheatSheet: []
    };

    handleAddNewDeck(newDeck);
    setSuccessMsg(`New deck "${newDeck.title}" created!`);
    setManualTitle("");
    setManualCategory("");
    setManualDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Zero-Omission Material Ingestion Center</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
          Add Learning Materials & Custom Decks
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          You can share your files with your Antigravity AI pair programmer in chat, drop them in the project workspace, or import a pre-generated Study Deck JSON file below. Every single topic will be rendered with deep notes, flashcards, concept graphs, and quiz questions.
        </p>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-semibold text-rose-300">
          ✕ {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> {successMsg}
        </div>
      )}

      {/* Grid: JSON Import vs File Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Method 1: Import JSON Deck */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCode className="h-4 w-4 text-indigo-400" />
                <span>Import Deck via JSON</span>
              </h3>
              <label className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700">
                <Upload className="inline h-3 w-3 mr-1" />
                Load File
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-slate-400">
              Paste the JSON code of a generated deck to instantly load it into your dashboard.
            </p>
            <textarea
              rows={8}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{ "id": "my-deck", "title": "My Course", "modules": [...] }'
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleImportJson}
            disabled={!jsonInput.trim()}
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-indigo-600/20"
          >
            Import and Launch Deck
          </button>
        </div>

        {/* Method 2: Create New Deck Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-400" />
              <span>Create New Deck Shell</span>
            </h3>
            <p className="text-xs text-slate-400">
              Set up a new course or subject container ready to receive topics and content.
            </p>

            <div className="space-y-2.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Deck Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Molecular Biology & Genetics"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 px-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Category / Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Life Sciences, Mathematics, Law"
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 px-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Brief overview of what will be taught..."
                  value={manualDescription}
                  onChange={(e) => setManualDescription(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 py-1.5 px-3 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateEmptyDeck}
            disabled={!manualTitle.trim()}
            className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            Create New Study Deck
          </button>
        </div>
      </div>

      {/* Active Decks Library Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>Loaded Study Decks Library</span>
          </h3>
          {currentDeck && (
            <button
              onClick={handleExportCurrent}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Active Deck (.json)</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-800/60">
          {decks.map((deck) => {
            const isActive = deck.id === activeDeckId;
            const isBuiltIn = deck.id === "cs-systems-architecture";

            return (
              <div
                key={deck.id}
                className="py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{deck.title}</span>
                    {isActive && (
                      <span className="rounded-full bg-indigo-500/20 px-2 py-0.2 text-[10px] font-semibold text-indigo-400 border border-indigo-500/30">
                        Active
                      </span>
                    )}
                    {isBuiltIn && (
                      <span className="rounded-full bg-slate-800 px-2 py-0.2 text-[10px] text-slate-400">
                        Built-in Master
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 line-clamp-1">{deck.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!isActive && (
                    <button
                      onClick={() => setActiveDeckId(deck.id)}
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-700 cursor-pointer"
                    >
                      Switch to Deck
                    </button>
                  )}
                  {!isBuiltIn && (
                    <button
                      title="Delete custom deck"
                      onClick={() => handleDeleteDeck(deck.id)}
                      className="p-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
