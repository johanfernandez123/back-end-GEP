import express from 'express'
import dotenv from 'dotenv'
import connectMongoose from './config/dbConfig.js';
import cors from 'cors'
import auth from './routers/authRouter.js'
import usuario from './routers/userRouter.js'
import msg from './routers/msgRouter.js'
import repartidor from './routers/repartidorRouter.js'
import admin from './routers/adminRouter.js'
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


app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/usuario',usuario);
app.use('/api/msg',msg)
app.use('/api/repartidor',repartidor)
app.use('/api/administrador',admin)


const PORT = process.env.PORT || 4000
app.listen(PORT,() => {
    console.log(`Aplicacion corriendo en el puerto ${PORT}`)
})