import Msg from "../models/msgModels.js";
import Orden from "../models/ordenModels.js";

const crearMensaje = async (req,res) => {
   const {_id} = req.usuario;
   const {msg, orden} = req.body;

   const existeOrden = await Orden.findOne({_id: orden});

   if(!existeOrden){
    const error = new Error('Orden no encontrada');
    return res.status(404).json({msg: error.message})
   }

   const nuevoMsg = await new Msg({
    mensaje: msg,
    orden,
    creador: _id   
    })

   try {
    await nuevoMsg.save();
   return res.status(200).json(nuevoMsg);
    
   } catch (error) {
    console.log(error);
   }
   

    

}

const listarMensajes = async (req,res) => {
    const {orden} = req.params

    const mensajes = await Msg.find({orden})
    return res.status(200).json(mensajes)

}

export {
    crearMensaje,
    listarMensajes
}
