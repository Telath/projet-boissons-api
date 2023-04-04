// (Étape 1) Import de express
var express = require('express');

// (Étape 1) Définition du router
var router = express.Router();

// (Étape 2) Ajout de la route qui permet d'ajouter un étudiant
router.post("/", (req, res) => {
    return res.status(201).json("CREATE !");
});

// (Étape 2) Ajout de la route qui permet d'afficher tous les étudiants
router.get("/", (req, res) => {
    return res.status(200).json("GET ALL!");
});

// (Étape 2) Ajout de la route qui permet d'afficher un seul étudiant grâce à son identifant
router.get("/:id", (req, res) => {
    return res.status(200).json("GET BY ID = !");
});

// (Étape 2) Ajout de la route qui permet de modifier un seul étudiant grâce à son identifant
router.put("/:id", (req, res) => {
    return res.status(200).json("UPDATE !");
});

// (Étape 2) Ajout de la route qui permet de supprimer un seul étudiant grâce à son identifant
router.delete("/:id", (req, res) => {
    return res.status(200).json("DELETE !");
});

// (Étape 1) Export du router
module.exports = router;