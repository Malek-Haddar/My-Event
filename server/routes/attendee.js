import express from "express";
import { checkIn } from "../controllers/attendee.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/checkIn/:idUser/:idSession", auth, checkIn);

export default router;
