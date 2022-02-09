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
import postRoutes from './routes/posts.js';



connection();
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/session", SessionRouter);
app.use("/event", EventRouter);
app.use("/categories", CategoryRouter);
app.use("/reclamation", ReclamationRouter);
app.use("/quizz", QuizzRouter);
app.use('/posts', postRoutes);



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}.`));