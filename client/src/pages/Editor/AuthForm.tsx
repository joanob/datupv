import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../services/config";

interface Props {
  setToken: (token: string) => void;
}

const AuthForm = ({ setToken }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Save localStorage and retrieve FOR TESTING PURPOSES

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios.post(baseURL + "/admin/login", { email, password }).then((res) => {
      localStorage.setItem("adminToken", res.data.data.token);
      setToken(res.data.data.token);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <input type="submit" value="Iniciar sesión" />
    </form>
  );
};

export default AuthForm;
