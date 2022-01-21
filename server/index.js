const connection = require("./DataBase");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const userRoute = require("./routes/user");
const SessionRouter = require("./routes/session");
const EventRouter = require("./routes/event");

connection();
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/session", SessionRouter);
app.use("/event", EventRouter);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}.`));