import mongoose from "mongoose";

//create a messages schema a senderid receiverid and the message

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  //created at, updated at => message.created at :15:20 15/11/2023
  { timestamps: true }
);

//ccreate a model
const message = mongoose.model("Message", messageSchema);

export default message;
