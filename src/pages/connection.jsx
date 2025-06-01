import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/connection.css";

function Connection() {
  const [user, setUser] = useState(""); //variable charger du nom d'utilisateur
  const [password, setPassword] = useState(""); //variable pour le mot de passe
  const [erreur, setErreur] = useState(""); //variable qui stocke l'erreur pour afficher le message sous le bouton lors de la connexion
  const [utilisateur, setUtilisateur] = useState(() => {
    const UtilisateurConnecte = localStorage.getItem("utilisateur");
    return UtilisateurConnecte ? JSON.parse(UtilisateurConnecte) : null;
  });
  const navigate = useNavigate();

  const appelServeurConnection = () => {
    const url = `http://localhost:3001/connection?username=${user}&password=${password}`; //On assemble l'URL à appeler pour l'API
    console.log("Appel de l'API");
    console.log("Nom d'utilisateur:", user);
    console.log("Mot de passe:", password);
    console.log("URL de l'API:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404 || response.status === 401) {
            throw new Error("Nom d'utilisateur ou mot de passe incorrect");
          } else {
            throw new Error("Erreur de connexion");
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse du serveur:", data);
        setUtilisateur(data);
        localStorage.setItem("utilisateur", JSON.stringify(data));
        setErreur("");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
        setErreur(error.message);
        setPassword("");
      });
  };

  return (
    <div className="connection">
      <section id="FormConnection">
        {utilisateur ? (
          <>
            <h1>
              Vous êtes déjà connecté en tant que{" "}
              {Object.values(utilisateur)[0]?.nom}
            </h1>
            {Object.values(utilisateur)[0]?.admin ? (
              <h2>Niveau : Admin</h2>
            ) : (
              <h2> Niveau : Utilisateur</h2>
            )}
            <button className="button"
              onClick={() => {
                localStorage.removeItem("utilisateur");
                setUtilisateur(null);
                navigate(0);
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <h1>Se connecter</h1>

            <label id="Username">
              Nom d'utilisateur:
              <input
                name="Username"
                value={user}
                onChange={(event) => setUser(event.target.value)}
              />
            </label>

            <label id="Password">
              Mot de passe:
              <input
                type="password"
                name="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button className="button" onClick={appelServeurConnection}>Continuer</button>
            {erreur ? <p style={{ color: "red" }}>{erreur}</p> : null}
            <hr />
            <p>Pas de compte ?</p>
            <a href="/inscription">S'inscrire</a>
          </>
        )}
      </section>
    </div>
  );
}

export default Connection;
