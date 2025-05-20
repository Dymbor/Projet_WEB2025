const express = require("express");
const fs = require("fs");
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors());
app.use(express.json());

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

app.get("/articles.json", (req, res) => {
  fs.readFile("../src/JSON/list_articles.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture de 'articles.json' :",err);
            return res.status(500).json({ error: 'Erreur lecture fichier' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.delete("/suppression/:id", (req, res)=>{
  const idToDelete = parseInt(req.params.id);

  fs.readFile("../src/JSON/list_articles.json", "utf8", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lecture fichier' });
    }

    let produits = JSON.parse(jsonData);
    const updated = produits.filter(p => p.id !== idToDelete);

    fs.writeFile("../src/JSON/list_articles.json", JSON.stringify(updated, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Erreur écriture fichier' });
      }
      res.json({ message: `Produit ${idToDelete} supprimé` });
    });
  });
});

app.listen(port, () => {
  console.log(`Backend lancé sur http://localhost:${port}`);
});
