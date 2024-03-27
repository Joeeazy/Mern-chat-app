// Install multiple packages
// express - initilializes an express server
// dotenv - Enables reading of environment variables
// cookie-parser - parse cookies
// bcryptjs - hashing of passwords
// mongoose - connect and interact with our database
// socket.io - enables having a real time communication
// jsonwebtoken - create tokens

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongDB.js";

// create an express server

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser()); //enables access to cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// //test route
// app.get("/", (req, res) => {
//   // root route = http://localhost:5000/
//   res.send("Server Is running !!");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
