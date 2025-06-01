import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/detail.css'


function Detail() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [panier, setPanier] = useState([]);
    const [item, setItem] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/articles')
            .then(response => response.json())
            .then(data => {
                const foundItem = data.find(p => p.name === name);
                if (foundItem) {
                    setItem(foundItem);
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, [name]);

    if (error) {
        return (
            <div className="erreur">
                <div className="fond">
                    <h1>Erreur</h1>
                    <h2>Produit introuvable</h2>
                </div>
            </div>
        );
    };

    if (!item) {
        return (
            <div className="erreur">
                <div className="fond">
                    <h1>Chargement...</h1>
                </div>
            </div>
        );
    }

    const ajouterPanier = (item) => {
        try {
            const panSauv = localStorage.getItem("panier");
            if (panSauv) {
                const panier = JSON.parse(panSauv);
                panier.push(item);
                localStorage.setItem("panier", JSON.stringify(panier));
                setPanier(panier);
                console.log("ajout");
            } else {
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


    return (
        <div className="detail">
            <div className="fond">
                <div className="retour">
                    <img src={item.img}></img>
                    <div className="Tout">
                        <h1>{name}</h1>
                        <h3>{item.price}€</h3>
                        <p>{item.description}</p>
                        <button onClick={() => ajouterPanier(item)}>Acheter</button>
                    </div>
                </div>
                <button onClick={() => navigate(`/articles`)}>Retourner à la page article</button>
            </div>
        </div>
    );
};

export default Detail;