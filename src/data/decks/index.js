import { bece355lDeck } from "../bece355lDeck";
import { sampleDeck } from "../sampleDeck";

const STORAGE_KEY = "study_deck_custom_decks";
const PROGRESS_KEY = "study_deck_user_progress";

export function getInitialDecks() {
  const custom = loadCustomDecks();
  // BECE355L is the primary deck requested by the user
  return [bece355lDeck, sampleDeck, ...custom];
}

export function loadCustomDecks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to load custom decks from localStorage", err);
    return [];
  }
}

export function saveCustomDeck(deck) {
  try {
    const current = loadCustomDecks();
    const existingIndex = current.findIndex((d) => d.id === deck.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = deck;
    } else {
      updated = [deck, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save custom deck", err);
    return [];
  }
}

export function deleteCustomDeck(deckId) {
  try {
    const current = loadCustomDecks();
    const updated = current.filter((d) => d.id !== deckId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to delete custom deck", err);
    return [];
  }
}

export function getUserProgress(deckId) {
  try {
    const raw = localStorage.getItem(`${PROGRESS_KEY}_${deckId}`);
    if (!raw) {
      return {
        masteredTopicIds: [],
        flashcardStatuses: {},
        quizScores: {},
        nodeStatuses: {},
        studyTimeMinutes: 30,
        streakDays: 1
      };
    }
    return JSON.parse(raw);
  } catch (err) {
    return {
      masteredTopicIds: [],
      flashcardStatuses: {},
      quizScores: {},
      nodeStatuses: {},
      studyTimeMinutes: 0,
      streakDays: 1
    };
  }
}

export function saveUserProgress(deckId, progress) {
  try {
    localStorage.setItem(`${PROGRESS_KEY}_${deckId}`, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save user progress", err);
  }
}
