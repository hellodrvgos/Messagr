import { Router } from "express";
import passport from "passport";
import {
  createUserController,
  loginWithPasswordController,
  getUserListController,
} from "../controllers/users";

const router = Router();

router.post("/register", createUserController);

router.post("/login", loginWithPasswordController);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserListController
);

export default router;
