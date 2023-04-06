import HCaptcha from "@hcaptcha/react-hcaptcha";
import { FormEvent, useEffect, useState } from "react";
import { sendContactMsg } from "../../services/contactService";

import "./styles.scss";
import { Link } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [cookiesConsent, setcookiesConsent] = useState<boolean>(false);
  const [acceptsPrivacyPolice, setAcceptsPrivacyPolice] = useState(false)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedCookiesConsent = localStorage.getItem("cookiesConsent");
    if (storedCookiesConsent === "true") {
      setcookiesConsent(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("");

    if (!cookiesConsent) {
      setError("Debes aceptar las cookies")
      return;
    }

    if (name === "" || email === "" || message === "") {
      setError("Los campos no pueden estar vacíos");
      return;
    }

    if (token === "") {
      setError("Completa el captcha para continuar");
      return 
    } 

    if (!acceptsPrivacyPolice) {
      setError("Acepta la política de privacidad")
      return
    }

    sendContactMsg(name, email, message, token)
      .then(() => {
        setError("");
        setSuccess("Se ha enviado tu mensaje");
      })
      .catch(() => {
        setSuccess("")
        setError("No se pudo enviar tu mensaje");
      });
  };

  const submitDisable = name === "" || email === "" || message === "" || token === "" || !acceptsPrivacyPolice

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
        {!cookiesConsent ? (
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
        ) : (
            <HCaptcha
              sitekey="80b5a658-bb23-41e3-b979-e9153dc49546"
              onVerify={setToken}
              onError={() => {
                setToken("");
              }}
              onExpire={() => {
                setToken("");
              }}
            />
        )}
        <label className="privacy" htmlFor="contact-privacy">
          <input type="checkbox" name="privacy-policy" id="contact-privacy" checked={acceptsPrivacyPolice} onChange={(e) => {setAcceptsPrivacyPolice(e.target.checked)}}/> Acepto la <Link to="/politica-privacidad" target="__blank">política de privacidad</Link>
          </label>
          {error === "" ? null : <label className="error-label">{error}</label>}
        {success === "" ? null : (
          <label className="success-label">{success}</label>
        )}
        <input type="submit" value="Enviar" className={submitDisable ? "disabled" : ""} />
      </form>
    </main>
  );
};

export default Contact;
