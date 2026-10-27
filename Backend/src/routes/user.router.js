import express from 'express'
import { getUsers, getUsersById } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:user_id', getUsersById)

export default userRouter