import express from 'express'
import { login, register, verifyEmail } from '../controllers/auth.controller.js'

const authRouter = express.Router()

// Validación del email del usuario
authRouter.post('/register', register)

// Cuando un usuario inicia sesión debemos crear de alguna forma la sesion
authRouter.post('/login', login)

authRouter.get('/verify-email/:verify_email_token', verifyEmail )

export default authRouter