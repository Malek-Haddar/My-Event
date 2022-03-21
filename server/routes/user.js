import express from "express";
import { ChangeRole, getSession, signin, signup } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// const UserRouter = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/role/:id", ChangeRole);
router.get("/session", auth, getSession);

export default router;
