import express from 'express';
import { getReclamation, createReclamation, DeleteReclamation } from "../controllers/reclamation.js";
const router = express.Router();


router.get("/", getReclamation);
router.post("/add", createReclamation);
router.delete("/:id", DeleteReclamation);

export default router;