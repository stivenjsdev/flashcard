import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  addCard,
  selectDecks,
  swapQuestionAndAnswer,
  updateCard,
} from "@/store/slices/deckSlice";
import { Card } from "@/types";
import { PlusCircle, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import FlashCardList from "./FlashCardList";

const Deck = () => {
  const { id } = useParams();

  const decks = useAppSelector(selectDecks);
  const dispatch = useAppDispatch();

  const deck = useMemo(
    () => decks.find((deck) => deck.id === Number(id)),
    [decks, id]
  );

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newQuestion.trim() && newAnswer.trim()) {
      // const updatedCards = [...cards, { id: Date.now(), question: newQuestion.trim(), answer: newAnswer.trim() }]
      if (!deck) return;
      if (editingCard) {
        // Update card
        dispatch(
          updateCard({
            updatedCard: {
              ...editingCard,
              question: newQuestion,
              answer: newAnswer,
            },
            deckId: deck.id,
          })
        );
        setEditingCard(null);
      } else {
        // Add new card
        dispatch(
          addCard({
            newCard: {
              id: Date.now(),
              question: newQuestion,
              answer: newAnswer,
            },
            deckId: deck.id,
          })
        );
      }

      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setNewQuestion(card.question);
    setNewAnswer(card.answer);
  };

  const handleSwapCard = () => {
    if (!deck) return;
    if (editingCard) {
      setEditingCard(null);
      setNewQuestion("");
      setNewAnswer("");
    }
    dispatch(swapQuestionAndAnswer({ deckId: deck.id }));
  };

  // const onBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="w-full max-w-md mx-auto py-4">
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
      <form className="mb-4 space-y-2" onSubmit={handleSubmit}>
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
          {editingCard ? "Actualizar" : "Añadir"} Tarjeta
        </button>
      </form>

      {/* Swap Button */}
      <button
        className="w-full px-4 py-2 bg-accent-normal text-white rounded-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-normal focus:ring-offset-2 flex items-center justify-center mb-2"
        onClick={handleSwapCard}
      >
        <RefreshCcw className="w-5 h-5 text-white mr-2" />
        Intercambiar Pregunta y Respuesta
      </button>

      {/* FlashCardList */}
      {deck ? (
        deck.cards.length === 0 ? (
          <p>No hay tarjetas</p>
        ) : (
          <FlashCardList cards={deck.cards} handleEditCard={handleEditCard} />
        )
      ) : null}
    </div>
  );
};

export default Deck;
