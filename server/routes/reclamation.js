const express = require("express");
const reclamationController = require("../controllers/reclamation");
const { body, validationResult } = require("express-validator");
const { auth } = require("../middleware/auth")

const ReclamationRouter = express.Router();

ReclamationRouter.get("/", reclamationController.getReclamation);
ReclamationRouter.post("/add", body("text").isLength({ min: 8 }),
    reclamationController.createReclamation);
ReclamationRouter.delete("/:id", reclamationController.DeleteReclamation);

module.exports = ReclamationRouter;