import { NavLink } from "../../../types";
import NavItem from "../NavItems/NavItem";
import NavItemWithSubitems from "../NavItems/NavItemWithSubitems";

import "./styles.scss";

import instagramSVG from "../../../public/icons/instagram.svg";
import twitterSVG from "../../../public/icons/twitter.svg";

interface Props {
  nav: NavLink[];
}

const Navbar = ({ nav }: Props) => {
  return (
    <ul className="nav nav-desktop">
      {nav.map((navlink) =>
        navlink.subenlaces ? (
          <NavItemWithSubitems key={navlink.url} navlink={navlink} navbarCollapsable={false} />
        ) : (
          <NavItem key={navlink.url} navLink={navlink} />
        )
      )}
      <li className="nav-link nav-link-social">
        <a href="https://www.instagram.com/datupv" target="_blank">
          <img src={instagramSVG} alt="Síguenos en Instagram" />
        </a>
      </li>
      <li className="nav-link nav-link-social">
        <a href="https://twitter.com/datupv" target="_blank">
          <img src={twitterSVG} alt="Síguenos en Twitter" />
        </a>
      </li>
    </ul>
  );
};

export default Navbar;
