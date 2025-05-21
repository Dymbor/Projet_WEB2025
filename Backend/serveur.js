const express = require("express");
const fs = require("fs");
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const port = 3001;

app.use(cors());
app.use(express.json());

// Configuration Multer pour stocker les images dans ../public/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images"));
    },
    filename: (req, file, cb) =>{
        const uniqueName = file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });
// Chemin du fichier JSON
const jsonPath = path.join(__dirname, "list_articles.json");

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

//Get : récupérer les articles
app.get("/articles", (req, res) => {
  const jsonPath = path.join(__dirname, "list_articles.json");
  if (fs.existsSync(jsonPath)) {
      const data = fs.readFileSync(jsonPath);
      res.json(JSON.parse(data));
    }else{
      console.error("Erreur lors de la lecture de 'articles.json'");
      return res.status(500).json({ error: 'Erreur lecture fichier' });
    }
});

//Delete : supprimer les articles
app.delete("/suppression/:id", (req, res) => { //Pouvoir supprimer les Articles
  const idToDelete = parseInt(req.params.id);

  const jsonPath = path.join(__dirname, "list_articles.json");

  fs.readFile(jsonPath, "utf8", (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lecture fichier' });
    }

    let produits = JSON.parse(jsonData);
    const updated = produits.filter(p => p.id !== idToDelete);

    fs.writeFile(jsonPath, JSON.stringify(updated, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Erreur écriture fichier' });
      }
      res.json({ message: `Produit ${idToDelete} supprimé` });
    });
  });
});

// POST : ajoute un article + image
app.post("/articles", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file;

  if (!name || !price || !description) {
    return res.status(400).json({ error: "Champs manquants." });
  }

  // Charger l'ancien JSON
  let articles = [];
  if (fs.existsSync(jsonPath)) {
    const data = fs.readFileSync(jsonPath, "utf-8");
    articles = JSON.parse(data);
  }

  const newArticle = {
    id: Date.now(),
    img: `../images/${image.filename}`,
    name,
    description,
    price,
  };

  articles.push(newArticle);

  //Ecrit dans le JSON
  fs.writeFileSync(jsonPath, JSON.stringify(articles, null, 2), "utf-8");

  res.status(201).json({ message: "Article ajouté", article: newArticle });
});

app.listen(port, () => {
  console.log(`Backend lancé sur http://localhost:${port}`);
});
