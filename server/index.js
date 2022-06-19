import connection from "./config/database.js";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from "compression";

import userRoute from "./routes/user.js";
import SessionRouter from "./routes/session.js";
import EventRouter from "./routes/event.js";
import CategoryRouter from "./routes/category.js";
import ReclamationRouter from "./routes/reclamation.js";
import QuizRouter from "./routes/quiz.js";
import postRoutes from "./routes/posts.js";
import galleryRoutes from "./routes/gallery.js";
import attendeeRoutes from "./routes/attendee.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

connection();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.json());

app.use(cors());
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

app.listen(port, () => console.log(`Listening on port ${port}.`));

