import { Link } from "react-router-dom";
import { linkParser } from "../../../helpers/linkParser";

import "./textsection.css";

interface Props {
  text: string;
}

const TextSection = ({ text }: Props) => {
  return (
    <p>
      {linkParser(text).map((section, i) => {
        if (section.texto !== undefined) {
          if (section.link !== undefined) {
            return (
              <Link key={i} to={section.link}>
                {section.texto}
              </Link>
            );
          }
          return (
            <a key={i} href={section.url}>
              {section.texto}
            </a>
          );
        }
        return <span key={i}>{section}</span>;
      })}
    </p>
  );
};

export default TextSection;
