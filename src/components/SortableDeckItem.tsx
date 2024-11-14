import { Deck } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Send, Trash2 } from "lucide-react";

type SortableDeckItemProps = {
  deck: Deck;
  handleSelectDeck: (deckId: number) => void;
  handleSendDeck: (
    e: React.MouseEvent<HTMLButtonElement>,
    deckId: number
  ) => void;
  handleRemoveDeck: (
    e: React.MouseEvent<HTMLButtonElement>,
    deckId: number
  ) => void;
};

export default function SortableDeckItem({
  deck,
  handleSelectDeck,
  handleSendDeck,
  handleRemoveDeck,
}: SortableDeckItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: deck.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: "white",
    cursor: "grab",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
  );
}
