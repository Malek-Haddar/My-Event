import express from "express";

import Quiz from "../models/quiz.js";

import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import quiz from "../models/quiz.js";
const router = express.Router();

export const getQuiz = async (req, res) => {
  try {
    const allQuizzs = await Quiz.find();
    res.status(200).send(allQuizzs);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOneQuiz = async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Quiz.findOne({ _id });
    if (!question) {
      return res.status(404).json({});
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { description } = req.body;
    const { alternatives } = req.body;

    const question = await Quiz.create({
      description,
      alternatives,
    });

    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// export const DeleteQuiz = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(" No Quiz found with id : ${id} ");

//   await Quiz.findByIdAndRemove(id);
//   res.json({ message: " Quiz has been deleted successfully ! " });
// };

export const DeleteQuiz = async (req, res) => {
  try {
  const { sessionId } = req.params;

  const deletedQuiz = await Quiz.deleteOne({ sessionId });

  if (deletedQuiz.deletedCount === 0) {
    return res.status(404).json({ message: "No Quiz found" });
  } else {
    return res.status(204).json();
  }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};






export default router;
