import FlashCardList from "@/components/FlashCardList";

const cards = [
  { pregunta: "¿Cuál es la capital de España?", respuesta: "Madrid" },
  {
    pregunta: "¿Cuál es el océano más grande?",
    respuesta: "El Océano Pacífico",
  },
  {
    pregunta: "¿Cuál es el río más largo del mundo?",
    respuesta: "El río Amazonas",
  },
  {
    pregunta: "¿Cuál es el país más grande del mundo?",
    respuesta: "Rusia",
  },
  {
    pregunta: "¿Cuál es el país más poblado del mundo?",
    respuesta: "China",
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
        <FlashCardList cards={cards} />
      </main>
    </div>
  );
}

export default App;
