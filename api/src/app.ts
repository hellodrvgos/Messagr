import Express from "express";
import cors from "cors";
import passport from "passport";

import { googleStrategy, jwtStrategy } from "./config/passport";
import userRouter from "./routes/users";

const app = Express();

app.use(Express.json());

app.use(cors());
app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(googleStrategy);
// routes
app.use("/users", userRouter);

export default app;
