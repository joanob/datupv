import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { sendContactMsg } from "../../services/contactService";

import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [cookiesConsent, setcookiesConsent] = useState<boolean>(false);
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
      return;
    }

    if (name === "" || email === "" || message === "") {
      setError("Los campos no pueden estar vacíos");
      return;
    }

    if (token === "") {
      setError("Completa el captcha para continuar");
    }

    sendContactMsg(name, email, message, token)
      .then(() => {
        setError("");
        setSuccess("Se ha enviado tu mensaje");
      })
      .catch(() => {
        setError("No se pudo enviar tu mensaje");
      });
  };

  return (
    <main className="main">
      <h2>Contacto</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        {error === "" ? null : <label className="error-label">{error}</label>}
        {success === "" ? null : (
          <label className="success-label">{success}</label>
        )}
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
          <>
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
          </>
        )}
        <input type="submit" value="Enviar" disabled={!cookiesConsent} />
      </form>
    </main>
  );
};

export default Contact;
