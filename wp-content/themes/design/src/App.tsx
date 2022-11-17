import { BrowserRouter, Routes, Route } from "react-router-dom";
import { nav } from "./data/nav";
import Header from "./layout/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Header nav={nav} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <footer className="footer"></footer>
    </BrowserRouter>
  );
};

export default App;
