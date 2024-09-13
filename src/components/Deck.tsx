import { useDeck } from "@/hooks/useDeck";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import FlashCardList from "./FlashCardList";

const Deck = () => {
  const { id } = useParams();

  const {
    state: { decks },
    dispatch,
  } = useDeck();
  const deck = useMemo(
    () => decks.find((deck) => deck.id === Number(id)),
    [decks, id]
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newQuestion.trim() && newAnswer.trim()) {
      // const updatedCards = [...cards, { id: Date.now(), question: newQuestion.trim(), answer: newAnswer.trim() }]
      if (!deck) return;
      const newCards = [
        ...deck.cards,
        {
          id: Date.now(),
          question: newQuestion.trim(),
          answer: newAnswer.trim(),
        },
      ];
      const updatedDeck = { ...deck, cards: newCards };
      dispatch({ type: "UPDATE_DECK", payload: { updatedDeck } });

      setNewQuestion("");
      setNewAnswer("");
    }
  };

  // const onBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4 gap-1">
        {/* <button
          onClick={onBack}
          className="rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ArrowLeft className="w-4 h-4 mt-1 text-tertiary-normal" />
        </button> */}
        <h2 className="text-2xl font-bold text-tertiary-normal">
          {deck?.name}
        </h2>
      </div>
      <form className="mb-4 space-y-2" onSubmit={handleAddCard}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Nueva pregunta"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-normal"
        />
        <input
          type="text"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Nueva respuesta"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-normal"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-secondary-normal text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2 flex items-center justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Añadir Tarjeta
        </button>
      </form>
      {/* FlashCardList */}
      {deck ? (
        deck.cards.length === 0 ? (
          <p>No hay tarjetas</p>
        ) : (
          <FlashCardList cards={deck.cards} />
        )
      ) : null}
    </div>
  );
};

export default Deck;
