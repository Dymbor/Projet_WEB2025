import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/detail.css'


function Detail() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [panier, setPanier] = useState([]);
    const [item, setItem] = useState(null);
    const [error, setError] = useState(false);

    //Prend les informations des articles dans le serveur
    useEffect(() => {
        fetch('http://localhost:3001/articles')
            .then(response => response.json())
            .then(data => {
                //Trouve si le nom de l'article dans le json est égale à celui recherché
                const foundItem = data.find(p => p.name === name);
                if (foundItem) {
                    // met l'item aux informations 
                    setItem(foundItem);
                } else {
                    // met l'erreur à true
                    setError(true);
                }
            })
            .catch(() => {
                // met l'erreur à true
                setError(true);
            });
    }, [name]);

    //Affiche la page détail article erreur s'il ne trouve pas le bon item donc erreur=true
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

    //Affiche la page détail article  chargement s'il n'a pas encore trouvé le bon item
    if (!item) {
        return (
            <div className="erreur">
                <div className="fond">
                    <h1>Chargement...</h1>
                </div>
            </div>
        );
    }

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

    //Affiche la page détail article si tous ce passe bien
    return (
        <div className="detail">
            <div className="fond">
                <div className="retour">
                    <img className="image" src={item.img}></img>
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