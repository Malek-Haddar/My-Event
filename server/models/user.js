const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {
        type: Boolean,
        required: true,
        default: "false",
    },
    isInstructor: {
        type: Boolean,
        required: true,
        default: "false",
    },
    isModerator: {
        type: Boolean,
        required: true,
        default: "false",
    },
    isUser: {
        type: Boolean,
        required: true,
        default: "true",
    },
});

module.exports = mongoose.model("User", userSchema);