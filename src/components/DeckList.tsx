import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addDeck, removeDeck, selectDecks } from "@/store/slices/deckSlice";
import { Card, Deck } from "@/types";
import { PlusCircle, Send, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const decks = useAppSelector(selectDecks);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [newDeckName, setNewDeckName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [matchingCards, setMatchingCards] = useState<
    { deckId: number; cards: Card[] }[]
  >([]);

  const filterDecks = (term: string, decks: Deck[]) => {
    const filteredDecks = decks.filter((deck) => {
      const matchInDeckName = deck.name
        .toLowerCase()
        .includes(term.toLowerCase().trim());
      const matchingCardsInDeck = deck.cards.filter(
        (card) =>
          card.question.toLowerCase().includes(term.toLowerCase().trim()) ||
          card.answer.toLowerCase().includes(term.toLowerCase().trim())
      );
      if (matchingCardsInDeck.length > 0) {
        setMatchingCards((prev) => [
          ...prev,
          { deckId: deck.id, cards: matchingCardsInDeck },
        ]);
      }
      return matchInDeckName || matchingCardsInDeck.length > 0;
    });
    return filteredDecks;
  };

  const filteredDecks = useMemo(() => {
    setMatchingCards([]);
    return filterDecks(searchTerm, decks);
  }, [searchTerm, decks]);

  const handleAddDeck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newDeckName.trim()) {
      dispatch(addDeck({ name: newDeckName }));
      setNewDeckName("");
    }
  };

  const handleSelectDeck = (deckId: number) => {
    navigate(`/deck/${deckId}`);
  };

  const handleRemoveDeck = (
    event: React.MouseEvent<HTMLButtonElement>,
    deckId: number
  ) => {
    event.stopPropagation();
    dispatch(removeDeck({ deckId }));
  };

  const handleSendDeck = (
    event: React.MouseEvent<HTMLButtonElement>,
    deckId: number
  ) => {
    event.stopPropagation();
    navigate(`/export/${deckId}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setMatchingCards([]);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold text-tertiary-normal">
        FlashCards Decks
      </h2>

      <form className="flex" onSubmit={handleAddDeck}>
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="Nuevo Grupo de Tarjetas (Deck)..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary-normal"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-secondary-normal text-white rounded-r-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </form>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-normal"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {filteredDecks.map((deck) => (
          <li
            key={deck.id}
            className="flex justify-between px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer text-tertiary-normal"
            onClick={() => handleSelectDeck(deck.id)}
          >
            <div className="flex flex-col">
              <span>{deck.name}</span>
              <span className="text-xs">({deck.cards.length} Tarjetas)</span>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button onClick={(e) => handleSendDeck(e, deck.id)}>
                <Send className="w-5 h-5" />
              </button>
              <button onClick={(e) => handleRemoveDeck(e, deck.id)}>
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {searchTerm.trim() !== "" && matchingCards.length > 0 && (
        <div className="mt-4 space-y-4">
          <h3 className="text-xl font-semibold text-tertiary-normal">
            Tarjetas coincidentes
          </h3>
          {matchingCards.map(({ deckId, cards }) => (
            <div
              key={deckId}
              className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
            >
              <h4 className="font-medium text-tertiary-normal mb-2">
                {decks.find((deck) => deck.id === deckId)?.name}
              </h4>
              <ul className="space-y-2">
                {cards.map((card, index) => (
                  <li key={index} className="bg-gray-50 p-2 rounded">
                    <p className="font-medium">P: {card.question}</p>
                    <p className="text-sm text-gray-600">R: {card.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
