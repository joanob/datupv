import React from "react";
import ReactDOM from "react-dom/client";
import NavContextWrapper from "./NavContext";
import Router from "./Router";
import { Toaster } from "react-hot-toast";

import "./styles/styles.scss";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NavContextWrapper>
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      {/* <Router /> */}
      <Home />
    </NavContextWrapper>
  </React.StrictMode>
);
