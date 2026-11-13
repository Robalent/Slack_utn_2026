import express from 'express'
import {
    login,
    register,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword
} from '../controllers/auth.controller.js'

const authRouter = express.Router()

// Validación del email del usuario
authRouter.post('/register', register)

// Cuando un usuario inicia sesión debemos crear de alguna forma la sesion
authRouter.post('/login', login)

// Cuando un usuario hace click en el link del email, el frontend lo recibe
// por querystring y nos lo reenvía acá para validarlo
authRouter.get('/verify-email', verifyEmail )
// Ejemplo: GET /api/auth/verify-email?verification_token=xxxxx

// Cuando el usuario no recibió el mail de verificación puede pedir uno nuevo
authRouter.get('/verify-email/:email/resend', resendVerificationEmail)
// Ejemplo: GET /api/auth/verify-email/pepe@gmail.com/resend

// El usuario olvidó su contraseña: le enviamos un mail con el link para restablecerla
authRouter.post('/forgot-password', forgotPassword)
// Ejemplo: POST /api/auth/forgot-password  { email }

// Con el token del mail, el usuario define una contraseña nueva
authRouter.post('/reset-password', resetPassword)
// Ejemplo: POST /api/auth/reset-password  { reset_token, password }

export default authRouter