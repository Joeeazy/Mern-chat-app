import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    //get message from user as an input
    const { message } = req.body;
    //get receiverid from params and rename it to receiverid
    const { id: receiverId } = req.params;
    //get sender is from req.user._id because of the middleware protectRoute
    const senderId = req.user._id;

    // check to find a conversation between 2 users using $all:  [senderId, receiverId]
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if there no conversation create one with the participants
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //put the message into the messages array in the conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // SOCKET IO functionality Will go herre Real Tm

    // This will not run in parallel
    // await conversation.save();
    // await newMessage.save();

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    //send it as a response
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendmessage Controller: ", error.messsage);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in sendmessage Controller: ", error.messsage);
    res.status(500).json({ error: "Internal Server error" });
  }
};
