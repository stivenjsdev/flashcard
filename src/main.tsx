import AppRouter from "@/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { DeckProvider } from "./context/DeckContext";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
