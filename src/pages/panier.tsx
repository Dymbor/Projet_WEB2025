import "../css/panier.css"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Panier() {
    const navigate = useNavigate();
    const [panier, setPanier] = useState([]);

    //Accède au localStorage du panier et le charge
    useEffect(() => {
        try {
            const panSauv = localStorage.getItem("panier");
            if (panSauv) {
                const panier = JSON.parse(panSauv);
                setPanier(panier);
                console.log(panier);
            }
        } catch (error) {
            console.error("Erreur lors du chargement du panier :", error);
        }
    }, []);

    //Supprime un article du localStorage du panier
    const supprimerArticle = (id) => {
        const newPanier = panier.filter((p) => p.id !== id);
        setPanier(newPanier);
        localStorage.setItem("panier", JSON.stringify(newPanier));
    }

    //Supprime le localStorage du panier
    const supprimerPanier1 = () => {
        localStorage.removeItem("panier");
        console.log("je supprime tout");
        setPanier([]);
    }

    //Calcul le prix total des éléments du panier
    const totalFloat = panier.reduce((acc, item) => {
        const prix = parseFloat(item.price);
        return acc + (isNaN(prix) ? 0 : prix);
    }, 0);

    const total =(totalFloat).toFixed(2);

    //Affiche la page panier
    return (
        <div className="Panier">
            <h1>Panier</h1>
            <div className="all">
                <div className="article">
                    <h3>Liste des Articles dans le panier</h3>
                    <div className="test">
                        {panier.length === 0 ? (
                            <p>Votre panier est vide.</p>
                        ) : (
                            <ul>
                                {panier.map((item) => (
                                    <li key={item.id}>
                                        {item.name} - {item.price} €
                                        <button onClick={() => supprimerArticle(item.id)}>Supprimer</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button onClick={() => supprimerPanier1()}>Supprimer tout le panier</button>
                    </div>
                </div>
                <div className="Total">
                    <h3>Total à payer</h3>
                    <p>{total}€</p>
                    <button>Payer</button>
                </div>
            </div>
            <button onClick={() => navigate(`/articles`)}>Retourner à la page article</button>
        </div >

    );

}
export default Panier;