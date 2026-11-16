import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'
import { createChannel, getAllChannelsByWorkspaceId, getChannelById } from '../controllers/channels.controller.js'

const channelRouter = express.Router({mergeParams: true})

channelRouter.get(
    '/',
    authMiddleware,
    workspaceMiddleware([]),
    getAllChannelsByWorkspaceId
)

channelRouter.post(
    '/',
    authMiddleware,
    workspaceMiddleware([]),
    createChannel
)

channelRouter.get(
    '/:channel_id',
    authMiddleware,
    workspaceMiddleware([]),
    getChannelById
)

export default channelRouter