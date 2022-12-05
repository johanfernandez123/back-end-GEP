import mongoose from "mongoose";
import { nanoid } from 'nanoid'

const ordenSchema = mongoose.Schema({
    nServicio: {
        type: String,
        default:  nanoid(5)
    },
    fecha:{
        type: String,
        required: true
    },

    hora:{
        type: String,
        required: true
    },
    delicado:{
        type: Boolean,
        required: true
    },

    largo:{
        type: Number,
        required: true
    },
    ancho:{
        type: Number,
        required: true
    },
    alto:{
        type: Number,
        required: true
    },
    peso:{
        type: Number,
        required: true
    },

    direccion_Recogida:{
        type: String,
        required: true
    },
    ciudad_Recogida:{
        type: String,
        required: true
    },
    nombre_destinatario:{
        type: String,
        required: true
    },
    nit_destinatario:{
        type: String,
        required: true
    },
    direccion_entrega:{
        type: String,
        required: true
    },
    ciudad_entrega:{
        type: String,
        required: true
    },
    
    estado:{
        type: String,
        default: 'guardado'
    },

    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    repartidor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
   
},
{
    timestamps: true
}
)


const Orden = mongoose.model('Orden',ordenSchema)

export default  Orden

