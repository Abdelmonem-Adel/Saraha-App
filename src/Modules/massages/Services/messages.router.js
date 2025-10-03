import { Router } from "express";
import { getMessagesServices, sendMessagesServices } from "./messages.services.js";
const router = Router()

router.post("/add-message/:receiverid" , sendMessagesServices)
router.get("/get" , getMessagesServices)

export default router;