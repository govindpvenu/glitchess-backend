import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import User from "../models/userModel"

//*@route GET /api/user/get-all-users
const getUsersForRanking = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ rating: -1 })
    res.status(200).json(users)
})

//*@route GET /api/user/profile
const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const loggedInUserId = (req.user as any)._id
    const user = await User.findOne({ _id: loggedInUserId })
    res.status(200).json(user)
})

//*@route PATCH /api/user/update-user
const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const loggedInUserId = (req.user as any)._id
    await User.updateOne({ _id: loggedInUserId }, { username: req.body.userName, bio: req.body.bio })
    const user = await User.findOne({ _id: loggedInUserId })
    console.log(user)
    res.status(200).json(user)
})

export { getUsersForRanking, updateUser, getProfile }
