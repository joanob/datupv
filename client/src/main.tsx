import React from "react";
import ReactDOM from "react-dom/client";
import NavContextWrapper from "./NavContext";
import Router from "./Router";

import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NavContextWrapper>
      <Router />
    </NavContextWrapper>
  </React.StrictMode>
);
