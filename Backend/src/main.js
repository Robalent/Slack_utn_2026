import connectMongoDB from "./config/mongo.config.js";
connectMongoDB()


/*
Hacer un servidor http con NODE.js
Para esto vamos a usar una librería llamada express.js
express es una libreria de node.js que nos permite conectarnos a internet
 */

import express, { request, response } from 'express'
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import cors from 'cors'
import ENVIRONMENT from './config/environment.config.js'

const PORT = ENVIRONMENT.PORT

// se crea una app de express (server HTTP)
const app = express()

//Deshabilita la cors policy = cualquiera puede consultar
app.use(cors())
// configuramos nuestra api para que por body pueda ser tipo de dato json
// esto es un middleware
// cada vez que llegue una consulta, el middleware revisara si el request.header['Content-Type'] es 'application/json'
// y transformara el JSON recibido y lo guardara en request.body 
app.use(express.json())

app.use(async (req, res, next) => {
    try {
        await connectMongoDB();
        next();
    } catch (error) {
        console.error("Error conectando MongoDB:", error);
        res.status(503).json({
            message: "No se pudo conectar a la base de datos"
        });
    }
});


// si me haccen un GET a la dirección /api/status activar tal funcion
app.get(
    '/api/status',
    (request, response) => {
        // throw new ServerError("No estas autentificado, 401")
        response.send(`<h1> Request recibida </h1>`)
    }
)

// Devolver un listado de usuarios
// GET /api/users
// Devolver un JSON/HTML con el listadito de usuarios

// Trae la info de un cierto usuario por ID 
// GET /api/users/:user_id
// user_id es un parametro de URL, básicamente es un valor que va a variar y nosotros podemos acceder a el 
// Un GET a /api/users/1 o /api/users/2 


app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/workspace', workspaceRouter)

app.use(
    errorHandlerMiddleware
)


// destinamos un puerto de nuestra pc para que esta app se escuche 
app.listen(
    PORT, 
    // si funcionó el listen entonces se ejecutara esta función
    () => {
        console.log(`El servidor se está escuchando correctamente en http://localhost:${PORT}`)
    }
)

//channel_repository.create("General","6ac4f114cb512bc85b55f0e8","6ab27329ad368782581a1a1e")
//channel_repository.updateById("6ac4f5ff92927ccb5ed9031e", {description:"canal de prueba"})

//workspace_repository.create("Contabilidad Argentina S.A", "Espacio de trabajo del área de contabilidad")