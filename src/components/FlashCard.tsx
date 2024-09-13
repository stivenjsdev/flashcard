import { Card } from "@/types";
import { useEffect, useState } from "react";

type FlashcardProps = {
  card: Card;
  cardKey: number;
};

const FlashCard = ({ card, cardKey }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [cardKey]);

  return (
    <div className="w-64 h-40 [perspective:1000px]" onClick={handleClick}>
      <div
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute w-full h-full bg-yellow-100 flex items-center justify-center p-4 text-center border border-gray-200 rounded-lg shadow-md [backface-visibility:hidden]">
          <p className="text-lg font-semibold text-gray-800">{card.pregunta}</p>
        </div>
        <div className="absolute w-full h-full flex items-center justify-center p-4 text-center bg-yellow-100 border border-gray-200 rounded-lg shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-lg text-gray-800">{card.respuesta}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
