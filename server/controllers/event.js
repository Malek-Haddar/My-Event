import express from 'express';
import mongoose from 'mongoose';

import { body, validationResult } from "express-validator";
import Event from '../models/event.js';
import { Temporal } from "@js-temporal/polyfill";

const router = express.Router();

// import { getSessionById } from "./session.js";

export const getEvent = async (req, res) => {
  try {
    const allEvents = await Event.find();

    res.status(200).json(allEvents);
    // getSessionById();
  } catch (error) {
    res.status(404).json({ message: error.message() });
  }
};

export const createEvent = async (req, res) => {
  var newEvent = new Event();
  newEvent.name = req.body.name;
  newEvent.description = req.body.description;
  newEvent.date = req.body.date;
  newEvent.location = req.body.location;
  newEvent.isPublic = req.body.isPublic;
  newEvent.status = req.body.status;
  newEvent.sessions = req.body.sessions;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      await newEvent.save();
      return res.status(200).json(newEvent);
    } catch (err) {
      console.log(err);
    }
  }
};

export const updateEvent = async(req, res) => {
    const { id } = req.params;
    const { name, description, date, location } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Task Found ! ");

    const updatedEvent = { name, description, date, location, _id: id };

    await Event.findByIdAndUpdate(id, updatedEvent, { new: true });
    res.json(updatedEvent);
};

export const DeleteEvent = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Task Found with id : ${id} ");

    await Event.findByIdAndRemove(id);
    res.json({ message: "Task deleted successfully." });
};

export default router;