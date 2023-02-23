import { useState, createContext } from "react";
import AuthForm from "../../features/Admin/AuthForm";
import AdminNewsList from "../../features/Admin/News/NewsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AuthTokenContext = createContext("");

const EditorPage = () => {
  const [token, setToken] = useState("");

  if (token === "") {
    return <AuthForm setToken={setToken} />;
  }

  // TODO: navigation
  return (
    <AuthTokenContext.Provider value={token}>
      <main className="main">
        <h2>Admin</h2>
        <nav></nav>
        <Routes>
          <Route path="noticias" element={<AdminNewsList />} />
          <Route path="noticias/:id}">Editor noticias</Route>
          <Route path="paginas">Lista paginas</Route>
          <Route path="paginas/:id"></Route>
        </Routes>
      </main>
      {/* <main className="main">
        <h2>Admin</h2>
        <AdminNewsList />
      </main> */}
    </AuthTokenContext.Provider>
  );
};

export default EditorPage;
