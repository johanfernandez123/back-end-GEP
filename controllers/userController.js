import Orden from "../models/ordenModels.js"; 

const listarOrdenesUsuario = async (req, res) => {
    const ordenes = await Orden.find()
    .where('creador')
    .equals(req.usuario);

    return res.status(200).json(ordenes)
}

const crearOrden = async (req,res) => {
    const {_id} = req.usuario;

    const datos = {...req.body, creador:_id }
    

    const nuevaOrden = new Orden(datos);

    try {
      const resultado =  await nuevaOrden.save();
        return res.status(200).json(resultado);
    } catch (error) {
        console.log(error)
    }
};

const buscarOrden = async (req,res) => {
    const {_id} = req.params;

    const orden = await Orden.findOne({_id});

    if(!orden){
        const error = new Error('Orden no encontrada');
        return res.status(400).json({msg: error.message})
    }

   return res.status(200).json(orden);
}

const editarOrden = async (req, res) => {

    const {
        fecha,
        hora,
        delicado,
        largo,
        ancho,
        alto,
        peso,
        direccion_Recogida,
        ciudad_Recogida,
        nombre_destinatario,
        nit_destinatario,
        direccion_entrega,
        ciudad_entrega,

        _id
    } = req.body

   
    const orden = await Orden.findOne({ _id});

    if (!orden) {
        const error = new Error('Orden no encontrado')
        return res.status(404).json({ msg: error.message })
    }


    if (req.usuario._id.toString() !== orden.creador.toString()) {
        return res.status(403).json({ msg: "accion no valida" })
    }


    orden.fecha = fecha || orden.fecha
    orden.hora = hora || orden.hora
    orden.delicado = delicado || orden.delicado
    orden.largo = largo || orden.largo
    orden.ancho = ancho || orden.ancho
    orden.alto = alto || orden.alto
    orden.peso = peso || orden.peso
    orden.direccion_Recogida = direccion_Recogida || orden.direccion_Recogida
    orden.ciudad_Recogida = ciudad_Recogida || orden.ciudad_Recogida
    orden.nombre_destinatario = nombre_destinatario || orden.nombre_destinatario
    orden.nit_destinatario = nit_destinatario || orden.nit_destinatario
    orden.direccion_entrega = direccion_entrega || orden.direccion_entrega
    orden.ciudad_entrega = ciudad_entrega || orden.ciudad_entrega

   try {
        const ordenModificada = await orden.save()
       return res.status(200).json(ordenModificada)
   } catch (error) {
    console.log(error)
   }
}

const editarEstado = async (req, res) => {
    const {
        _id,
        estado
    } = req.body

    
    const orden = await Orden.findOne({_id});

    if(!orden){
        const error = new Error('Orden no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    if (req.usuario._id.toString() !== orden.creador.toString()) {
        return res.status(403).json({ msg: "accion no valida" })
    }


    if(estado == 'guardado'){
        orden.estado = 'cancelado';
        try {
          const ordenActualizada =  await orden.save();
            return res.status(200).json([{msg: "Cancelado correctamente"}, ordenActualizada])
        } catch (error) {
            console.log(error)
        }
    }else{
        orden.estado = 'guardado';
        try {
            await orden.save();
            const ordenActualizada =  await orden.save();
            return res.status(200).json([{msg: "Activado correctamente"},ordenActualizada])
        } catch (error) {
            console.log(error)
        }
    }

    
}

export {
    crearOrden,
    editarOrden,
    editarEstado,
    listarOrdenesUsuario,
    buscarOrden
}