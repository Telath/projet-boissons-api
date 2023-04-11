// Import du modèle bouteille
var Bouteille = require("../models/bouteille");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const bouteilleValidationRules = () => {
    return [   
        body("name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified.")
            .isAlphanumeric()
            .withMessage("Name has non-alphanumeric characters."),
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [bodyIdValidationRule(), bouteilleValidationRules(), checkValidity, (req, res, next) => {
    
    // Création de la nouvelle instance de bouteille à ajouter 
    var bouteille = new Bouteille({
        _id: req.body.id,
        name: req.body.name,
      });

    // Ajout de bouteille dans la bdd 
    bouteille.save()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
}];

// Read
exports.getAll = (req, res, next) => {
    Bouteille.find()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Bouteille.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
}];

// Update
exports.update = [paramIdValidationRule(), bouteilleValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de bouteille à modifier 
    var bouteille = new Bouteille({
        _id: req.params.id,
        name: req.body.name,
      });

      Bouteille.findByIdAndUpdate(req.params.id, bouteille).then((result) => {
        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json("Bouteille with id "+req.params.id+" is not found !");
          }
        })
    .catch((error) => res.status(500).json(error));
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Bouteille.findByIdAndRemove(req.params.id)
    .then((result) => {
        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json("Bouteille with id "+req.params.id+" is not found !");
          }
        })
    .catch((error) => res.status(500).json(error));
}];