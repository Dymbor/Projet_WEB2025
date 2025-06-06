import React, { useState } from "react";
import "../css/inscription.css";
import { useNavigate } from "react-router-dom";

function Inscription() {
  const [user, setUser] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState(""); // pour afficher les erreurs
  const navigate = useNavigate();

  const appelServeurInscription = () => {
    console.log("Bouton clique");
    console.error("Lol non je rigole ca va tkt");
    console.warn("Attention à me dev quand meme");
    console.log(user);
    console.log(mail);
    console.log(password);

    if (!user || !mail || !password) {
      alert("Attention tout les champs sont obligatoire");
      return;
    }

    fetch("http://localhost:3001/inscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        mail: mail,
        password: password,
      }),
    })
      .then((data) => {
        if (data.status === 201) {
          setErreur(""); // pas d'erreur
          navigate("/connection");
        } else if (data.status === 409) {
          setErreur("Nom d'utilisateur non disponible.");
        } else {
          setErreur("Erreur lors de la création du compte.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
        setErreur("Une erreur s'est produite.");
      });
  };

  return (
    <div className="inscription">
      <section id="FormInscription">
        <h1>Inscription</h1>

        <label id="Username">
          Nom d'utilisateur:
          <input
            name="Username"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </label>

        <label id="Mail">
          Adresse mail:
          <input
            name="Mail"
            value={mail}
            onChange={(event) => setMail(event.target.value)}
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

        <button className="button" onClick={appelServeurInscription}>Continuer</button>
        {erreur ? <p style={{ color: "red" }}>{erreur}</p> : null}
        <hr />
        <p>Déja inscrit ?</p>
        <a href="/connection">Se connecter</a>
      </section>
    </div>
  );
}

export default Inscription;
