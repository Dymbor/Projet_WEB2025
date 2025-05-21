import React, { useState } from "react";
import "../css/connection.css";

function Inscription() {
  const [user, setUser] = useState(""); //variable charger du nom d'utilisateur
  const [password, setPassword] = useState(""); //variable pour le mot de passe

  const appelServeurConnection = () => {
    const url = `http://localhost:3001/connection?username=${user}&password=${password}`; //URL de l'API
    console.log("Appel de l'API");
    console.log("Nom d'utilisateur:", user);
    console.log("Mot de passe:", password);
    console.log("URL de l'API:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la tentative de connexion");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse du serveur:", data);
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
      });
  };

  return (
    <div className="connection">
      <section id="FormConnection">
        <label>
          Nom d'utilisateur:
          <input
            placeholder="Entrer votre nom d'utilisateur"
            name="Username"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </label>

        <label>
          Mot de passe:
          <input
            name="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button onClick={appelServeurConnection}>Continuer</button>
      </section>
      <p>Pas de compte ?</p>
      <a href="/inscription">S'inscrire</a>
      {user && (
        <p>
          Bienvenue {user.nom} (
          {user.admin ? "admin" : "utilisateur"})
        </p>
      )}
    </div>
  );
}

export default Inscription;
