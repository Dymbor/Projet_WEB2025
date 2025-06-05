import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/accueil";
import Inscription from "./pages/inscription.jsx";
import Articles from "./pages/articles";
import Detail from "./pages/detail_article.tsx";
import Add from "./pages/add.jsx"
import Panier from "./pages/panier.tsx";
import './css/index.css';
import Connection from "./pages/connection";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/connection" element={<Connection />}></Route>
          <Route path="/inscription" element={<Inscription />}></Route>
          <Route path="/articles" element={<Articles />} />
          <Route path="/produit/:name" element={<Detail />} />
          <Route path="/add" element={<Add />} />
          <Route path="/panier" element={<Panier />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
