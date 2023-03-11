import { NavLink } from "../../../types";
import NavItem from "../NavItems/NavItem";
import NavItemWithSubitems from "../NavItems/NavItemWithSubitems";

import instagramSVG from "../../../public/icons/instagram.svg";
import twitterSVG from "../../../public/icons/twitter.svg";

interface Props {
  nav: NavLink[];
  visible: boolean;
}

const Navbar = ({ nav, visible }: Props) => {
  return (
    <ul
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="nav nav-desktop"
    >
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
