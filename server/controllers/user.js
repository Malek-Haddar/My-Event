import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import { sendmail } from "../service/mailing.js";
import qrcode from "qrcode";
import session from "../models/session.js";

const router = express.Router();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

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

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      role,
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
    console.log({ qr });
    console.log({ result });

    res.status(201).json({ result, token });
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

  const updated = await User.findByIdAndUpdate(
    id,
    { role: role },
    { new: true }
  );
  res.status(200).send(updated);
};

// export const getSession = async (req, res) => {
//   const { id } = req.user;
//   console.log(req.user.id);

//   try {
//     const pipeline = [
//       {
//         '$lookup': {
//           'from': 'categories',
//           'localField': 'category',
//           'foreignField': '_id',
//           'as': 'cat'
//         }
//       }
//     ]
//     const Userdetails = await User.aggregate(pipeline)
//     res.status(200).send(Userdetails);
//   } catch (error) {
//     res.status(404).json({ message: error });
//   }
// };
export const getSession = async (req, res) => {
  const { id } = req.user;

  try {
    const Userdetails = await User.find({ _id: id })?.populate({
      path: "category",
      populate: { path: "sessions", populate: { path: "quiz" } },
    });

    res.status(200).send(Userdetails);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const checkIn = async (req, res) => {
  const email = req.body.email;
  const idSession = req.body.idSession;
  try {
    //if (role === 1 || role === 2 || role === 3) {

    const UserEmail = await User.findOne({ email });
    console.log({ UserEmail });

    const checkedIn = await UserEmail.updateOne(
      { $addToSet: { checkIn: { date: Date.now(), sessions: idSession } } },
      { new: true }
    );

    const checkedSession = await session.findByIdAndUpdate(
      idSession,

      { $addToSet: { users: UserEmail._id } },
      { new: true }
    );

    res.status(201).send(checkedSession);
    //}
    // res.status(400).json({ message: "Auth Error" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// export const checkIn = async (req, res) => {
//   const { role } = req.user;
//   const idUser = req.params.idUser;

//   try {
//     if (role === 1 || role === 2) {
//       const updatedUser = await User.findByIdAndUpdate(
//         idUser,
//         {
//           date: Date.now(),
//         },
//         { new: true }
//       );
//       res.status(200).send();
//     }
//     res.status(400).json({ message: "Auth Error" });
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// };

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()?.populate("category");

    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const affectAttendeeToCategory = async (req, res) => {
  try {
    const { idUser, idCategory } = req.body;

    const updatedUser = { category: idCategory };

    const categoryUser = await User.findByIdAndUpdate(idUser, updatedUser);

    res.status(200).send(categoryUser);
  } catch (error) {
    res.send(error);
  }
};

// Category Notification
// export const notifCategory = async (req, res) => {
//   const { subject, message, userCategory } = req.body;

//   const newUser = { subject, message, userCategory };

//   try {
//     await User.notification.save(newUser);

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const notifCategory = async (req, res) => {
  try {
    // const { id } = req.user;

    const { userNotif, subject, message } = req.body;
    const notif = { subject, message, userNotif };

    const notificated = { notification: notif };

    const categoryUser = await User.findByIdAndUpdate(userNotif, notificated);

    res.status(200).send(categoryUser);
  } catch (error) {
    res.send(error);
  }
};

export const getNotif = async (req, res) => {
  const { id } = req.user;

  try {
    const Userdetails = await User.find({ _id: id });

    res.status(200).send(Userdetails);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// delete customer
export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  User.findByIdAndRemove(customerId).then((result) => {
    res.json({ message: "Session deleted successfully." });
  });
};

export default router;
