import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import { FormEvent, useState } from "react";

import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: not empty and errors

    if (token === "") {
      return;
    }

    // TODO: show modal on success
    axios.post("http://localhost:1337/api/contact-forms", {
      data: {
        name,
        email,
        message,
        token,
      },
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
        <input type="submit" value="Enviar" />
      </form>
    </main>
  );
};

export default Contact;
