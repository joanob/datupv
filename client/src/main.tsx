import React from "react";
import ReactDOM from "react-dom/client";
import NavContextWrapper from "./NavContext";
import Router from "./Router";
import { Toaster } from "react-hot-toast";

import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NavContextWrapper>
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      <Router />
    </NavContextWrapper>
  </React.StrictMode>
);
