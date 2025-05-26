import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/detail.css'

function Detail() {
    const { name } = useParams();
    const navigate = useNavigate();

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

    return (
        <div className="detail">
            <div className="fond">
                <div className="retour">
                    <img src={item.img}></img>
                    <div className="all">
                        <h1>{name}</h1>
                        <h3>{item.price}€</h3>
                        <p>{item.description}</p>
                        <button>Acheter</button>
                    </div>
                </div>
                <button onClick={() => navigate(`/articles`)}>Retourner à la page article</button>
            </div>
        </div>
    );
};

export default Detail;