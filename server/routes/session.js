import express from 'express';
import {
    getSession,
    createSession,
    updateSession,
    DeleteSession,
    getSessionById,
} from "../controllers/session.js";

import { body, validationResult } from "express-validator";
const router = express.Router();

router.route("/").get(getSession);
router.post(
    "/add",
    body("name").isLength({ min: 3 }),
    createSession
);
router.patch("/:id", updateSession);
router.delete("/:id", DeleteSession);

router.get("/session/:id", getSessionById);


export default router;