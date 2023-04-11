// Import du modèle boisson
var Boisson = require("../models/boisson");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const boissonValidationRules = () => {
    return [   
        body("name")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Name must be specified.")
            .isAlphanumeric()
            .withMessage("Name has non-alphanumeric characters."),

        body("description")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Description must be specified."),
            
        body("drinkSize")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("drinkSize must be specified.")
            .isNumeric()
            .withMessage("drinkSize has non-numeric characters."),

        body("creationDate", "Invalid date of birth")
            .optional({ checkFalsy: true })
            .isISO8601()
            .toDate(),

        body("bouteille")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Bouteille must be specified."),
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
exports.create = [bodyIdValidationRule(), boissonValidationRules(), checkValidity, (req, res, next) => {
    
    // Création de la nouvelle instance de boisson à ajouter 
    var boisson = new Boisson({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        drinkSize: req.body.drinkSize,
        creationDate: req.body.creationDate,
        bouteille: req.body.bouteille
      });

    // Ajout de boisson dans la bdd 
    boisson.save()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
}];

// Read
exports.getAll = (req, res, next) => {
    Boisson.find()
    .populate("bouteille")
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    Boisson.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
}];

// Update
exports.update = [paramIdValidationRule(), boissonValidationRules(), checkValidity,(req, res, next) => {
    
    // Création de la nouvelle instance de boisson à modifier 
    var boisson = new Boisson({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        drinkSize: req.body.drinkSize,
        creationDate: req.body.creationDate,
        bouteille: req.body.bouteille
      });

      Boisson.findByIdAndUpdate(req.params.id, boisson)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json("Boisson with id "+req.params.id+" is not found !");
            }
            })
        .catch((error) => res.status(500).json(error));
}];

// Delete
exports.delete = [paramIdValidationRule(), checkValidity,(req, res, next) => {
    Boisson.findByIdAndRemove(req.params.id)
    .then((result) => {
        if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json("Boisson with id "+req.params.id+" is not found !");
          }
        })
    .catch((error) => res.status(500).json(error));
}];