import Express from "express";
import cors from "cors";

import userRouter from "./routes/users";
import messageRouter from "./routes/messages";

const app = Express();

app.use(Express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/messages", messageRouter);

export default app;
