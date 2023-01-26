import axios from "axios";
import { baseURL } from "./config";

export const sendContactMsg = (
  name: string,
  email: string,
  message: string,
  token: string
) => {
  return axios.post(baseURL + "/api/contact-forms", {
    data: {
      name,
      email,
      message,
      token,
    },
  });
};
