import React from "react";

import "./themeToggle.css";

interface Props {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// https://codepen.io/alvarotrigo/pen/oNoJePo

const ThemeToggle = ({ theme, toggleTheme }: Props) => {
  return (
    <div className="toggle-container" onClick={toggleTheme}>
      <div className="button r" id="button-4">
        <input type="checkbox" className="checkbox" />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default ThemeToggle;
