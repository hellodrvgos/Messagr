import Express from "express";
import cors from "cors";
import passport from "passport";

import userRouter from "./routes/users";

const app = Express();

app.use(Express.json());

app.use(cors());

app.use("/users", userRouter);

export default app;