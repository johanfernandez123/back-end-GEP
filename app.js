import express from 'express'
import dotenv from 'dotenv'
import auth from './routers/authRouter.js'
import connectMongoose from './config/dbConfig.js';
import cors from 'cors'

// variables de entorno 
dotenv.config();


const app = express()
connectMongoose();


const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin,callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // el origen reques esta permitido
            callback(null,true)
        }else{
            callback(new Error('Error CORS no permitido'))
        }
    }
};

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/auth',auth)
// app.use('/api/usuario')

// app.use('/api/repartidor')
// app.use('/api/administrador')


const PORT = process.env.PORT || 4000
app.listen(PORT,() => {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`)
})