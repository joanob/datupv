import { useState, useEffect } from "react";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { Image } from "../../../types";

import "./imgwithtextsection.css";

interface Props {
  image: Image;
  text: string;
  alignment: "texto-izquierda" | "texto-derecha";
}

const MAX_HEIGHT = 300;

const ImgWithTextSection = ({ image, text, alignment }: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { ref, width, height } = useContainerSize(imgLoaded);
  const [imgWidth, setImgWidth] = useState(0);

  useEffect(() => {
    const imgFullHeight = (image.height / image.width) * width;
    if (imgFullHeight > MAX_HEIGHT) {
      setImgWidth((image.width / image.height) * MAX_HEIGHT);
    }
  }, [width]);

  return (
    <section className="image-with-text">
      {alignment === "texto-izquierda" ? <p>{text}</p> : null}
      <div ref={ref} className="img-container">
        <div style={{ width: imgWidth === 0 ? "100%" : imgWidth + "px" }}>
          <img
            src={image.url}
            className="img"
            onLoad={() => {
              setImgLoaded(true);
            }}
          />
        </div>
      </div>
      {alignment === "texto-derecha" ? <p>{text}</p> : null}
    </section>
  );
};

export default ImgWithTextSection;
