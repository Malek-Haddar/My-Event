import express from "express";
import {
  getQuiz,
  createQuiz,
  DeleteQuiz,
  getOneQuiz,
} from "../controllers/quiz.js";

const router = express.Router();

router.get("/", getQuiz);
router.get("/:id", getOneQuiz);
router.post("/add", createQuiz);
router.delete("/:id", DeleteQuiz);

export default router;
