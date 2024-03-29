import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  currentAppId: {
    type: String,
  },
  email_id: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  messages: [
    {
      message: {
        type: String,
      },
      diffId: {
        type: String,
        required: true,
      },
    },
  ],
});

const chatModel = mongoose.model("chatModel", chatSchema);
export { chatModel };
