import { Router } from "express";
import passport from "passport";
import axios from "axios";
import dotenv from "dotenv";

import {
  createUserController,
  loginWithPasswordController,
  getUserListController,
  makeAdminController,
  banUserController,
  googleAuthenticate,
  updateUserDetailController,
  displayUserInformationController,
  resetPasswordController,
  resetPasswordController1
} from "../controllers/users";

dotenv.config();
const CHAT_ENGINE_KEY = process.env.CHAT_ENGINE_KEY as string;

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

router.patch(
  "/resetpassword", resetPasswordController
);

router.post(
  "/resetpassword/getquestion", resetPasswordController1
);

router.get(
  "/userlist/:id",
  passport.authenticate("jwt", { session: false }),
  getUserListController
);

router.put(
  "/adminstatus/:id",
  passport.authenticate("jwt", { session: false }),
  makeAdminController
);

router.put(
  "/banstatus/:id",
  passport.authenticate("jwt", { session: false }),
  banUserController
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  displayUserInformationController
);

//chatengine
router.post("/loginChat", async (req, res) => {
  const { username } = req.body;
  // Get or create user on Chat Engine!
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": CHAT_ENGINE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
