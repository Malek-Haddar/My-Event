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
        displayName: String,
        email: String,
        photo: String,
        uid: String,
      },
    },
  ],
});

export default mongoose.model("Discord", discordSchema);
