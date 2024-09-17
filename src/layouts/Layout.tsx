import logoCard from "@/assets/logocard.svg";
import { useAppSelector } from "@/hooks/hooks";
import { selectDecks } from "@/store/slices/deckSlice";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {

  const decks = useAppSelector(selectDecks);

  useEffect(() => {
    localStorage.setItem("flashcardDecks", JSON.stringify(decks));
  }, [decks]);

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-secondary-normal flex flex-row gap-2">
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="flex flex-row gap-1">
            <img src={logoCard} alt="logo" className="w-8" />
            <h1 className="text-2xl font-bold text-white">Flash Cards</h1>
          </Link>
        </div>
      </header>
      <main className="p-2 flex flex-col items-center flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
