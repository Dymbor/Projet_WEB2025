import '../css/add.css';
import { useEffect, useState } from "react";

const Add = () => {
    //Initialise le forme
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        imageFile: null,
    });

    //Stocke les produits dans un tableau JSON (simulation)
    const [products, setProducts] = useState([]);

    //Prend les informations des articles dans le serveur
    useEffect(() => {
        fetch('http://localhost:3001/articles')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Erreur chargement articles :", err));
    }, []);

    //Détecte les changements dans le form
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prev) => ({
                ...prev, imageFile: files[0],
                imagePreview: URL.createObjectURL(files[0]),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    //Gère la soumission du forms et l'envoie au serveur
    const handleSubmit = async (e) => {
        e.preventDefault();


        //Vérifie si tout les champs sont rempli
        if (!formData.name || !formData.price || !formData.description) {
            alert("Merci de remplir tous les champs");
            return;
        }

        //Ajoute les éléments du forms dans un nouveau form
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("image", formData.imageFile);

        //Ajoute les informations du nouveau form grâce au serveur
        try {
            const response = await fetch("http://localhost:3001/articles", {
                method: "POST",
                body: formDataToSend,
            });
            const data = await response.json();
            console.log("Article ajouté :", data);

            // Reset form
            setFormData({
                name: "",
                price: "",
                description: "",
                imageFile: null,
            });
        } catch (err) {
            console.error("Erreur :", err);
        }
    };

    //Affiche la page Ajouter
    return (
        <div className='Admin'>
            <div className='detail'>
                <div className='fond'>
                    <h2>Ajouter un produit</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="file" name="image" onChange={handleChange} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Nom du produit"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Prix"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <button type="submit">Ajouter</button>
                    </form>

                    <h3>Produits présents</h3>
                    {products.map((p) => (
                        <li key={p.id}>{p.name} - {p.price}€</li>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Add;