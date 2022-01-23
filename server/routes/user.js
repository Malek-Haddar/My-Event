const express = require("express");
const userController = require("../controllers/User");

const UserRouter = express.Router();

UserRouter.post("/signin", userController.signin);
UserRouter.post("/signup", userController.signup);
UserRouter.post("/role/:id", userController.ChangeRole);


module.exports = UserRouter;