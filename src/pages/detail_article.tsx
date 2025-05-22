// import { useParams, useNavigate } from 'react-router-dom';
// import '../css/detail.css'

// function Detail() {
//   const { name } = useParams();
//   const data = fetch('http://localhost:3001/articles.json')


//   const item = data.find(p=>p.name === name);
//   const navigate = useNavigate(); 

//   if (!item){
//     return(
//       <div className="erreur">
//         <div className="fond">
//           <h1>Erreur</h1>
//           <h2>Produit introuvable</h2>
//         </div>
//       </div>
//     );
//   };.

//   return (
//     <div className="detail">
//       <div className="fond">
//         <div className="retour">
//           <img src={item.img}></img>
//           <div className="all">
//             <h1>{name}</h1>
//             <h3>{item.price}€</h3>
//             <p>{item.description}</p>
//             <button>Acheter</button>
//           </div>
//         </div>
//         <button onClick={()=> navigate(`/articles`)}>Retourner à la page article</button>
//       </div>
//     </div>
//   );
// };

// export default Detail;