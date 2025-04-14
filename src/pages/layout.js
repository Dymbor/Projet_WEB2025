import { Outlet, Link } from "react-router-dom";
import logo from './logo_Alisen.png';
import '../css/layout.css';

const Layout = () => {
  return (
    <>
    <div className="Layout">
            <header className="All-header">
                <a className="Alisen-logo" href='/'><img src={logo} alt="logo" /></a>
                <div className='list-link'>
                    <Link to="/">Home</Link>
                    <Link to="/">Achat</Link>
                    <Link to="/">Panier</Link>
                    <Link to="/">Se connecter</Link>
                </div>
            </header>
        </div>
      <Outlet />
      <div className='Footer'>
            <div className='list'>
                <p>Nos conditions générales</p>
                <p>Mentions légales</p>
                <p>Conditions des offres et promotions</p>
                <p>Politique de confidentialité</p>
                <p>Gérer mes préférences</p>
                <p>Information marketplace</p>
            </div>
            <p>Alisen 2025 @  Tous droits réservés</p>
        </div>
    </>
  )
};

export default Layout;