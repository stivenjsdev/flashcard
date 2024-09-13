import Layout from "@/layouts/Layout";
import DeckPage from "@/pages/DeckPage";
import IndexPage from "@/pages/IndexPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/:id" element={<DeckPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
