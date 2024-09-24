import { useAppSelector } from "@/hooks/hooks";
import { selectDecks } from "@/store/slices/deckSlice";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeckExporter = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const decks = useAppSelector(selectDecks);
  const deck = useMemo(
    () => decks.find((deck) => deck.id === Number(deckId)),
    [decks, deckId]
  );
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const loadDeck = () => {
      try {
        if (!deck) {
          throw new Error("No se encontró el deck especificado");
        }
        setStatus("ready");
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Ocurrió un error desconocido"
        );
      }
    };

    loadDeck();
  }, [deckId, deck]);

  const handleExport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!deck) return;

    const deckJson = JSON.stringify(deck);
    const encodedDeck = encodeURIComponent(deckJson);
    const baseUrl = window.location.origin;
    const importUrl = `${baseUrl}/import/${encodedDeck}`;
    console.log(importUrl);

    const whatsappMessage = encodeURIComponent(
      `¡Hola! Te comparto este deck de flashcards: ${deck.name}. Puedes importarlo usando este enlace: ${importUrl}`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        className="max-w-md mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-2 py-4">
      <h2 className="text-2xl font-bold text-tertiary-normal text-center">
        Exportar Deck:
      </h2>
      <form className="space-y-4" onSubmit={handleExport}>
        <h3 className="text-xl font-bold text-tertiary-normal">{deck?.name}</h3>
        <div className="space-y-2">
          <label
            className="block text-gray-700 text-sm"
            htmlFor="whatsapp-number"
          >
            Número de WhatsApp (con código de país)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="whatsapp-number"
            type="tel"
            placeholder="Ej: 573182900467"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
        </div>
        <div
          className="bg-secondary-lightest border-t border-b border-secondary-dark text-secondary-dark px-4 py-3"
          role="alert"
        >
          <p className="font-bold">Información</p>
          <p className="text-sm">
            Se generará un enlace para compartir este deck. El receptor podrá
            importarlo directamente en su aplicación.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-secondary-normal text-white hover:bg-secondary-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-secondary-normal focus:ring-offset-2 transform active:scale-95 transition-transform duration-300"
            disabled={!whatsappNumber}
          >
            Compartir por WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckExporter;
