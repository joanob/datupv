import { useState, createContext } from "react";
import AuthForm from "./AuthForm";
import AdminNewsList from "../../features/Editor/News/NewsList";
import { Routes, Route, Link } from "react-router-dom";
import NewsEditor from "../../features/Editor/News/NewsEditor";
import AdminPagesList from "../../features/Editor/Pages/PagesList";
import PagesEditor from "../../features/Editor/Pages/PagesEditor";

export const AuthTokenContext = createContext("");

const EditorPage = () => {
  const [token, setToken] = useState("");

  if (token === "") {
    return <AuthForm setToken={setToken} />;
  }

  return (
    <AuthTokenContext.Provider value={token}>
      <main className="main">
        <h2>Admin</h2>
        <nav>
          <Link to="/editor/noticias">Noticias</Link>
          <Link to="/editor/paginas">Paginas</Link>
        </nav>
        <Routes>
          <Route path="noticias" element={<AdminNewsList />} />
          <Route path="noticias/:id" element={<NewsEditor />} />
          <Route path="paginas" element={<AdminPagesList />} />
          <Route path="paginas/:id" element={<PagesEditor />} />
        </Routes>
      </main>
    </AuthTokenContext.Provider>
  );
};

export default EditorPage;
