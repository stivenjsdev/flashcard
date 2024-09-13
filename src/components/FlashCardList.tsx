import FlashCard from "@/components/FlashCard";
import { Card } from "@/types";
import { useState } from "react";

type FlashCardListProps = {
  cards: Card[];
};

const FlashCardList = ({ cards }: FlashCardListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"right" | "left" | null>(null);

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection("left");
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection("right");
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden flex items-center justify-center">
        <div
          className={`transition-transform duration-300 ease-in-out ${
            direction === "left"
              ? "-translate-x-full"
              : direction === "right"
              ? "translate-x-full"
              : ""
          }`}
          onTransitionEnd={() => setDirection(null)}
        >
          <FlashCard card={cards[currentIndex]} />
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Anterior
        </button>
        <span className="text-lg font-semibold">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default FlashCardList;
