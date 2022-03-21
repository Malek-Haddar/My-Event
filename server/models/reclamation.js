import mongoose from 'mongoose';
const Schema = mongoose.Schema


const reclamationSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    subject: {
      type: String,
      required: [true, "Please add subject"],
    },
    messages: {
      type: String,
      required: [true, "Please add message"],
    },
    /* user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }, */
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reclamation", reclamationSchema)