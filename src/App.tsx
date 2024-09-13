import FlashCardList from "@/components/FlashCardList";
import FlashCardDecks from "./components/DeckList";

const cards = [
  {
    id: 1,
    question: "¿Cuál es la capital de España?",
    answer: "Madrid",
  },
  {
    id: 2,
    question: "¿Cuál es el océano más grande?",
    answer: "El Océano Pacífico",
  },
  {
    id: 3,
    question: "¿Cuál es el río más largo del mundo?",
    answer: "El río Amazonas",
  },
  {
    id: 4,
    question: "¿Cuál es el país más grande del mundo?",
    answer: "Rusia",
  },
  {
    id: 5,
    question: "¿Cuál es el país más poblado del mundo?",
    answer: "China",
  },
  // ... más tarjetas
];

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-primary-normal">
        <h1 className="text-2xl font-bold text-white">FlashCards</h1>
      </header>
      <main className="p-2 flex flex-col items-center justify-center flex-1">
        <FlashCardDecks />
        <FlashCardList cards={cards} />
      </main>
    </div>
  );
}

export default App;
