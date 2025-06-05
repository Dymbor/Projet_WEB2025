import "../css/articles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const [items, setItems] = useState([]);
  const [panier, setPanier] = useState([]);
  const [utilisateur, setUtilisateur] = useState(() => {
    const UtilisateurConnecte = localStorage.getItem("utilisateur");
    return UtilisateurConnecte ? JSON.parse(UtilisateurConnecte) : null;
  });


  //Prend les informations des articles dans le serveur
  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);


  //Supprime les articles dont l'id=celui mis en argument
  const supprimerProduit = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/suppression/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data.message);
      // Filtre les Items et garde les items qui n'ont pas le même id que celui demandé
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  //Ajoute un Article dans le localStorage nommé "panier"
  const ajouterPanier = (item) => {
    try {
      const panSauv = localStorage.getItem("panier");
      if (panSauv) {
        //Si panier existant ajout de l'article
        const panier = JSON.parse(panSauv);
        panier.push(item);
        localStorage.setItem("panier", JSON.stringify(panier));
        setPanier(panier);
        console.log("ajout");
      } else {
        //creation d'un nouveau panier et ajout de l'article
        const nouveauPanier = [item];
        localStorage.setItem("panier", JSON.stringify(nouveauPanier));
        setPanier(nouveauPanier);
        console.log("ajout+nouveau");
      }
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
    }
    alert("Produit ajouté au panier");
  };

  const navigate = useNavigate();

  //Affiche la page article
  return (
    <div className="All">
      {utilisateur && Object.values(utilisateur)[0]?.admin ? (
        <button onClick={() => navigate("/add")}>Ajouter un article</button>
      ) : null}
      <div className="Articles">
        {/* Parcours le tableau d'item et affiche les informations demandés */}
        {items.map((item) => (
          <div key={item.id} className="mini">
            <div className="test">
              <img src={item.img} className="img"></img>
              <h1>{item.name}</h1>
              <h2>{item.price}€</h2>
              <p>{item.description}</p>
              <button onClick={() => navigate(`/produit/${item.name}`)}>
                Voir plus
              </button>
              <button onClick={() => ajouterPanier(item)}>Acheter</button>
              {utilisateur && Object.values(utilisateur)[0]?.admin ? (
                <button onClick={() => supprimerProduit(item.id)}>
                  Supprimer
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
