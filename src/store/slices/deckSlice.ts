import type { RootState } from "@/store/store";
import { Deck } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// if use localStorage to store state
const localStorageDeck = (): Deck[] => {
  const decks = localStorage.getItem("flashcardDecks");
  return decks ? JSON.parse(decks) : [];
};

// Define a type for the slice state
interface DecksState {
  value: Deck[];
}

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
    add: (state, action: PayloadAction<{ newDeck: Deck }>) => {
      state.value.push(action.payload.newDeck);
    },
    update: (state, action: PayloadAction<{ updatedDeck: Deck }>) => {
      const indexToUpdate = state.value.findIndex(
        (deck) => deck.id === action.payload.updatedDeck.id
      );
      if (indexToUpdate === -1) {
        console.error("Deck not found");
        return;
      }
      state.value.splice(indexToUpdate, 1, action.payload.updatedDeck);
    },
    remove: (state, action: PayloadAction<{ deckId: number }>) => {
      const indexToRemove = state.value.findIndex(
        (deck) => deck.id === action.payload.deckId
      );
      if (indexToRemove === -1) {
        console.error("Deck not found");
        return;
      }
      state.value.splice(indexToRemove, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, update } = decksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDecks = (state: RootState) => state.decks.value;

export const decksReducer = decksSlice.reducer;
