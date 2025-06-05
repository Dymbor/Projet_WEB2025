import { Outlet, Link } from "react-router-dom";
import logo from './logo_Alisen.png';
import '../css/layout.css';

//Affiche l'Entête et le footer
const Layout = () => {
  return (
    <div className="Layout_Footer">
      <div className="Layout">
        <header className="All-header">
          <a className="Alisen-logo" to='/'><img src={logo} alt="logo" /></a>
          <div className='list-link'>
            <Link to='/'>Home</Link>
            <Link to='/articles'>Achat</Link>
            <Link to="/panier">Panier</Link>
            <Link to="/connection">Se connecter</Link>
          </div>
        </header>
      </div>
      {/* Le outlet est remplacé par la page inséré dans index.js*/}
      <Outlet />
      <div className='Footer'>
        <div className='list'>
          <p>Nos conditions générales</p>
          <p>Mentions légales</p>
          <p>Conditions des offres <br></br> et promotions</p>
          <p>Politique de confidentialité</p>
          <p>Gérer mes préférences</p>
          <p>Information marketplace</p>
        </div>
        <p>Alisen 2025 @  Tous droits réservés</p>
      </div>
    </div>
  )
};

export default Layout;