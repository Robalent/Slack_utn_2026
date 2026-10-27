// Un server error son errores contemplados del lado del servidor 
// Los vamos a diferenciar de los errores comunes porque tienen status
class ServerError extends Error{
    constructor (message, status){
        super(message)
        this.status = status
    }
}

export default ServerError

// throw sirve 