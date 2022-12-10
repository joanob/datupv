import { Link } from "react-router-dom";
import { NavLink } from "../../types";

interface Props {
  navLink: NavLink;
}

const NavItem = ({ navLink }: Props) => {
  return (
    <li className="nav-link">
      <Link to={navLink.url}>{navLink.text}</Link>
    </li>
  );
};

export default NavItem;
