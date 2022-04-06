import express from "express";
import {
  ChangeRole,
  getSession,
  signin,
  signup,
  checkIn,
  getUsers,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// const UserRouter = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/role/:id", ChangeRole);
router.get("/session", auth, getSession);
router.patch("/checkIn/:idUser", auth, checkIn);
router.get("/users", auth, getUsers);

export default router;
