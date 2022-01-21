const express = require("express");
const userController = require("../controllers/User");

const UserRouter = express.Router();

UserRouter.post("/signin", userController.signin);
UserRouter.post("/signup", userController.signup);

module.exports = UserRouter;