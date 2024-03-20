import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    //get input from the user
    const { fullName, username, password, confirmPassword, gender } = req.body;

    //check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    //check if user exists in the database
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    // Hash Passwords Here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //random profile-pictures api- https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //create a user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    //check if there is a new user? if true
    if (newUser) {
      //Generate JWT token here and set it as a cookie

      generateTokenAndSetCookie(newUser._id, res);
      //save the user to the database
      await newUser.save();

      //send a response
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      //if there is no newUser
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    //get inputs from user
    const { username, password } = req.body;
    //check if user exists or not
    const user = await User.findOne({ username });
    //check if password is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    //generate token an setcookie
    generateTokenAndSetCookie(user._id, res);
    //send this response
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
    //catch any error
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
