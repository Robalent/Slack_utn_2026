import mongoose from "mongoose";
import ENVIRONMENT from "./environment.config.js";

let connectionPromise = null;
async function connectMongoDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(
            `${ENVIRONMENT.MONGO_DB_URI}/${ENVIRONMENT.MONGO_DB_NAME}`,
            {
                serverSelectionTimeoutMS: 10000
            }
        ).catch(error => {
            connectionPromise = null;
            throw error;
        });
    }
    await connectionPromise;
    return mongoose.connection;
}
export default connectMongoDB;




// import mongoose from "mongoose"
// import ENVIRONMENT from "./environment.config.js"



// async function connectMongoDB(){
//     try {
//         await mongoose.connect(
//         `${ENVIRONMENT.MONGO_DB_URI}/${ENVIRONMENT.MONGO_DB_NAME}` 
//         )
//         console.log('conexión a MongoDB exitosa!')
        
//     } catch (error) {
//         console.error('Error crítico al conectar a MongoDB', error.message)

//         /* Crasheo controlado */
//         // process.exit(1)
//     }
    
// }

// export default connectMongoDB