import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/accueil";
import Inscription from "./pages/connection";
// import Blogs from "./Blogs";
// import Appli from "./App";
// import NoPage from "./NoPage";
import Articles from "./pages/articles";
import Detail from "./pages/detail_article.tsx";
// import Panier from "./pages/Panier";
// import Connexion from "./pages/Connexion";
import './css/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="connection" element={<Inscription />}></Route>
          {/*<Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Appli />} />
          <Route path="*" element={<NoPage />} /> */}
          <Route path="/articles" element={<Articles />}/>
          <Route path="/produit/:name" element={<Detail />} />
          {/* <Route path="panier" element={<Panier />} />*/ }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
