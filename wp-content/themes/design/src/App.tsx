import { HashRouter, Routes, Route } from "react-router-dom";
import { nav } from "./data/nav";
import Header from "./layout/Header";
import Home from "./pages/Home";

const App = () => {
  console.log(import.meta.env.BASE_URL);

  return (
    <HashRouter basename={import.meta.env.BASE_URL}>
      <Header nav={nav} />
      <Routes>
        {import.meta.env.BASE_URL}
        <Route path="/" element={<Home />} />
      </Routes>
      <footer className="footer"></footer>
    </HashRouter>
  );
};

export default App;
