import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    name: { type: String },
    start: { type: Date },
    end: { type: Date },
    details: { type: String },
});

export default mongoose.model("Session", sessionSchema);