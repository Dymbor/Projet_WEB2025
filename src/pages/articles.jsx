import '../css/articles.css';
import { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';

const Articles = () => {
  const [items, setItems]=useState([]);

  useEffect(()=> {
    fetch('http://localhost:3001/articles')
      .then(res => res.json())
      .then(data => setItems(data));
  },[]);

  const supprimerProduit = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/suppression/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    console.log(data.message);
    setItems((prev)=> prev.filter((p)=> p.id !==id));
  } catch (error) {
    console.error("Erreur :", error);
  }
};

  const navigate=useNavigate();

  return(
    <div className='All'>
      <button onClick={()=> navigate('/add')}>Ajouter un article</button>
      <div className='Articles'>
        {items.map((item) => (
          <div key={item.id} className="mini">
            <div className="test">
                <img src={item.img}></img>
                <h1>{item.name}</h1>
                <h2>{item.price}€</h2>
                <p>{item.description}</p>
                <button onClick={()=> navigate(`/produit/${item.name}`)}>Voir plus</button>
                <button>Acheter</button>
                <button onClick={() => supprimerProduit(item.id)}>Supprimer</button>
              </div>
          </div>
        ))}
      </div>
    </div>
);
}

export default Articles;