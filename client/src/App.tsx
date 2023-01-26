import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AdminPage from "./pages/Admin";

const App = () => {
  return (
    <BrowserRouter basename="/datupv">
      <Header />
      <Routes>
        {import.meta.env.BASE_URL}
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
