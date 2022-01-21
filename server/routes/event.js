const express = require("express");
const eventController = require("../controllers/event");

const { body, validationResult } = require("express-validator");

const EventRouter = express.Router();

EventRouter.route("/").get(eventController.getEvent);
EventRouter.post(
    "/add",
    body("name").isLength({ min: 3 }),
    eventController.createEvent
);
EventRouter.patch("/:id", eventController.updateEvent);
EventRouter.delete("/:id", eventController.DeleteEvent);

module.exports = EventRouter;