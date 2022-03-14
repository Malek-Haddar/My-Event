import mongoose from 'mongoose';
const Schema = mongoose.Schema


const reclamationSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  messages: {
    type: String,
    required: true,
  },
  /* user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }, */
});

export default mongoose.model("Reclamation", reclamationSchema)