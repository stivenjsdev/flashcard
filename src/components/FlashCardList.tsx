import FlashCard from "@/components/FlashCard";
import { Deck } from "@/types";
import { useEffect, useState } from "react";

type FlashCardListProps = {
  cards: Deck["cards"];
};

const FlashCardList = ({ cards }: FlashCardListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"right" | "left" | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsVisible(false);
      setDirection("left");
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 150);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setIsVisible(false);
      setDirection("right");
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 150);
    }
  };

  useEffect(() => {
    if (direction !== null) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setDirection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, direction]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2">
      {/* FlashCard */}
      <div className="w-full relative overflow-hidden flex items-center justify-center p-2">
        <div
          className={`transition-transform duration-300 ease-in-out ${
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
      {/* Options menu */}
      <div className="w-full flex justify-between items-center">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-secondary-normal text-white rounded disabled:bg-gray-300 transition-all duration-200 ease-in-out hover:bg-secondary-dark active:bg-secondary-darkest disabled:hover:bg-gray-300"
        >
          Anterior
        </button>
        <span className="text-lg font-semibold">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className="px-4 py-2 bg-secondary-normal text-white rounded disabled:bg-gray-300 transition-all duration-200 ease-in-out hover:bg-secondary-dark active:bg-secondary-darkest disabled:hover:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default FlashCardList;
