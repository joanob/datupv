import { useEffect, useState } from "react";
import { NavLink } from "../../../types";
import NavItem from "../NavItems/NavItem";
import NavItemWithSubitems from "../NavItems/NavItemWithSubitems";

import instagramSVG from "../../../public/icons/instagram.svg";
import twitterSVG from "../../../public/icons/twitter.svg";
import { useLocation } from "react-router-dom";
import ThemeToggle from "../Theme/ThemeToggle";

import "./styles.scss";

interface Props {
  nav: NavLink[];
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const NavbarCollapsable = ({ nav, theme, toggleTheme }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastLocation, setLastLocation] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== lastLocation) {
      setLastLocation(location.pathname);
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="header-right-container">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div
          className={isOpen ? "nav-toggle nav-toggle-open" : "nav-toggle"}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {!isOpen ? null : (
        <ul className="nav">
          {nav.map((navlink) =>
            navlink.subenlaces ? (
              <NavItemWithSubitems key={navlink.url} navlink={navlink} />
            ) : (
              <NavItem key={navlink.url} navLink={navlink} />
            )
          )}
          <li className="nav-link nav-link-social">
            <a href="https://www.instagram.com/datupv" target="_blank">
              <img src={instagramSVG} alt="Síguenos en Instagram" />
            </a>
            <a href="https://twitter.com/datupv" target="_blank">
              <img src={twitterSVG} alt="Síguenos en Twitter" />
            </a>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavbarCollapsable;
