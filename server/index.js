import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";

import connection from "./config/database.js";
import compression from "compression";

import attendeeRoutes from "./routes/attendee.js";
import CategoryRouter from "./routes/category.js";
import EventRouter from "./routes/event.js";
import galleryRoutes from "./routes/gallery.js";
import postRoutes from "./routes/posts.js";
import QuizRouter from "./routes/quiz.js";
import ReclamationRouter from "./routes/reclamation.js";
import SessionRouter from "./routes/session.js";
import userRoute from "./routes/user.js";
import discord from "./models/discord.js";
import Pusher from "pusher";
import { auth } from "./middleware/auth.js";
const __dirname = path.resolve();

const app = express();
app.use(cors());
connection();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// app.use(express.json());
app.use(bodyParser.json());

app.use(compression());

app.use("/api/user", userRoute);
app.use("/api/session", SessionRouter);
app.use("/api/event", EventRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/reclamation", ReclamationRouter);
app.use("/api/quiz", QuizRouter);
app.use("/api/posts", postRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/check", attendeeRoutes);

const port = process.env.PORT || 4000;

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: "us2",
  useTLS: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected...");

  const changeStream = mongoose.connection.collection("conversations").watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("channels", "newChannel", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("conversations", "newMessage", {
        change: change,
      });
    } else {
      console.log("Error trigger Pushers");
    }
  });
});
//api routes
app.get("/api/chat", (req, res) => res.status(200).send("hello world discord"));

app.post("/api/new/channel", (req, res) => {
  const dbData = req.body;
  console.log({ dbData });

  discord.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/api/get/channelList", (req, res) => {
  discord.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let channels = [];

      data.map((channeData) => {
        const channelInfo = {
          id: channeData._id,
          name: channeData.channelName,
        };
        channels.push(channelInfo);
        console.log({ channels });
      });

      res.status(200).send(channels);
    }
  });
});

app.post("/api/new/message", (req, res) => {
  // console.log(req.body);
  discord.updateMany(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.get("/api/get/conversation", async (req, res) => {
  try {
    const id = req.query.id;
    const conversation = await discord
      .find({ _id: id })
      ?.populate("conversation.user");

    res.status(200).send(conversation);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// app.get("/get/conversation", (req, res) => {
//   const id = req.query.id;
//   discord
//     .find({ _id: id }, (err, data) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(200).send(data);
//       }
//     })
//     ?.populate("user");
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(process.cwd(), "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
//listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
