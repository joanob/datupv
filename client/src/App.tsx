import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AdminPage from "./pages/Admin";

import "./app.css";
import NotFound from "./pages/NotFound";
import NewsArticle from "./pages/NewsArticle";
import Router from "./Router";
import NavContextWrapper from "./NavContext";

const App = () => {
  return (
    <NavContextWrapper>
      <BrowserRouter basename="/datupv">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticias/:id" element={<NewsArticle />} />
          <Route path="/actividades" element={<NotFound />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Router />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </NavContextWrapper>
  );
};

export default App;
