import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import { sendmail, sendResetEmail } from "../service/mailing.js";
import qrcode from "qrcode";
import session from "../models/session.js";
import Utilisateur from "../models/utilisateur.js";

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
  const { id } = req.user;

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
  try {
    const idUser = req.body.idUser;
    const idSession = req.body.idSession;

    const userCheckIn = await Utilisateur.findOne({
      _id: idUser,
      "checkIn.sessions": idSession,
    });
    if (!userCheckIn) {
      await Utilisateur.findByIdAndUpdate(
        idUser,
        { $addToSet: { checkIn: { date: Date.now(), sessions: idSession } } },
        { new: true }
      );
    }
    const sessionCheckIn = await session.findOne({
      _id: idSession,
      "checkIn.users": idUser,
    });
    if (!sessionCheckIn) {
      await session.findByIdAndUpdate(
        idSession,
        { $addToSet: { checkIn: { date: Date.now(), users: idUser } } },
        { new: true }
      );
    }

    res.status(201).json({ message: "Checked in successfully" });
  } catch (error) {
    // if( sessionCheckIn || userCheckIn ){
    // res.status(400).json({ message: "already checked !" });
    // }
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
  const { id } = req.user;
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
  // new: true,
  // });
  await Utilisateur.findByIdAndUpdate(id, updatedProfile, {
    new: true,
  });
  res.json(updatedProfile);

  // return US;
};

export const getUtilisateur = async (req, res) => {
  const { id } = req.user;

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

// Route to handle password reset form submission
export const reset = async (req, res) => {
  try {
    const user = await Utilisateur.findOne({ email: req.body.email });
    console.log({ user });
    if (!user) {
      req.flash("error", "No account with that email exists");
      return res.redirect("/reset");
    }

    // Generate reset token and email link
    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });
    // const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const resetUrl = `https://mall.iwatch.tn/reset-password/${resetToken}`;
    // Send reset email
    await sendResetEmail(user, resetUrl);

    // await sendmail({
    // to: user.email,
    // subject: "Password reset",
    // text: `To reset your password, please click the following link: \n\n ${resetUrl}`,
    // });
    req.flash("success", "Check your email for a password reset link");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong. Please try again later");
    res.redirect("/reset");
  }
};

// Route for reset password form
export const resetPassword = async (req, res) => {
  try {
    const user = await Utilisateur.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log({ user });
    if (!user) {
      req.flash("error", "Password reset is invalid or has expired");
      return res.redirect("/reset");
    }
    // res.redirect("password");
    res.render("reset-password", {
      token: req.params.token,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong. Please try again later");
    res.redirect("/reset");
  }
};

export const resetSubmission = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    console.log(req);
    console.log(password, token);
    const user = await Utilisateur.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Password reset token is invalid or has expired" });
    }
    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = "";
    user.resetPasswordExpires = "";
    console.log("here" + user);
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later" });
  }
};
export default router;