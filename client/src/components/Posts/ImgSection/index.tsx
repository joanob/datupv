import { useState, useEffect } from "react";
import { useContainerSize } from "../../../hooks/useContainerSize";
import { Image } from "../../../types";

import "./imgsection.css";

interface Props {
  image: Image;
}

const MAX_HEIGHT = 300;

const ImgSection = ({ image }: Props) => {
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
    <section ref={ref} className="img-container">
      <div style={{ width: imgWidth === 0 ? "100%" : imgWidth + "px" }}>
        <img
          src={image.url}
          className="img"
          onLoad={() => {
            setImgLoaded(true);
          }}
        />
      </div>
    </section>
  );
};

export default ImgSection;
