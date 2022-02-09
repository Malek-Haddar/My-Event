import express from 'express';

import Quizz from '../models/quizz.js';

import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
const router = express.Router();


export const getQuizz = async(req, res) => {
    try {
        const allQuizzs = await Quizz.find();
        res.status(200).send(allQuizzs);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createQuizz = async(req, res) => {
    var newQuizz = new Quizz();
    newQuizz.question = req.body.question;
    /* newReclamation.users = req.body.users; */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    } else {
        try {
            await newQuizz.save();
            return res.status(200).json(newQuizz);
        } catch (err) {
            console.log(err);
        }
    }
}

export const DeleteQuizz = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(" No Quizz found with id : ${id} ");

    await Quizz.findByIdAndRemove(id);
    res.json({ message: " Quizz has been deleted successfully ! " })

}




export default router;