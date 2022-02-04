const express = require("express");
const quizzController = require("../controllers/quizz");
const { body, validationResult } = require("express-validator");
const { auth } = require("../middleware/auth")

const QuizzRouter = express.Router();

QuizzRouter.get("/", quizzController.getQuizz);
QuizzRouter.post("/add", body("question").isLength({ min: 8 }),
    quizzController.createQuizz);
QuizzRouter.delete("/:id", quizzController.DeleteQuizz);

module.exports = QuizzRouter;