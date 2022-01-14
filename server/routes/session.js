import express from "express";
import {
    getSession,
    createSession,
    DeleteSession,
    updateSession,
} from "../controllers/session.js";

import { body, validationResult } from "express-validator";
const SessionRouter = express.Router();

SessionRouter.route("/").get(getSession);
SessionRouter.post("/add", body("name").isLength({ min: 3 }), createSession);
SessionRouter.patch("/:id", updateSession);
SessionRouter.delete("/:id", DeleteSession);

export default SessionRouter;