import { Deck } from "@/types/index";

const localStorageDecks = (): Deck[] => {
  const decks = localStorage.getItem("flashcardDecks");
  return decks ? JSON.parse(decks) : [];
};

export type DeckState = {
  decks: Deck[];
};

export const initialState: DeckState = {
  decks: localStorageDecks(),
};

export type DeckActions =
  | {
      type: "ADD_DECK";
      payload: { newDeck: Deck };
    }
  | {
      type: "UPDATE_DECK";
      payload: { updatedDeck: Deck };
    };

export const deckReducer = (
  state: DeckState = initialState,
  action: DeckActions
) => {
  if (action.type === "ADD_DECK") {
    return {
      ...state,
      decks: [...state.decks, action.payload.newDeck],
    };
  }
  if (action.type === "UPDATE_DECK") {
    const updatedDeck = action.payload.updatedDeck;
    const updatedDecks = state.decks.map((deck) =>
      deck.id === updatedDeck.id ? updatedDeck : deck
    );
    return {
      ...state,
      decks: updatedDecks,
    };
  }

  return state;
};
