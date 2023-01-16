import logoWhite from "../../public/icons/logoWhiteTransparent.png";
import telecoWhite from "../../public/icons/telecoWhiteTransparent.png";
import upvWhite from "../../public/icons/upvWhiteTransparent.png";
import instagramSVG from "../../public/icons/instagram.svg";
import twitterSVG from "../../public/icons/twitter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <div>
          <a href="https://www.instagram.com/datupv" target="_blank">
            <img src={instagramSVG} alt="Síguenos en Instagram" />
          </a>
        </div>
        <div>
          <a href="https://twitter.com/datupv" target="_blank">
            <img src={twitterSVG} alt="Síguenos en Twitter" />
          </a>
        </div>
      </div>
      <div>
        <p>Edificio 4D, primera planta. Camino de Vera, s/n. 46022 Valencia</p>
      </div>
      {/* CONTACTO */}
      <div className="footer-logo">
        <img className="dat" src={logoWhite} alt="Logo de la delegación" />
        <img className="etsit" src={telecoWhite} alt="Logo de la ETSIT" />
        <img className="upv" src={upvWhite} alt="Logo de la UPV" />
      </div>
      <div>&copy; 2023 DATUPV</div>
    </footer>
  );
};

export default Footer;
