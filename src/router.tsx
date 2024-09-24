import Layout from "@/layouts/Layout";
import DeckPage from "@/pages/DeckPage";
import IndexPage from "@/pages/IndexPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeckExporter from "./pages/DeckExporter";
import DeckImporter from "./pages/DeckImporter";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/deck/:id" element={<DeckPage />} />
          <Route path="/export/:deckId" element={<DeckExporter />} />
          <Route path="/import/:data" element={<DeckImporter />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
