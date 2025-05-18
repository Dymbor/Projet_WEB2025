# Projet_WEB2025
Bievenue sur Alisen, projet de première année de:
- Gwennaëlle Airo-Farulla (github: https://github.com/Edwin659)
- Ethan Fontaine (github: https://github.com/Dymbor)
- Doryan Lecoadou (github: https://github.com/Scoubyx)

# Figma
https://www.figma.com/design/aXInCeNVQ5t4znS2dLEhWc/Untitled?node-id=0-1&t=aHxBtYPU4KcCl8Ks-1

# Cadrage du Projet
https://yncrea-my.sharepoint.com/:w:/g/personal/ethan_fontaine_isen_yncrea_fr/Ef3wrTgiG2NNuIEh2e0PmLcBNZkhPoOmr-9z3i-zpW7rYA?e=mxdZuV

# Diagramme de Gant
https://1drv.ms/x/c/443525efde2adbbf/EZBDeCgiNR9IvcsxvIdh1LUBxEThRAA_Xj5BP0wAU7vOjA?e=fRjnuV

# Installation
Avant de pouvoir lancer le site il vous faut exéctuer plusieur commande:
* ```npm i -D react-router-dom```
* ```npm i -D react-router-dom@latest```
* ```npm install```

Une fois ses trois commande exéctué vous êtes prêt a lancer le site:
* ```npm start```

puis dans un nouveau terminal déplacer vous vers le dossier Backend 
* ```cd Backend```
* ```node serveur.js```

# Explication

## Serveur express
### Utilité
Le serveur express est la pour faire la liaison entre react et le JSON pour pouvoir se connecter ajouter des articles etc...

### Fonctionnement
Une fois démarrer le serveur est en écoute sur les adresses codés dans ```serveur.js``` 
Par exemple lorsqu'une requête est envoyé sur ```/connection``` le serveur renvoie sous la forme de JSON le fichier ```User.js```. 
Pour ce faire on vas chercher le fichier grâce à:
```js
fs.readFile("Destination", "utf8", (err, data))
```
A ce moment, si le serveur rencontre un problème en voulant récupérer le fichier une erreur est renvoyé et afficher dans la console, sinon une constante récupere le fichier (sous forme de texte), il est ensuite converti par la commande:
```js
const Variable= JSON.parse(data);
```

### Liste actuelle des accès au serveur
* ```/``` : chemin par défaut, envoie juste le texte "Bienvenue sur le serveur backend
* ```/connection?username=...&password=...``` : renvoie une tentative de connection à l'utilisateur 'username' et renvoie un code, suivi du fichier JSON de l'utilisateur s'il existe et que le mot de passe est correct

### Code de réponse du serveur
- `500` : Echec de lecture du fichier
- `404` : Utilisateur inconnue
- `401` : Mot de passe incorrect
- `200` : Connection réussi

Dans le cas de l'envoie d'un code `200` le serveur enverra aussi sous forme de JSON le fichier demander


## JSON 
### User.json
Fichier JSON qui contient la liste de tout les utilisateur du site sous la forme
```JSON
{
    "Pseudo":{
        "nom":"nom",
        "mail":"adrresse@mail.utilisateur",
        "mdp":"motDePasse",
        "admin":true // False 
    },
}
```

* Pseudo: nom sous le quel l'utilisateur sera affiché
* nom: chaine de caractère nom qui permet à l'utilisateur de se connecter
* mail: chaine de caractère adresse mail de l'utilisateur
* mdp: chaine de caractère mot de passe de l'utilisateur
* admin: booléen qui permet de connaitre les privilège de l'utilisateur

### list_articles.json
Fichier JSON qui contient la liste de tout les articles du site sous la forme
```JSON
[
 {
      "id":"number",
      "img":"images/name.png",
      "name": "name",
      "description": "Description",
      "price": number
      
    }
]
```

* id: Identifiant de l'articles
* img: lien public de l'images de l'articles
* name: chaine de caractère du nom
* description: chaine de caractère description de l'article
* price: nombre pour le prx

## Module

### Inscription.js
