# Projet_WEB2025
![Logo de Alisen](src/pages/logo_Alisen.png)

Bievenue sur Alisen, projet de première année de:
- [Gwennaëlle Airo-Farulla](https://github.com/Edwin659)
- [Ethan Fontaine](https://github.com/Dymbor)
- [Doryan Lecoadou](https://github.com/Scoubyx)

# Document
[Figma](https://www.figma.com/design/aXInCeNVQ5t4znS2dLEhWc/Untitled?node-id=0-1&t=aHxBtYPU4KcCl8Ks-1)

[Cadrage du Projet](https://yncrea-my.sharepoint.com/:w:/g/personal/ethan_fontaine_isen_yncrea_fr/Ef3wrTgiG2NNuIEh2e0PmLcBNZkhPoOmr-9z3i-zpW7rYA?e=mxdZuV)

[Diagramme de Gant](https://1drv.ms/x/c/443525efde2adbbf/EZBDeCgiNR9IvcsxvIdh1LUBxEThRAA_Xj5BP0wAU7vOjA?e=fRjnuV)

# Avancé

- [X] Mettre en place l'arboressence
- [X] Préparer le JSON
- [X] Faire les pages de frontend
- [X] Mettre en place une gestion d'image
- [X] Préparer le module TS
- [X] Mettre en place un système de connection/inscription
- [X] Faire la différence entre user et admin
- [X] Mettre en place l'API backend 
- [X] Lier l'API au Frontend
- [X] Commenter le code 

# Installation
Avant de pouvoir lancer le site il vous faut exéctuer plusieur commande:
* ```npm install```

Une fois les modules instalée vous êtes prêt a lancer le site:
* ```npm start```

Puis dans un nouveau terminal déplacer vous vers le dossier Backend 
* ```cd Backend```
* ```node serveur.js```

# Explication

## Serveur express
### Utilité
Le serveur express fait office d'API backend au site pour pouvoir modifier les JSON et envoyer des donnée utiles

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
* ```app.get("/")``` : chemin par défaut, envoie juste le texte "Bienvenue sur le serveur backend
* ```/connection?username=...&password=...``` : renvoie une tentative de connection à l'utilisateur 'username' et renvoie un code, suivi du fichier JSON de l'utilisateur s'il existe et que le mot de passe est correct
* `/inscription` :  rajoute s'il n'existe pas déja l'utilisateur envoyer par la page inscription dans le `user.json`
* `/articles` : renvoie la liste d'article sous forme d'objet JSON
* `/supression/:id` : tente de supprimer l'article dont l'id est précisé

> [!NOTE]
> Le chemin `articles` est accesible de deux méthode différente pour pouvoir aussi rajouter des articles

### Code de réponse du serveur
- `500` : Echec de lecture de d'ecriture du fichier
- `404` : Utilisateur inconnue
- `401` : Mot de passe incorrect
- `409` : Utilisateur déja existant
- `400` : Des donnée nécéssaire sont manquante
- `200` : Connection réussi

> [!NOTE]
> Dans le cas de l'envoie d'un code `200` le serveur enverra aussi sous forme de JSON le fichier demander


## JSON 
### User.json
Fichier JSON qui contient la liste de tout les utilisateur du site sous la forme
```JSON
{
    "Pseudo":{
        "nom":"nom",
        "mail":"adrresse@mail.utilisateur",
        "mdp":"motDePasse",
        "admin":true
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

### Inscription.jsx
Cette page est un formulaire qui permet aux utilisateurs de crée leur compte sur le site

### Connection.jsx
Cette page est un formulaire qui permet aux utilisateurs de se connecter

> [!NOTE]
> Une fois un utilisateur connecté la page affiche son nom et statut (user/admin)

### Articles.jsx
Cette page permet d'afficher tout les articles disponible dans le `list_articles.json`

### Accueil.jsx
Cette page est la page d'index et est celle qui se charge par défaut lorsque le site est lancé

### Add.jsx
Cette page permet au admin de rajouter un produit sur le site par un formulaire avec la possibilité d'envoyer une image au serveur

### Detail_article.tsx
Cette page est généré dynamiquement à partir des objets JSON envoyer par le serveur et affiche des détails sur un articles

### Layout.jsx
Permet de mettre le layout général d'une page (header et footer)

### Panier.tsx
Cette page affiche le panier stocker dans le `localStorage`
