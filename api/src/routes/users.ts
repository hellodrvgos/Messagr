import { Router } from "express";
import passport from "passport";
import {
  createUserController,
  loginWithPasswordController,
  getUserListController,
} from "../controllers/users";

import axios from "axios";

const router = Router();

router.post("/register", createUserController);

router.post("/login", loginWithPasswordController);
router.get(
  "/",

  // passport.authenticate("jwt", { session: false }),

  getUserListController
);

// router.post("/authenticate", async (req, res) => {
//   const { username } = req.body;
//   return res.json({ username: username, secret: "sha256..." });
// });

router.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  // Get or create user on Chat Engine!
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "4f5e6f97-e17a-42f4-9759-5d23190bea39" } }
    );
    return res.status(r.status).json(r.data);
  } catch (error) {
    // return res.status(error.response.status).json(error.response.data);
    console.log(error);
  }
});

export default router;


