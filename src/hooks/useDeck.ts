import { DeckContext } from "@/context/DeckContext";
import { useContext } from "react";

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckProvider");
  }

  return context;
};
