import { Router } from "express";
import { ConfirmOtp, DeleteAccountService, ListUserMessagesService, ListUserService, LogOutService, RefreshTokenService, SignInService, SignUpService, UpdateAccountService } from "./users.services.js";
import { authenticationMiddleware } from "../../../Middlewares/authentication.middleware.js";
const router = Router()

router.post("/add" , SignUpService)
router.get("/signin" , SignInService)
router.put('/update' , authenticationMiddleware , UpdateAccountService)
router.delete("/delete" , authenticationMiddleware , DeleteAccountService)
router.get("/list" , ListUserService)
router.put('/confirm-otp' , ConfirmOtp)
router.post("/logout" , LogOutService)
router.post("/refresh-token" , RefreshTokenService)
router.get("/list-user-messages/:id" , ListUserMessagesService)




export default router;