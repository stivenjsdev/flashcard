import { useAppDispatch } from "@/hooks/hooks";
import { importDeck } from "@/store/slices/deckSlice";
import { Card, Deck } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeckImporter = () => {
  const { data } = useParams<{ data: string }>();
  const [importedDeck, setImportedDeck] = useState<Deck | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const importDeck = () => {
      try {
        if (!data) {
          throw new Error("No se proporcionaron datos JSON");
        }

        const decodedData = decodeURIComponent(data);
        const newImportedDeck: Deck = JSON.parse(decodedData);
        console.log(newImportedDeck);

        // Validar la estructura de los datos
        if (!isValidDeck(newImportedDeck)) {
          throw new Error("El formato de los datos JSON no es válido");
        }

        // set deck importado
        setImportedDeck(newImportedDeck);

        setStatus("success");
        setMessage(
          `Se cargaron ${newImportedDeck.cards.length} tarjetas del deck ${newImportedDeck.name} correctamente`
        );
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Ocurrió un error desconocido"
        );
      }
    };

    importDeck();
  }, [data]);

  const isValidDeck = (deck: Deck): boolean => {
    return (
      typeof deck.id === "number" &&
      typeof deck.name === "string" &&
      Array.isArray(deck.cards) &&
      deck.cards.every(
        (card: Card) =>
          typeof card.question === "string" && typeof card.answer === "string"
      )
    );
  };

  const handleContinue = () => {
    if (!importedDeck) return;
    dispatch(importDeck({ deck: importedDeck }));
    navigate("/");
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4 text-tertiary-normal">
        Importador de Decks
      </h2>
      <div className="mb-4">
        {status === "loading" && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <span className="ml-2">Importando decks...</span>
          </div>
        )}
        {status === "success" && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        {status === "error" && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{message}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={handleContinue}
          disabled={status === "loading"}
          className={`bg-secondary-normal text-white hover:bg-secondary-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2 transform active:scale-95 transition-transform duration-300 ${
            status === "loading" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Importar y Continuar
        </button>
      </div>
    </div>
  );
};

export default DeckImporter;
