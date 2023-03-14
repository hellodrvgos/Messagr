import { Router } from "express";

import {
  createMessageController,
  getMessageListController,
} from "../controllers/messages";

const router = Router();

router.post("/", createMessageController);
router.get("/", getMessageListController);

export default router;
