import { textParser } from "../../../helpers/textParser";

interface Props {
  text: string;
}

const TextSection = ({ text }: Props) => {
  return textParser(text);
};

export default TextSection;
