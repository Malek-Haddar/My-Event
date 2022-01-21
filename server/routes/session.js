const express = require("express");
const sessionController = require("../controllers/session");

const { body, validationResult } = require("express-validator");
const SessionRouter = express.Router();

SessionRouter.route("/").get(sessionController.getSession);
SessionRouter.post(
    "/add",
    body("name").isLength({ min: 3 }),
    sessionController.createSession
);
SessionRouter.patch("/:id", sessionController.updateSession);
SessionRouter.delete("/:id", sessionController.DeleteSession);

module.exports = SessionRouter;