import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  addDeck,
  clearFavorites,
  removeDeck,
  selectDecks,
  selectFavorites,
  updateDeckOrder,
} from "@/store/slices/deckSlice";
import { Card, Deck } from "@/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove, // Función para mover elementos dentro de un arreglo
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusCircle, Send, Trash, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SortableDeckItem from "./SortableDeckItem";

export default function Component() {
  // Obtiene el estado global de 'decks' y 'favorites' utilizando selectores personalizados.
  const decks = useAppSelector(selectDecks);
  const favorites = useAppSelector(selectFavorites);
  // Define el dispatcher para enviar acciones a Redux.
  const dispatch = useAppDispatch();

  // Hook de React Router para redirigir entre rutas.
  const navigate = useNavigate();

  // Estado local para manejar el nombre del nuevo deck.
  const [newDeckName, setNewDeckName] = useState("");
  // Estado local para manejar el término de búsqueda ingresado.
  const [searchTerm, setSearchTerm] = useState("");
  // Estado local para almacenar tarjetas coincidentes basadas en la búsqueda.
  const [matchingCards, setMatchingCards] = useState<
    { deckId: number; cards: Card[] }[]
  >([]);

  // Estado local para manejar el ID del elemento que está siendo arrastrado.
  const [activeId, setActiveId] = useState<string | number | null>(null);
  // Configuración de sensores para el arrastre con mouse y touch.
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 500, tolerance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 }, // 250ms de retraso y 5px de tolerancia para evitar activación de seleccionador de texto en dispositivos táctiles
    })
  );

  // Memoriza el deck activo que se está arrastrando utilizando el estado 'activeId'.
  const activeDeck = useMemo(
    () => decks.find((deck) => deck.id === activeId),
    [decks, activeId]
  );

  // Efecto que actualiza las tarjetas coincidentes cuando cambian el término de búsqueda o los decks.
  useEffect(() => {
    setMatchingCards([]);
    filterDecks(searchTerm, decks);
  }, [searchTerm, decks]);

  // Maneja el inicio del arrastre, estableciendo el ID activo.
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  // Maneja el fin del arrastre y actualiza el orden de los decks en el estado global.
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null); // Resetea el id activo después del arrastre
    const { active, over } = event; // Extrae los objetos arrastrado y sobre el que se suelta
    if (over && active.id !== over.id) {
      const oldIndex = decks.findIndex((deck) => deck.id === active.id);
      const newIndex = decks.findIndex((deck) => deck.id === over.id);
      const newDecks = arrayMove(decks, oldIndex, newIndex); // Reordena los decks.
      dispatch(updateDeckOrder({ orderedDeck: newDecks })); // Actualiza el orden de los decks en el estado
    }
  };

  // Filtra los decks basándose en el término de búsqueda. (se esta utilizando en el useEffect)
  const filterDecks = (term: string, decks: Deck[]) => {
    const filteredDecks = decks.filter((deck) => {
      // Verifica si el nombre del deck coincide con el término de búsqueda.
      const matchInDeckName = deck.name
        .toLowerCase()
        .includes(term.toLowerCase().trim());
      // Filtra las tarjetas dentro del deck que coincidan con el término de búsqueda.
      const matchingCardsInDeck = deck.cards.filter(
        (card) =>
          card.question.toLowerCase().includes(term.toLowerCase().trim()) ||
          card.answer.toLowerCase().includes(term.toLowerCase().trim())
      );
      // Si hay tarjetas coincidentes, se actualiza el estado.
      if (matchingCardsInDeck.length > 0) {
        setMatchingCards((prev) => [
          ...prev,
          { deckId: deck.id, cards: matchingCardsInDeck },
        ]);
      }
      return matchInDeckName || matchingCardsInDeck.length > 0;
    });
    return filteredDecks; // Devuelve los decks que coinciden. (actualmente no se esta utilizando)
  };

  const handleAddDeck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newDeckName.trim()) {
      dispatch(addDeck({ name: newDeckName }));
      setNewDeckName("");
    }
  };

  // Redirige a la página del deck seleccionado.
  const handleSelectDeck = (deckId: number) => {
    navigate(`/deck/${deckId}`);
  };

  const handleRemoveDeck = (
    event: React.MouseEvent<HTMLButtonElement>,
    deckId: number
  ) => {
    event.stopPropagation();
    dispatch(removeDeck({ deckId }));
  };

  const handleSendDeck = (
    event: React.MouseEvent<HTMLButtonElement>,
    deckId: number
  ) => {
    event.stopPropagation();
    navigate(`/export/${deckId}`);
  };

  // Limpia la lista de decks favoritos.
  const handleClearFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(clearFavorites());
  };

  // Limpia el término de búsqueda y las tarjetas coincidentes.
  const clearSearch = () => {
    setSearchTerm("");
    setMatchingCards([]);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Add Deck Form  */}
      <form className="flex" onSubmit={handleAddDeck}>
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="Nuevo Grupo de Tarjetas (Deck)..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary-normal"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-secondary-normal text-white rounded-r-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </form>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-normal"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Favorites Deck */}
      {favorites.cards.length > -1 && ( // todo: change to 0
        <>
          <h2 className="text-2xl font-bold text-tertiary-normal">Favorites</h2>
          <div
            key={favorites.id}
            className="flex justify-between px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer text-tertiary-normal"
            onClick={() => handleSelectDeck(favorites.id)}
          >
            <div className="flex flex-col">
              <span>{favorites.name}</span>
              <span className="text-xs">
                ({favorites.cards.length} Tarjetas)
              </span>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button onClick={handleClearFavorites}>
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Matching Cards */}
      {searchTerm.trim() !== "" && matchingCards.length > 0 && (
        <div className="mt-4 space-y-4">
          <h3 className="text-2xl font-bold text-tertiary-normal">
            Tarjetas Coincidentes
          </h3>
          {matchingCards.map(({ deckId, cards }) => (
            <div
              key={deckId}
              className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
            >
              <h4 className="font-medium text-tertiary-normal mb-2">
                {decks.find((deck) => deck.id === deckId)?.name}
              </h4>
              <ul className="space-y-2">
                {cards.map((card, index) => (
                  <li key={index} className="bg-gray-50 p-2 rounded">
                    <p className="font-medium">P: {card.question}</p>
                    <p className="text-sm text-gray-600">R: {card.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Deck List */}
      <h2 className="text-2xl font-bold text-tertiary-normal">
        Flash Cards Decks
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter} // Estrategia para detectar colisiones basada en la cercanía al centro del elemento
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Contexto de ordenamiento utilizando una estrategia de lista vertical */}
        <SortableContext
          items={decks} // lista de ids, o lista de obj s con una propiedad id
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {decks.map((deck) => (
              <SortableDeckItem
                key={deck.id}
                deck={deck}
                handleSelectDeck={handleSelectDeck}
                handleSendDeck={handleSendDeck}
                handleRemoveDeck={handleRemoveDeck}
              />
            ))}
          </ul>
        </SortableContext>

        {/* Superposición que se muestra mientras un elemento está siendo arrastrado */}
        <DragOverlay>
          {/* Verifica si hay un deck activo durante el arrastre */}
          {activeDeck ? (
            // Muestra el deck activo en la superposición (con sus mismos estilos)
            <div className="flex justify-between px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer text-tertiary-normal">
              <div className="flex flex-col">
                <span>{activeDeck.name}</span>
                <span className="text-xs">
                  ({activeDeck.cards.length} Tarjetas)
                </span>
              </div>
              <div className="flex justify-center items-center gap-3">
                <button>
                  <Send className="w-5 h-5" />
                </button>
                <button>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : null}
          {/* Si no hay un deck activo, no se muestra nada */}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
