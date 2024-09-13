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
  }
  // ... más tarjetas
];

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Flashcards</h1>
      <FlashCardList cards={cards} />
    </div>
  );
}

export default App;
