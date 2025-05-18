import '../css/articles.css';
import { useEffect, useState } from "react";
import data from"../JSON/list_articles.json";
import {useNavigate } from 'react-router-dom';

const Articles = () => {
  const [items, setItems]=useState([]);

  useEffect(()=> {
    setItems(data);
  },[]);

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    
    setItems(newItems);
  };

  const addItem = () => {
    const newItem = { id: items.length + 1, name: `Item ${items.length + 1}` };
    setItems([...items, newItem]);
  };

  const navigate=useNavigate();

  return(
    <div className='Articles'>
      {items.map((item) => (
        <div key={item.id} className="mini">
         <div className="test">
            <img src={item.img}></img>
            <h1>{item.name}</h1>
            <h2>{item.price}€</h2>
            <p>{item.description}</p>
            <button onClick={()=> navigate(`/produit/${item.name}`)}>Voir plus</button>
            </div>
        </div>
      ))}
      {/* <button onClick={() => deleteItem(item.id)}>Delete</button>
      <button onClick={addItem}>Add Item</button> */}
    </div>
);
}

export default Articles;