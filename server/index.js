import connection from "./config/database.js";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
import userRoute from "./routes/user.js";
import SessionRouter from "./routes/session.js";
import EventRouter from "./routes/event.js";
import CategoryRouter from "./routes/category.js";
import ReclamationRouter from "./routes/reclamation.js";
import QuizzRouter from "./routes/quizz.js";
import postRoutes from "./routes/posts.js";
import galleryRoutes from "./routes/gallery.js";
import attendeeRoutes from "./routes/attendee.js";

connection();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/session", SessionRouter);
app.use("/api/event", EventRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/reclamation", ReclamationRouter);
app.use("/api/quizz", QuizzRouter);
app.use("/api/posts", postRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/check", attendeeRoutes);



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}.`));