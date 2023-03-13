import { Router } from "express";


import { createUserController, loginWithPasswordController, } from "../controllers/users";

const router = Router();

router.post("/register", createUserController);

router.post("/login", loginWithPasswordController);

export default router;