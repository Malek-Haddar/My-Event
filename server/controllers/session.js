import express from 'express';
import Session from "../models/session.js";
import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import Category from "../models/category.js";
const router = express.Router();

export const getSession = async (req, res) => {
  try {
    // const allSessions = await Session.aggregate([
    //   {
    //     $group: {
    //       _id: { start: "$start" },
    //       totalSession: { $sum: 1 },
    //       averageSession: { $avg: "$start" },
    //     },
    //   },
    // ]);
    const allSessions = await Session.find().populate("category");

    res.status(200).send(allSessions);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createSession = async (req, res) => {
  var newSession = new Session();
  newSession.name = req.body.name;
  newSession.start = req.body.start;
  newSession.end = req.body.end;
  newSession.details = req.body.details;
  newSession.category = req.body.category;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      await newSession.save();
      return res.status(200).json(newSession);
    } catch (err) {
      console.error(err);
    }
  }
};

export const updateSession = async (req, res) => {
  const { id } = req.params;
  const { name, start, end, details, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Task Found ! ");

  const updatedSession = { name, start, end, details, category, _id: id };

  await Session.findByIdAndUpdate(id, updatedSession, { new: true });
  res.json(updatedSession);
};

export const DeleteSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Task Found with id : ${id} ");

  await Session.findByIdAndRemove(id);
  res.json({ message: "Task deleted successfully." });
};
export const getSessionById = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await Session.find({ _id: id }).populate("category");

    res.status(200).send(session);
  } catch (error) {
    console.log(error);
  }
};

export default router;   