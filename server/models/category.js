import mongoose from "mongoose";
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sessions: [{
        type: mongoose.Types.ObjectId,
        ref: "Session",
    }],
})

export default mongoose.model("Category", categorySchema);