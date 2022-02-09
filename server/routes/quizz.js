import express from 'express';
import { getQuizz, createQuizz, DeleteQuizz } from '../controllers/quizz.js';


const router = express.Router();


router.get("/", getQuizz);
router.post("/add", createQuizz);
router.delete("/:id", DeleteQuizz);

export default router;