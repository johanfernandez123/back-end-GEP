import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import generarId from "../helpers/generarId.js";

const userSchema = mongoose.Schema({
    
    nit:{
        type: String,
        default: '',
    },
    nombre:{
        type: String,
        required: true
    },

    ciudad:{
        type: String,
        default: ''
    },
    direccion:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    celular:{
        type:String,
        default:''
    },
    rol:{
        type: Number,
        default: 1
    },

    tokenConfir:{
        type: String,
        default: generarId()
    },

    tokenConfirPassword:{
        type: String,
        default: null
    },

    confirmado:{
        type:Boolean,
        default: false
    },
},
{
    timestamps: true
}
)

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})


userSchema.methods.compararPassword = async function(passwordCliente){
    return await bcrypt.compare(passwordCliente, this.password)
}


const User = mongoose.model('User',userSchema)

export default  User

