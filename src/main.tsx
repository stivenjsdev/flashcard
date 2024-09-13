import AppRouter from "@/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DeckProvider } from "./context/DeckContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeckProvider>
      <AppRouter />
    </DeckProvider>
  </StrictMode>
);
