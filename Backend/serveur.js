const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

app.get("/connection", (req, res) => {
  fs.readFile("../src/JSON/user.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture de 'user.json' :",err);
      return;
    }
    const User= JSON.parse(data);
    res.send(User);
  });
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur backend !");
});

app.get("/articles", (req, res) => {
  fs.readFile("../src/JSON/list_articles.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture de 'articles.json' :",err);
      return;
    }
    const Articles= JSON.parse(data);
    res.send(Articles);
  });
});


app.listen(port, () => {
  console.log(`Backend lancé sur http://localhost:${port}`);
});
