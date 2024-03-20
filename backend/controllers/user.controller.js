import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUsedId = req.user._id;

    //find every user in db but, not the one that is our loggedInUsedId
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUsedId },
    }).select("-password");

    //return the response
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in user.controller.js getUserSidebar ", error.message);
    res.status(500).json({ Error: "Internal server error" });
  }
};
