import Orden from "../models/ordenModels.js";

const listarOrdenes = async (req,res) => {
   const {rol} = req.usuario;
    if(rol != 2){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }

    const ordens = await Orden.find().find({estado: "guardado",repartidor:null})

    return res.status(200).json(ordens);
}


const listarOrdenesRecogidas = async (req,res) => {
    const {rol,_id} = req.usuario;
    if(rol != 2){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }

    const ordens = await Orden.find().find({estado: "recogido",repartidor:_id})

    return res.status(200).json(ordens);
}

const listarOrdenesEntregadas = async (req,res) => {
    const {rol,_id} = req.usuario;
    if(rol != 2){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }

    const ordens = await Orden.find().find({estado: "entregado",repartidor:_id})

    return res.status(200).json(ordens);
}

const recogerOrden = async (req, res ) => {
    const {
        _id,
    } = req.body

    
    const orden = await Orden.findOne({_id});

    if(!orden){
        const error = new Error('Orden no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    orden.estado = 'recogido';
    orden.repartidor = req.usuario._id

    try {
        await orden.save();
        return res.status(200).json(orden);
    } catch (error) {
        
    }
}


const entregarOrden = async (req, res ) => {
    const {
        _id,
    } = req.body

    
    const orden = await Orden.findOne({_id});

    if(!orden){
        const error = new Error('Orden no encontrado')
        return res.status(404).json({ msg: error.message })
    }

    orden.estado = 'entregado';
    try {
        await orden.save();
        return res.status(200).json(orden);
    } catch (error) {
        
    }
}

export{
    listarOrdenes,
    listarOrdenesRecogidas,
    listarOrdenesEntregadas,
    recogerOrden,
    entregarOrden
}