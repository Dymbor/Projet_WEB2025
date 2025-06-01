import "../css/acceuil.css";
import Clothes from "./clothes.png";
const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
const nom = utilisateur && Object.values(utilisateur)[0]?.nom;
const Acceuil = () => {
  return (
    <div className="Acceuil">
      <h2>Bienvenue {nom} !</h2>
      <div className="Article">
        <img className="clothes" src={Clothes} alt="Clothes" />
        <div className="text">
          <h1>Qui sommes-nous ?</h1>
          <p>
            Alisen est une entreprise de e-commerce dédiée à la promotion de
            l'artisanat et de la durabilité. Nous nous engageons à offrir des
            produits uniques, fabriqués à la main avec soin, tout en respectant
            des pratiques éthiques et responsables. Chaque article est conçu à
            partir de matériaux soigneusement sélectionnés, en privilégiant des
            fournisseurs locaux et des méthodes de production respectueuses de
            l'environnement. Nous croyons en la beauté du fait main et du
            durable, offrant à nos clients non seulement des produits de
            qualité, mais aussi une véritable histoire et un impact positif sur
            la planète. Alisen incarne une alternative consciente aux modèles de
            consommation traditionnels, en combinant créativité artisanale et
            engagement écologique.
          </p>
          <p>
            Notre mission est de rendre accessible un mode de consommation plus
            respectueux, tout en soutenant les artisans locaux et en contribuant
            à un avenir plus vert et plus équitable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Acceuil;
