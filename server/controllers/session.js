import express from "express";
import Session from "../models/session.js";
import mongoose from "mongoose";
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
    const Sessions = await Session.find()?.populate("users");

    res.status(200).send(Sessions);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
export const getAllSession = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          start: {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$start",
            },
          },
          data: {
            $push: {
              name: "$name",
              details: "$details",
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          result: "$data",
        },
      },
    ];
    const allSessions = await Session.aggregate(pipeline);

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
  // newSession.category = req.body.category;
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



// affect session to event
export const affectSessionToEvent = async (req, res) => {
  try {
    const { idSession, idEvent } = req.body;

    const updatedSession = { event: idEvent };

    const sessionEvent = await Session.findByIdAndUpdate(
      idSession,
      updatedSession
    );

    res.status(200).send(sessionEvent);
  } catch (error) {
    res.send(error);
  }
};
// affect session to category
export const affectSessionToCategory = async (req, res) => {
  try {
    const { idSession, idCategory } = req.body;

    const updatedSession = { categories: idCategory };

    const sessionEvent = await Session.findByIdAndUpdate(
      idSession,
      updatedSession
    );

    res.status(200).send(sessionEvent);
  } catch (error) {
    res.send(error);
  }
};
// delete session
export const deleteSession = async (req, res) => {
  const { sessionId } = req.params;
  Session.findByIdAndRemove(sessionId).then((result) => {
    res.json({ message: "Session deleted successfully." });
  });
};
// like session
export const likeSession = async (req, res) => {
  try {
    const session = await Session.findById(req.body._id);
    // Check if the post has already been liked
    if (session.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Session already liked" });
    }

    session.likes.unshift({ user: req.user.id });

    await session.save();

    return res.json(session.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// unlike session
export const unlikeSession = async (req, res) => {
  try {
    const session = await Session.findById(req.body._id);

    // Check if the post has not yet been liked
    if (!session.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Session has not yet been liked" });
    }

    // remove the like
    session.likes = session.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await session.save();

    return res.json(session.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// affect quiz to session
export const affectQuizToSession = async (req, res) => {
  try {
    const { idSession, idQuiz } = req.body;


  const updatedQuiz = { $addToSet: { quiz: idQuiz } };


    const QuizSession = await Session.findByIdAndUpdate(idSession, updatedQuiz);

    res.status(200).send(QuizSession);
  } catch (error) {
    res.send(error);
  }
};




// export const getSessionById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const session = await Session.find({ _id: id }).populate("category");

//     res.status(200).send(session);
//   } catch (error) {
//     console.log(error);
//   }
// };

export default router;
