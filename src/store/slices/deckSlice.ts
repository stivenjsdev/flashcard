import type { RootState } from "@/store/store";
import { Card, Deck } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// if use localStorage to store state
const localStorageDeck = (): Deck[] => {
  const decks = localStorage.getItem("flashcardDecks");
  return decks ? JSON.parse(decks) : [];
};

// Define a type for the slice state
type DecksState = {
  value: Deck[];
};

// Define the initial state using that type
const initialState: DecksState = {
  value: localStorageDeck(),
};

export const decksSlice = createSlice({
  name: "decks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addDeck: (state, action: PayloadAction<{ name: string }>) => {
      state.value.push({
        id: Date.now(),
        name: action.payload.name,
        cards: [],
      });
    },
    importDeck: (state, action: PayloadAction<{ deck: Deck }>) => {
      const index = state.value.findIndex(
        (deck) => deck.id === action.payload.deck.id
      );
      if (index === -1) {
        // Add deck if not found
        state.value.push(action.payload.deck);
      } else {
        // Update deck if found
        state.value[index] = action.payload.deck;
      }
    },
    removeDeck: (state, action: PayloadAction<{ deckId: number }>) => {
      const indexToRemove = state.value.findIndex(
        (deck) => deck.id === action.payload.deckId
      );
      if (indexToRemove === -1) {
        console.error("Deck not found");
        return;
      }
      state.value.splice(indexToRemove, 1);
    },
    addCard: (
      state,
      action: PayloadAction<{ newCard: Card; deckId: number }>
    ) => {
      const deck = state.value.find(
        (deck) => deck.id === action.payload.deckId
      );
      if (!deck) {
        console.error("Deck not found");
        return;
      }
      deck.cards.push(action.payload.newCard);
    },
    updateCard: (
      state,
      action: PayloadAction<{ updatedCard: Card; deckId: number }>
    ) => {
      const deck = state.value.find(
        (deck) => deck.id === action.payload.deckId
      );
      if (!deck) {
        console.error("Deck not found");
        return;
      }
      const index = deck.cards.findIndex(
        (card) => card.id === action.payload.updatedCard.id
      );
      if (index === -1) {
        console.error("Card not found");
        return;
      }
      deck.cards[index] = action.payload.updatedCard;
    },
    removeCard: (
      state,
      action: PayloadAction<{ cardId: number; deckId: number }>
    ) => {
      const deck = state.value.find(
        (deck) => deck.id === action.payload.deckId
      );
      if (!deck) {
        console.error("Deck not found");
        return;
      }
      const index = deck.cards.findIndex(
        (card) => card.id === action.payload.cardId
      );
      if (index === -1) {
        console.error("Card not found");
        return;
      }
      deck.cards.splice(index, 1);
    },
    swapQuestionAndAnswer: (
      state,
      action: PayloadAction<{ deckId: number }>
    ) => {
      const deck = state.value.find((d) => d.id === action.payload.deckId);
      if (deck) {
        deck.cards = deck.cards.map((card) => ({
          ...card,
          answer: card.question,
          question: card.answer,
        }));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addDeck,
  importDeck,
  removeDeck,
  addCard,
  updateCard,
  removeCard,
  swapQuestionAndAnswer,
} = decksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDecks = (state: RootState) => state.decks.value;

export const decksReducer = decksSlice.reducer;
