const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

app.get("/connection", (req, res) => {
  const User = req.query.username;
  const Password = req.query.password;

  fs.readFile("../src/JSON/user.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture de 'user.json' :", err);
      return res.status(500).send("Erreur lors de la lecture de fichier");
    }
    const users = JSON.parse(data);
    const utilisateur = users[User];

    if (!utilisateur) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    if (utilisateur.mdp !== Password) {
      res.status(401).send("Mot de passe incorrect");
      return;
    }

    const infoAEnvoyer = {
      nom: utilisateur.nom,
      mail: utilisateur.mail,
      admin: utilisateur.admin,
    };

    res.status(200).json({
      [User]: infoAEnvoyer,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur backend !");
});

app.listen(port, () => {
  console.log(`Backend lancé sur http://localhost:${port}`);
});
