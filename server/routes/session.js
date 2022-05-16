import express from 'express';
import {
  getSession,
  createSession,
  updateSession,
  deleteSession,
  // getSessionById,
  getAllSession,
  affectSessionToEvent,
  affectSessionToCategory,
  likeSession,
  unlikeSession,
} from "../controllers/session.js";

import { body, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
const router = express.Router();

router.route("/").get(getSession);

router.route("/all").get(getAllSession);
router.post("/add", body("name").isLength({ min: 3 }), createSession);
router.patch("/:id", updateSession);
router.delete("/delete/:sessionId", deleteSession);
router.patch("/sessions/affect", affectSessionToEvent);
router.patch("/sessions/category/affect", affectSessionToCategory);
router.patch("/like/:id", auth, likeSession);
router.patch("/unlike/:id", auth, unlikeSession);


// router.get("/session/:id", getSessionById);


export default router;