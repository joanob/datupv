import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AdminPage from "./pages/Admin";

import "./app.css";
import NotFound from "./pages/NotFound";
import NewsArticle from "./pages/NewsArticle";

const App = () => {
  return (
    <BrowserRouter basename="/datupv">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias/:id" element={<NewsArticle />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
