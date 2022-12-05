import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    
    mensaje:{
        type: String,
        required: true
    },

    orden:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orden'
    },

    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},
{
    timestamps: true
}
)


const Msg = mongoose.model('Msg',userSchema)

export default  Msg

