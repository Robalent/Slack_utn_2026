import express from 'express'
import authMiddleware from "../middlewares/auth.middleware.js"
import workspaceMiddleware from "../middlewares/workspace.middleware.js"
import { getAllMembershipsByWorkspaceId } from '../controllers/member.controller.js'

const memberRouter = express.Router({mergeParams: true})

memberRouter.get(
    '/',
    authMiddleware,
    workspaceMiddleware([]),
    getAllMembershipsByWorkspaceId
)

export default memberRouter