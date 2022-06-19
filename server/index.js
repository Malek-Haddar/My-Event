import connection from "./config/database.js";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from "compression";

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
import { Server } from "socket.io";

connection();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(cors());
app.use(compression());

app.use("/api/user", userRoute);
app.use("/api/session", SessionRouter);
app.use("/api/event", EventRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/reclamation", ReclamationRouter);
app.use("/api/quizz", QuizzRouter);
app.use("/api/posts", postRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/check", attendeeRoutes);

const port = process.env.PORT || 4000;

// const io = new Server({
//   cors: {
//     origin: "http://localhost:5000",
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("newUser", (username) => {
//     // addNewUser(username, socket.id);
//     console.log("haw d5al !!!");
//   });

//   socket.on("disconnect", () => {
//     // removeUser(socket.id);
//     console.log("haw 5raj");
//   });
// });
// io.listen(5000);

app.listen(port, () => console.log(`Listening on port ${port}.`));