import { useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../../NavContext";

import { useTheme } from "../Theme/useTheme";
import { useHeaderWidth } from "./useHeaderWidth";

import logoTransparent from "../../../public/icons/logoTransparent.png";

import ThemeToggle from "../Theme/ThemeToggle";

import NavbarCollapsable from "../Navbar/NavbarCollapsable";
import Navbar from "../Navbar/NavbarDesktop";

import "./styles.scss";

export const Header = () => {
  const nav = useContext(NavContext);
  const containerRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLElement>(null);

  const { loading, collapse } = useHeaderWidth(containerRef, elementRef);

  const { theme, toggleTheme } = useTheme();

  return (
    <header ref={containerRef} className="header">
      <div className="header-left-container">
        <div className="logo">
          <Link to="/">
            <img src={logoTransparent} alt="Logo de la delegación" />
          </Link>
        </div>
      </div>
      {nav.length === 0 ? null : loading || !collapse ? (
        <nav className="header-desktop-right-container" ref={elementRef}>
          <Navbar nav={nav} visible={!loading} />
          {loading ? null : (
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          )}
        </nav>
      ) : (
        <NavbarCollapsable nav={nav} theme={theme} toggleTheme={toggleTheme} />
      )}
    </header>
  );
};
