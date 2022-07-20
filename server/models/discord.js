import mongoose from "mongoose";
const Schema = mongoose.Schema;

const discordSchema = new Schema({
  channelName: String,
  conversation: [
    {
      // _id: String,
      message: String,
      timestamp: String,
      user: { 
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

export default mongoose.model("discords", discordSchema);
