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

app.get("/bouh", (req, res) => {
  res.send("<h1>Bouh</h1>");
});


app.listen(port, () => {
  console.log(`Backend lancé sur http://localhost:${port}`);
});
