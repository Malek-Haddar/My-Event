const express = require("express");
const categoryController = require("../controllers/category");
const { body, validationResult } = require("express-validator");
const { auth } = require("../middleware/auth")

const CategoryRouter = express.Router();

CategoryRouter.get("/", categoryController.getCategory);
CategoryRouter.post(
    "/add",
    body("name").isLength({ min: 3 }),
    categoryController.createCategory);
/* CategoryRouter.patch("/:id", categoryController.updateCategory);*/
CategoryRouter.delete("/:id", categoryController.DeleteCategory);

module.exports = CategoryRouter;