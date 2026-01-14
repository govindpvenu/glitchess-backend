import express from "express"
import { getUsersForRanking, updateUser, getProfile } from "../controllers/userController"
import { protect } from "../middlewares/passportAuth"

const router = express.Router()

router.get("/get-all-users", protect, getUsersForRanking)
router.get("/profile", protect, getProfile)
router.patch("/update-user", protect, updateUser)

export default router
