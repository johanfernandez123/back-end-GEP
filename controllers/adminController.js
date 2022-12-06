import User from "../models/usersModels.js"

const listarRepartidores = async (req, res) => {
    const {rol} = req.usuario;

    if(rol != 3){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }

    const repartidores = await User.find().find({rol : 2})

    return res.status(200).json(repartidores);

}

const listarAdministradores = async (req, res) => {
    const {rol} = req.usuario;

    if(rol != 3){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }

    const repartidores = await User.find().find({rol : 3})

    return res.status(200).json(repartidores);

}


const crearUsuarioAdmin = async (req,res) => {
    const {rol} = req.usuario;

    if(rol != 3){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }

    const usuario = await new User(req.body);

    usuario.tokenConfir = null
    usuario.confirmado = true

    try {

      const nuevoUsuario =  await usuario.save();

     return res.status(200).json(nuevoUsuario)
        
    } catch (error) {
        console.log(error)
    }
}


const buscarUsuario = async (req,res) => {
    const {_id} = req.params;
    const {rol} = req.usuario;

    if(rol != 3){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }

    const usuario = await User.findOne({_id});

    if(!usuario){
        const error = new Error('Usuario no encontrado');
        return res.status(401).json({msg: error.message})
    }

    return res.status(200).json(usuario)
}

const editarUsuario = async (req, res) => {


    if(req.usuario.rol != 3){
        const error = new Error('Accion no permitida');
       return res.status(400).json({msg: error.message})
    }


    const {
      nit,
      nombre,
      celular,
      email,
      rol,
      _id
    } = req.body

   
    const usuario = await User.findOne({ _id});

    if (!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ msg: error.message })
    }


    usuario.nit = nit || usuario.nit
    usuario.nombre = nombre || usuario.nombre
    usuario.celular = celular || usuario.celular
    usuario.email = email || usuario.email
    usuario.rol = rol || usuario.rol


   try {
        const usuarioModificada = await usuario.save()
       return res.status(200).json(usuarioModificada)
   } catch (error) {
    console.log(error)
   }
}

export{
    listarRepartidores,
    listarAdministradores,
    crearUsuarioAdmin,
    buscarUsuario,
    editarUsuario 
}