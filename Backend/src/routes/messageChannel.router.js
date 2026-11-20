import express from 'express'
import { createMessages, getAllMessagesByChannelId } from "../controllers/messageChannel.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import workspaceMiddleware from "../middlewares/workspace.middleware.js"

const messagesRouter = express.Router({mergeParams: true})

messagesRouter.get(
    '/',
    authMiddleware,
    workspaceMiddleware([]),
    getAllMessagesByChannelId
)

messagesRouter.post(
    '/', 
    authMiddleware, 
    workspaceMiddleware([]),
    createMessages
)

export default messagesRouter