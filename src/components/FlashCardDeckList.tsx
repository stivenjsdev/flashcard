import { useDeck } from "@/hooks/useDeck";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlashCardDeckList = () => {
  const {
    state: { decks },
    dispatch,
  } = useDeck();
  const navigate = useNavigate();
  const [newDeckName, setNewDeckName] = useState("");

  const handleAddDeck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newDeckName.trim()) {
      const newDeck = { id: Date.now(), name: newDeckName.trim(), cards: [] };
      dispatch({ type: "ADD_DECK", payload: { newDeck } });
      setNewDeckName("");
    }
  };

  const handleSelectDeck = (deckId: number) => {
    navigate(`/${deckId}`);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-tertiary-normal">FlashCards Decks</h2>
      <form className="mb-4 flex" onSubmit={handleAddDeck}>
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="Nuevo Deck"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary-normal"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-secondary-normal text-white rounded-r-md hover:bg-secondary-dark  focus:outline-none focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </form>
      <ul className="space-y-2">
        {decks.map((deck) => (
          <li
            key={deck.id}
            className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer text-tertiary-normal"
            onClick={() => handleSelectDeck(deck.id)}
          >
            {deck.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashCardDeckList;
