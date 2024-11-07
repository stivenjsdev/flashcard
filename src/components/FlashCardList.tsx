import FlashCard from "@/components/FlashCard";
import { Card, Deck } from "@/types";
import { ChevronLeft, ChevronRight, Pencil, Star, StarOff } from "lucide-react";
import { useEffect, useState } from "react";

type FlashCardListProps = {
  isFavorites: boolean;
  cards: Deck["cards"];
  handleEditCard: (card: Card) => void;
  handleRemoveFromFavorites: (cardId: Card["id"]) => void;
  handleAddToFavorites: (card: Card) => void;
};

const FlashCardList = ({
  cards,
  handleEditCard,
  handleRemoveFromFavorites,
  handleAddToFavorites,
  isFavorites,
}: FlashCardListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"right" | "left" | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsVisible(false);
      setDirection("left");
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 120);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setIsVisible(false);
      setDirection("right");
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 120);
    }
  };

  useEffect(() => {
    if (direction !== null) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setDirection(null);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, direction]);

  const handleRemove = (cardId: Card["id"]) => {
    handleRemoveFromFavorites(cardId);
    if (currentIndex === cards.length - 1) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2 py-2">
      {/* Remove from Favorites or Edit Button with Add to Favorites */}
      {isFavorites ? (
        <button
          className="w-full px-4 py-2 text-white rounded-md bg-tertiary-normal transform active:scale-75 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-tertiary-normal focus:ring-offset-2 flex items-center justify-center"
          onClick={() => handleRemove(cards[currentIndex].id)}
          aria-label="Editar tarjeta"
        >
          <StarOff className="w-5 h-5 text-white mr-2" />
          Eliminar de Favoritos
        </button>
      ) : (
        <>
          <button
            className="w-full px-4 py-2 text-white rounded-md bg-tertiary-normal transform active:scale-75 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-tertiary-normal focus:ring-offset-2 flex items-center justify-center"
            onClick={() => handleEditCard(cards[currentIndex])}
            aria-label="Editar tarjeta"
          >
            <Pencil className="w-5 h-5 text-white mr-2" />
            Editar Tarjeta
          </button>
          <button
            className="w-full px-4 py-2 text-white rounded-md bg-primary-normal transform active:scale-75 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-tertiary-normal focus:ring-offset-2 flex items-center justify-center"
            onClick={() => handleAddToFavorites(cards[currentIndex])}
            aria-label="Editar tarjeta"
          >
            <Star className="w-5 h-5 text-white mr-2" />
            Agregar a Favoritos
          </button>
        </>
      )}

      {/* FlashCard Container */}
      <div className="w-full relative flex items-center justify-center">
        {/* Previous button */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="absolute left-0 z-10 w-7 h-52 rounded-lg flex items-center justify-center bg-secondary-normal text-white disabled:bg-gray-300 hover:bg-secondary-dark active:bg-secondary-darkest disabled:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2 transition-colors duration-200"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* FlashCard */}
        <div className="w-full relative overflow-hidden flex items-center justify-center p-2">
          <div
            className={`transition-transform duration-150 ease-in-out ${
              direction === "left"
                ? "-translate-x-full"
                : direction === "right"
                ? "translate-x-full"
                : ""
            }`}
          >
            <FlashCard
              card={cards[currentIndex]}
              cardKey={currentIndex}
              isVisible={isVisible}
            />
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className="absolute right-0 z-10 w-7 h-52 rounded-lg flex items-center justify-center bg-secondary-normal text-white disabled:bg-gray-300 hover:bg-secondary-dark active:bg-secondary-darkest disabled:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2 transition-colors duration-200"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Card counter */}
      <div className="text-lg font-semibold text-tertiary-normal">
        {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
};

export default FlashCardList;
