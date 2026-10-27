import ENVIRONMENT from "../config/environment.config.js"
import ServerError from "../utils/error.util.js"
import jwt from 'jsonwebtoken'


function authMiddleware(request, response, next) {
    try {
        // Cuando un usuario haga alguna operacion que necesite auth:
        // - Crear un espacio de trabajo
        // - Crear un mensaje 

        // Vamos a recibir de los headers de la consulta el auth_token, lo solemos esperar en 
        // un header llamado authorization pero poder cambiarlo

        const auth_header = request.headers.authorization
        if (!auth_header){
            throw new ServerError ('Auth header is required', 400)
        }
        // auth_header.split(' ') = ['Bearer', 'token_value']
        const auth_token = auth_header.split(' ')[1] // devuelve token_value
        if(!auth_token){
            throw new ServerError ('Auth header is malformed', 400)
        }

        // verifica la firma, para ver si coinciden (si falla lanza error) 
        const {id, name, email} = jwt.verify(auth_token, ENVIRONMENT.JWT_SECRET_KEY)

        request.user = {
            id: id,
            name: name,
            email: email
        }
        // que vaya al sig middleware/controlador
        next()
    } catch (error) {
        // si hubo un fallo al verificar el token
        if(
            error instanceof jwt.JsonWebtokenError // falla verificación o está mal escrito
            ||
            error instanceof jwt.NotBeforeError // Es un token del futuro 
            ||
            error instanceof jwt.TokenExpiredError // Es un token expirado
        ){
            return response.status(401).send({
                ok:false,
                status:401,
                message: 'Auth token is invalid'
            })
        }
        if (error.status) {
            return response.status(error.status).send(
                {
                    ok: false,
                    status: error.status,
                    message: error.message
                }
            )
        }
        console.log('[Middleware de error]:', error)
        // error genérico 

        return response.status(500).send(
            {
                ok: false,
                status: 500,
                message: 'Internal server error'
            }
        )
    }
}

export default authMiddleware