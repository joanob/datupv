import { textParser } from "../../../helpers/textParser";

interface Props {
  text: string;
}

const TextSection = ({ text }: Props) => {
  return <p>{textParser(text)}</p>;
};

export default TextSection;
