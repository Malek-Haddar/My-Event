import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import { sendmail } from "../service/mailing.js";
import qrcode from "qrcode";
import session from "../models/session.js";
import Utilisateur from "../models/utilisateur.js";
import utilisateur from "../models/utilisateur.js";

const router = express.Router();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await Utilisateur.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    const qr = await qrcode.toDataURL(oldUser._id.toString().toUpperCase());
    console.log({ qr });

    res.status(200).json({ result: oldUser, token, qr });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, role, phone, profession } =
    req.body;

  try {
    const oldUser = await Utilisateur.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const ObjectId = mongoose.Types.ObjectId;

    const result = await Utilisateur.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      role,
      phone,
      profession,
      // category: ObjectId("62d883fc8539a7ae226e1977"),
      category: [new ObjectId("62d883fc8539a7ae226e1977")],
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    const qr = await qrcode.toDataURL(result._id.toString().toUpperCase());

    sendmail(result, qr);

    res.status(201).json({ result, token, qr });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
export const hashPass = async (req, res) => {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  res.status(200).send(hashedPassword);

  console.log({ hashedPassword });
};

export const ChangeRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Task Found ! ");

  const updated = await Utilisateur.findByIdAndUpdate(
    id,
    { role: role },
    { new: true }
  );
  res.status(200).send(updated);
};

export const getSession = async (req, res) => {
  const { id } = req.utilisateur;

  try {
    const Userdetails = await Utilisateur.find({ _id: id })?.populate({
      path: "category",
      populate: { path: "sessions", populate: { path: "quiz" } },
    });

    res.status(200).send(Userdetails);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const checkIn = async (req, res) => {
  const idUser = req.body.idUser;
  const idSession = req.body.idSession;

  try {
    const US = await Utilisateur.findById(idUser);

    //if (role === 1 || role === 2 || role === 3) {
    // if (US.name && US.phone && US.profession) {
    const checkedIn = await Utilisateur.findByIdAndUpdate(
      idUser,

      { $addToSet: { checkIn: { date: Date.now(), sessions: idSession } } },
      { new: true }
    );

    const checkedSession = await session.findByIdAndUpdate(
      idSession,

      { $addToSet: { checkIn: { date: Date.now(), users: idUser } } },
      { new: true }
    );

    res.status(201).json(checkedSession);
    // }
    // res.status(400).write({ message: "Complete Your Profile !" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Utilisateur.find()?.populate("category");

    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const affectAttendeeToCategory = async (req, res) => {
  try {
    const { idUser, idCategory } = req.body;

    const updatedUser = { category: idCategory };

    const categoryUser = await Utilisateur.findByIdAndUpdate(
      idUser,
      updatedUser
    );

    res.status(200).send(categoryUser);
  } catch (error) {
    res.send(error);
  }
};

export const notifCategory = async (req, res) => {
  try {
    // const { id } = req.user;

    const { userNotif, subject, message } = req.body;
    const notif = { subject, message, userNotif };

    const notificated = { notification: notif };

    const categoryUser = await Utilisateur.findByIdAndUpdate(
      userNotif,
      notificated
    );

    res.status(200).send(categoryUser);
  } catch (error) {
    res.send(error);
  }
};

export const getNotif = async (req, res) => {
  const { id } = req.user;

  try {
    const Userdetails = await Utilisateur.find({ _id: id });

    res.status(200).send(Userdetails);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// delete customer
export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  Utilisateur.findByIdAndRemove(customerId).then((result) => {
    res.json({ message: "Session deleted successfully." });
  });
};

export const updateProfile = async (req, res) => {
  const { id } = req.utilisateur;
  const { firstName, lastName, email, phone, profession } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Task Found ! ");

  // const completeUser = await utilisateur.findById(id);
  const updatedProfile = {
    // ...completeUser,
    name: `${firstName} ${lastName}`,
    email,
    phone,
    profession,
  };

  // await utilisateur.findByIdAndUpdate(id, updatedProfile, {
  //   new: true,
  // });
  await utilisateur.findByIdAndUpdate(id, updatedProfile, {
    new: true,
  });
  res.json(updatedProfile);

  // return US;
};

export const getUtilisateur = async (req, res) => {
  const { id } = req.utilisateur;

  try {
    const result = await Utilisateur.find({ _id: id });

    res.status(200).send({ result: result });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const Userdetails = await Utilisateur.findById(id);

    res.status(200).send(Userdetails);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default router;
