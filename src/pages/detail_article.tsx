import { useParams, useNavigate } from 'react-router-dom';
import data from"../JSON/list_articles.json";
import '../css/detail.css'




function Detail() {
  const { name } = useParams();
  const item = data.find(p=>p.name === name);
  const navigate = useNavigate(); 

  if (!item){
    return(
      <div className="erreur">
        <h1>Erreur</h1>
        <h2>Produit introuvable</h2>
      </div>
    );
  };

  return (
    <div className="detail">
      <img src={item.img}></img>
      <div className="all">
        <h1>{name}</h1>
        <h3>{item.price}€</h3>
        <p>{item.description}</p>
        <button>Acheter</button>
        <button onClick={()=> navigate(`/articles`)}>Retourner à la page article</button>
      </div>
    </div>
  );
};

export default Detail;