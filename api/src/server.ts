import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

// //soscketio
// import http from "http";
// import { Server } from "socket.io";

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