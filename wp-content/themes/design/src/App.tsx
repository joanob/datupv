import { BrowserRouter, Routes, Route } from "react-router-dom";
import { nav } from "./data/nav";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter basename="/datupv">
      <Header nav={nav} />
      <Routes>
        {import.meta.env.BASE_URL}
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
