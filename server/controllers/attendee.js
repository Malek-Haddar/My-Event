import express from "express";
import Attendee from "../models/attendee.js";
const router = express.Router();

export const checkIn = async (req, res) => {
  // const { role } = req.user;
  const idUser = req.params.idUser;
  const idSession = req.params.idSession;

  try {
    //if (role === 1 || role === 2 || role === 3) {
    const checkedIn = await Attendee.create({
      user: idUser,
      sessions: idSession,
      checkIn: Date.now(),
    });

    res.status(201).send(checkedIn);
    //}
    res.status(400).json({ message: "Auth Error" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAttendee = async (req, res) => {
  const { id } = req.user;

  try {
    const Userdetails = await Attendee.find({ _id: id }).populate({
      path: "user",
      path: "sessions",
    });

    res.status(200).send(Userdetails);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default router;
