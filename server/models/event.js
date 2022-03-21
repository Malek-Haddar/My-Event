import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
         required: [true, 'Please add the name'],
    },
    description: {
        type: String,
         required: [true, 'Please add the description'],
        minlength: 3,
    },
    date: {
        type: Date,
         required: [true, 'Please add the date'],
    },
    location: {
        type: String,
         required: [true, 'Please add the location'],
    },
    sessions: [{
        type: mongoose.Types.ObjectId,
        ref: "Session",
    }, ],
},
{
    timestamps: true,
  });

export default mongoose.model("Event", eventSchema);