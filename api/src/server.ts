import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

//soscketio
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const port = 8005;
mongoose.set("strictQuery", false);

mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`))
    })
    .catch((error: Error) => {
        console.log("MongoDB connection error." + error);
        process.exit(1);
    })

//socketio

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with id ${socket.id} join room ${room}`)
  })

  socket.on("send_message", (messageData) => {
    socket.to(messageData.room).emit("receive_message", messageData)
    // console.log(messageData, "messageData")
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(8001, () => {
  console.log("SERVER RUNNING");
});