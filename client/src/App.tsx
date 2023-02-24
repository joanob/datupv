import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import EditorPage from "./pages/Editor";

import NewsArticle from "./pages/NewsArticle";
import Router from "./Router";
import NavContextWrapper from "./NavContext";
import Activities from "./pages/Activities";

const App = () => {
  return (
    <NavContextWrapper>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="noticias/:id" element={<NewsArticle />} />
          <Route path="actividades" element={<Activities />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="editor/*" element={<EditorPage />} />
          <Route path="*" element={<Router />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </NavContextWrapper>
  );
};

export default App;
