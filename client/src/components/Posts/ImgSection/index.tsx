import { Image } from "../../../types";

import "./imgsection.css";

interface Props {
  image: Image;
}

// TODO: limit image height if image is vertical

const ImgSection = ({ image }: Props) => {
  return (
    <section className="img-container">
      <img src={image.url} className="img" />
    </section>
  );
};

export default ImgSection;
