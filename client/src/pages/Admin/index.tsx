import axios from "axios";
import { useState } from "react";
import { baseURL } from "../../services/config";

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState("");

  const handleDownload = () => {
    axios
      .post(
        baseURL + "/api/backup/download",
        {
          adminAuthKey: adminKey,
        },
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        const now = new Date();
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "data-" +
            now.getFullYear() +
            "-" +
            (now.getMonth() + 1) +
            "-" +
            now.getDate() +
            "-" +
            now.getHours() +
            "-" +
            now.getMinutes() +
            "-" +
            now.getSeconds() +
            ".db"
        );
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <main className="main">
      <h2>Admin</h2>
      <input
        type="text"
        value={adminKey}
        onChange={(e) => {
          setAdminKey(e.target.value);
        }}
        placeholder="Admin Key"
      />
      <button onClick={handleDownload}>Download</button>
    </main>
  );
};

export default AdminPage;
