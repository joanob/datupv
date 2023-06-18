import logoWhite from "../../public/icons/logoWhiteTransparent.png";
import telecoWhite from "../../public/icons/telecoWhiteTransparent.png";
import upvWhite from "../../public/icons/upvWhiteTransparent.png";
import instagramWhiteSVG from "../../public/icons/instagram-white.svg";
import twitterWhiteSVG from "../../public/icons/twitter-white.svg";

import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <div>
          <a href="https://www.instagram.com/datupv" target="_blank">
            <img src={instagramWhiteSVG} alt="Síguenos en Instagram" />
          </a>
        </div>
        <div>
          <a href="https://twitter.com/datupv" target="_blank">
            <img src={twitterWhiteSVG} alt="Síguenos en Twitter" />
          </a>
        </div>
      </div>
      <div>Edificio 4D, 1ª planta. Camino de Vera, s/n. 46022 Valencia</div>
      {/* CONTACTO */}
      <div className="footer-logo">
        <img className="dat" src={logoWhite} alt="Logo de la delegación" />
        <img className="etsit" src={telecoWhite} alt="Logo de la ETSIT" />
        <img className="upv" src={upvWhite} alt="Logo de la UPV" />
      </div>
      <div>
        <a
          href={
            import.meta.env.VITE_CLIENT_URL + "/politica-privacidad"
          }
        >
          Política de privacidad
        </a>
      </div>
      <div>&copy; 2023 DATUPV</div>
      <div>Hecho con &#10084; por <a href="https://instagram.com/ob.joan" target="__blank">Joan Oltra Blasco</a></div>
    </footer>
  );
};

export default Footer;
