import express from "express"
import { registerUser, authUser, verifyOtp, logoutUser, forgotPassword, resetPassword, resendOtp, googleLogout, googleSuccess } from "../controllers/authController"
import passport from "passport"
import env from "../utils/validateEnv"

const router = express.Router()

router.post("/register", registerUser)
router.patch("/verify-otp", verifyOtp)
router.post("/resend-otp", resendOtp)
router.post("/login", authUser)
router.post("/logout", logoutUser)
router.post("/forget-password", forgotPassword)
router.patch("/reset-password", resetPassword)
//Google Authentication
router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }))
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: `${env.CLIENT_URL}/login`, successRedirect: `${env.CLIENT_URL}/` }))
router.get("/auth/google/logout", googleLogout)
router.get("/auth/login/success", googleSuccess)

export default router
