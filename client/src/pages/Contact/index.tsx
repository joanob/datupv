import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";
import { FormEvent, useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token === "") {
      return;
    }

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <textarea
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
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
      <input type="submit" />
    </form>
  );
};

export default Contact;
