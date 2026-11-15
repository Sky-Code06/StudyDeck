import { useState, useEffect, useMemo } from "react";
import {
  getInitialDecks,
  saveCustomDeck,
  deleteCustomDeck,
  getUserProgress,
  saveUserProgress
} from "../data/decks/index.js";

export function useStudyDeck() {
  const [decks, setDecks] = useState(() => getInitialDecks());
  const [activeDeckId, setActiveDeckId] = useState(() => decks[0]?.id || "");
  const [activeTab, setActiveTab] = useState("overview"); // overview, notes, flashcards, map, quiz, cheatsheet, builder
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState("all");

  const currentDeck = useMemo(() => {
    return decks.find((d) => d.id === activeDeckId) || decks[0] || null;
  }, [decks, activeDeckId]);

  const [progress, setProgress] = useState(() => {
    if (!currentDeck) return {};
    return getUserProgress(currentDeck.id);
  });

  // Reload progress when active deck changes
  useEffect(() => {
    if (currentDeck) {
      setProgress(getUserProgress(currentDeck.id));
      // Default to first topic if none selected
      if (!selectedTopicId && currentDeck.modules?.[0]?.topics?.[0]) {
        setSelectedTopicId(currentDeck.modules[0].topics[0].id);
      }
    }
  }, [currentDeck?.id]);

  // Persist progress changes
  const updateProgress = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      if (currentDeck) {
        saveUserProgress(currentDeck.id, next);
      }
      return next;
    });
  };

  const toggleTopicMastered = (topicId) => {
    updateProgress((prev) => {
      const exists = prev.masteredTopicIds?.includes(topicId);
      const updated = exists
        ? prev.masteredTopicIds.filter((id) => id !== topicId)
        : [...(prev.masteredTopicIds || []), topicId];
      return { ...prev, masteredTopicIds: updated };
    });
  };

  const recordFlashcardReview = (cardId, rating) => {
    updateProgress((prev) => {
      const currentCard = prev.flashcardStatuses?.[cardId] || { reviewCount: 0 };
      const updated = {
        ...prev.flashcardStatuses,
        [cardId]: {
          status: rating, // 'again', 'hard', 'good', 'easy'
          reviewCount: (currentCard.reviewCount || 0) + 1,
          lastReviewed: Date.now()
        }
      };
      return { ...prev, flashcardStatuses: updated };
    });
  };

  const recordQuizResult = (quizId, isCorrect) => {
    updateProgress((prev) => ({
      ...prev,
      quizScores: {
        ...(prev.quizScores || {}),
        [quizId]: isCorrect
      }
    }));
  };

  const updateNodeStatus = (nodeId, status) => {
    updateProgress((prev) => ({
      ...prev,
      nodeStatuses: {
        ...(prev.nodeStatuses || {}),
        [nodeId]: status
      }
    }));
  };

  const handleAddNewDeck = (newDeck) => {
    const updated = saveCustomDeck(newDeck);
    setDecks(getInitialDecks());
    setActiveDeckId(newDeck.id);
    setActiveTab("overview");
  };

  const handleDeleteDeck = (deckId) => {
    deleteCustomDeck(deckId);
    const refreshed = getInitialDecks();
    setDecks(refreshed);
    if (activeDeckId === deckId && refreshed.length > 0) {
      setActiveDeckId(refreshed[0].id);
    }
  };

  // Aggregated analytics
  const analytics = useMemo(() => {
    if (!currentDeck) return { totalTopics: 0, masteredTopics: 0, percentComplete: 0 };
    
    let allTopics = [];
    currentDeck.modules?.forEach((m) => {
      if (m.topics) allTopics.push(...m.topics);
    });

    const totalTopics = allTopics.length;
    const masteredCount = (progress.masteredTopicIds || []).filter((id) =>
      allTopics.some((t) => t.id === id)
    ).length;

    const percentComplete = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0;
    
    const totalCards = currentDeck.flashcards?.length || 0;
    const reviewedCardsCount = Object.keys(progress.flashcardStatuses || {}).length;

    const totalQuizzes = currentDeck.quizzes?.length || 0;
    const quizAnsweredCount = Object.keys(progress.quizScores || {}).length;
    const quizCorrectCount = Object.values(progress.quizScores || {}).filter(Boolean).length;

    return {
      totalTopics,
      masteredTopics: masteredCount,
      percentComplete,
      totalCards,
      reviewedCardsCount,
      totalQuizzes,
      quizAnsweredCount,
      quizCorrectCount,
      studyStreak: progress.streakDays || 3,
      studyMinutes: progress.studyTimeMinutes || 45
    };
  }, [currentDeck, progress]);

  return {
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
    selectedModuleFilter,
    setSelectedModuleFilter,
    progress,
    toggleTopicMastered,
    recordFlashcardReview,
    recordQuizResult,
    updateNodeStatus,
    handleAddNewDeck,
    handleDeleteDeck,
    analytics
  };
}
