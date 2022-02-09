import express from "express";
import userController from "../controllers/User.js";

const UserRouter = express.Router();

UserRouter.post("/signin", userController.signin);
UserRouter.post("/signup", userController.signup);
UserRouter.patch("/role/:id", userController.ChangeRole);


export default UserRouter;