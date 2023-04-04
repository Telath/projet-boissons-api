// Create
exports.create = (req, res, next) => {
    return res.status(201).json("CREATE !");
};

// Read
exports.getAll = (req, res, next) => {
    return res.status(200).json("GET ALL!");
};

exports.getById = (req, res, next) => {
    return res.status(200).json("GET BY ID !");
};

// Update
exports.update = (req, res, next) => {
    return res.status(200).json("UPDATE !");
};

// Delete
exports.delete = (req, res, next) => {
    return res.status(200).json("DELETE !");
};