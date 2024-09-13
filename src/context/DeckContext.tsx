import {
  DeckActions,
  deckReducer,
  DeckState,
  initialState,
} from "@/reducers/deckReducer";
import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

type DeckContextProps = {
  state: DeckState;
  dispatch: Dispatch<DeckActions>;
};

//export const DeckContext = createContext<DeckContextProps>(
//	{} as DeckContextProps
//);
export const DeckContext = createContext<DeckContextProps>(null!);

type DeckProviderProps = {
  children: ReactNode;
};
export const DeckProvider = ({ children }: DeckProviderProps) => {
  const [state, dispatch] = useReducer(deckReducer, initialState);

  useEffect(() => {
    localStorage.setItem("flashcardDecks", JSON.stringify(state.decks));
  }, [state.decks]);

  return (
    <DeckContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
