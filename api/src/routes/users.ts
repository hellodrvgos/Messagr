import { Router } from "express";
import passport from "passport";
import {
  createUserController,
  loginWithPasswordController,
  getUserListController,
  googleAuthenticate,
} from "../controllers/users";

const router = Router();

router.post("/register", createUserController);

router.post("/login", loginWithPasswordController);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserListController
);
router.post(
  "/google-login",
  passport.authenticate("google-id-token", { session: false }),
  googleAuthenticate
);
export default router;
