import { useState, createContext } from "react";
import AuthForm from "../../features/Admin/AuthForm";
import AdminNewsList from "../../features/Admin/News/NewsList";
import { Routes, Route, Link } from "react-router-dom";
import NewsEditor from "../../features/Admin/News/NewsEditor";

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
          <Route path="noticias/:id" element={<NewsEditor />} />
          <Route path="noticias" element={<AdminNewsList />} />
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
