import { Router } from "express";
import passport from "passport";
import {
  createUserController,
  loginWithPasswordController,
  getUserListController,
  googleAuthenticate,
  updateUserDetailController,
} from "../controllers/users";

const router = Router();

router.post("/register", createUserController);
router.post("/login", loginWithPasswordController);
router.post(
  "/google-login",
  passport.authenticate("google-id-token", { session: false }),
  googleAuthenticate
);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  updateUserDetailController
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserListController
);

export default router;
