import { FormEvent, useEffect, useState } from "react";
import { sendContactMsg } from "../../services/contactService";

import "./styles.scss";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //const [token, setToken] = useState("");
  const [cookiesConsent, setcookiesConsent] = useState<boolean>(false);
  const [acceptsPrivacyPolice, setAcceptsPrivacyPolice] = useState(false)

  useEffect(() => {
    const storedCookiesConsent = localStorage.getItem("cookiesConsent");
    if (storedCookiesConsent === "true") {
      setcookiesConsent(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* if (!cookiesConsent) {
      toast.error("Debes aceptar las cookies")
      return;
    } */

    if (name === "" || email === "" || message === "") {
      toast.error("Los campos no pueden estar vacíos")
      return;
    }

    /* if (token === "") {
      toast.error("Completa el captcha para continuar");
      return 
    } */

    if (!acceptsPrivacyPolice) {
      toast.error("Acepta la política de privacidad")
      return
    }

    sendContactMsg(name, email, message, "token")
      .then(() => {
        toast.success("Se ha enviado tu mensaje");
        setName("")
        setEmail("")
        setMessage("")
        //setToken("")
        setAcceptsPrivacyPolice(false)
      })
      .catch(() => {
        toast.error("No se pudo enviar tu mensaje");
      });
  };

  return (
    <main className="main">
      <h2>Contacto</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Nombre</label>
        <input
          type="text"
          id="contact-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Nombre"
        />
        <label htmlFor="contact-email">Email</label>
        <input
          type="email"
          id="contact-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          value={message}
          id="contact-message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Mensaje"
        />
        {/* {!cookiesConsent ? (
          <div className="cookie-container">
            <p>
              Utilizamos cookies de terceros para evitar bots en este
              formulario.
            </p>
            <button
              onClick={() => {
                localStorage.setItem("cookiesConsent", "true");
                setcookiesConsent(true);
              }}
            >
              Aceptar
            </button>
          </div>
        ) : null */}
        <label className="privacy" htmlFor="contact-privacy">
          <input type="checkbox" name="privacy-policy" id="contact-privacy" checked={acceptsPrivacyPolice} onChange={(e) => { setAcceptsPrivacyPolice(e.target.checked) }} /> Acepto la <Link to="/politica-privacidad" target="__blank">política de privacidad</Link>
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </main>
  );
};

export default Contact;
