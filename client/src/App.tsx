import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter basename="/datupv">
      <Header />
      <Routes>
        {import.meta.env.BASE_URL}
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
