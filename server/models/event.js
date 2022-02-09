import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    sessions: [{
        type: mongoose.Types.ObjectId,
        ref: "Session",
    }, ],
});

export default mongoose.model("Event", eventSchema);