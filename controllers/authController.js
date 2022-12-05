import User from "../models/usersModels.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePasword from "../helpers/emailRecuperarPassword.js";

const register = async (req, res) => {
    const { nombre, correo, password } = req.body;

    // verificar que todos los campos esten llenos
    if ([nombre, correo, password].includes('')) {
        return res.status(403).json({ msg: "Todos los campos son requeridos" })
    }

    //verificar que el correo no exista
    const existeUsuario = await User.findOne({ email:correo })

    if (existeUsuario) {
        const error = new Error('El correo ya se encuntra registrado')
        return res.status(400).json({ msg: error.message })
    }

    //insertar Usuario
    const usuario = await new User({
        nombre,
        email: correo,
        password
    })

    const usuarioGuardado = await usuario.save();

    // Mandar email
    emailRegistro({
        email: correo,
        nombre,
        token: usuarioGuardado.tokenConfir          
    })

    return res.status(201).json({ msg: "Revisa tu correo para el siguiente paso" })
}


const confirmarcuenta = async (req, res) => {
    const { tokenConfir } = req.params

    //verificar que si exista el token
    const existeToken = await User.findOne({ tokenConfir })

    if (!existeToken) {
        const error = new Error('Parametro invalido')
        return res.status(403).json({ msg: error.message })
    }

    //confirmar la cuenta

    try {
        existeToken.tokenConfir = null;
        existeToken.confirmado = true;

        const tokenConfirmado = await existeToken.save();

        res.status(200).json({msg: "Cuenta confirmada correctamente"})
    } catch (error) {
        console.log(error)
    }

}


const login = async (req, res) => {
    const {correo,password} = req.body

    if ([correo, password].includes('')) {
        return res.status(403).json({ msg: "Todos los campos son requeridos" })
    }


    //confirmar que el correo exista
    const exiteCuenta = await User.findOne({email:correo})
    if(!exiteCuenta){
        const error = new Error('Correo no registrado')
        return res.status(400).json({msg: error.message})
    }

    //confirmar que la cuenta este confirmada
    if(!exiteCuenta.confirmado){
        const error = new Error('Cuenta no confirmada')
        return res.status(401).json({msg: error.message})
    }
    //comparar claves
    const passworCorrecto = await exiteCuenta.compararPassword(password)

    if(!passworCorrecto){
        const error = new Error('Contraseña incorrecta')
        return res.status(400).json({msg: error.message})
    }

    
    //retornar objeto
    return res.status(202).json({
        _id: exiteCuenta._id,
        nombre: exiteCuenta.nombre,
        email: exiteCuenta.email,
        rol: exiteCuenta.rol,
        direccion: exiteCuenta.direccion,
        ciudad: exiteCuenta.ciudad,
        token: generarJWT(exiteCuenta.id,exiteCuenta.rol)
    })

}


const resetPassword = async (req, res) => {
    const {correo} = req.body;

    if(correo == ''){
        const error = new Error('El correo es obligatorio')
        return res.status(400).json({msg: error.message})
    }

    const existeCorreo = await User.findOne({email: correo})
    //confirmar que exista

    if(!existeCorreo){
        const error = new Error('Correo no registrado')
        return res.status(400).json({msg: error.message})
    }

    //modificar token
    const token = generarId();
    try {
        existeCorreo.tokenConfirPassword = token;
        await existeCorreo.save();

        //enviar email
        const datos ={
            email: correo,
            nombre:existeCorreo.nombre,
            token: token
        }

        emailOlvidePasword(datos)

        res.status(200).json({msg: "Revisa tu correo para el siguiente paso"})
    } catch (error) {
        console.log(error)
    }

}

const comprobarTokenPassword = async (req,res) => {
    const { tokenConfir } = req.params

    //verificar que si exista el token
    const existeToken = await User.findOne({ tokenConfirPassword:tokenConfir })

    if (!existeToken) {
        const error = new Error('Parametro invalido')
        return res.status(403).json({ msg: error.message })
    }

    return res.status(200).json({msg:"Introduce tu nueva contraseña"})

}


const restablecerPassword = async (req,res) => {
    const {tokenConfir} = req.params
    const {password} = req.body

     //verificar que si exista el token
     const usuario = await User.findOne({ tokenConfirPassword:tokenConfir })

     if (!usuario) {
         const error = new Error('Parametro invalido')
         return res.status(403).json({ msg: error.message })
     }

     try {
        usuario.tokenConfirPassword = null;
        usuario.password = password;
        await usuario.save();
        return res.status(200).json({msg: "Contraseña modificada correctamente"})
     } catch (error) {
        console.log(error)
     }

}


const perfil = (req, res) => {
    const {usuario} = req;
    res.json(usuario)
}


const editarPerfil = async (req,res) => {
   const {nombre,ciudad,direccion,correo, _id} = req.body

   const usuario = await User.findById(_id)

   if(!usuario){
    const error = new Error('Ocurrio un error');
    return res.status(400).json({msg: error.message})
   }

   usuario.nombre = nombre
   usuario.ciudad =ciudad
   usuario.direccion = direccion
   usuario.email = correo

   try {
        await usuario.save();
       return res.status(200).json({msg: "Datos modificados correctamente"})
   } catch (error) {
    console.log(error);

   }

}

const actualizarPassword = async (req,res) => {
    // Leer datos
    const {_id} = req.usuario
    const {password,nuevopassword} = req.body
    //Comprobar que el veterinario existe
    const usuarioExiste = await User.findById(_id);
    if(!usuarioExiste){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message})
    }

    //comprobar su password
    if(await usuarioExiste.compararPassword(password)){
        // Almacenar el nuevo password
        usuarioExiste.password = nuevopassword;
        await usuarioExiste.save();
        return res.json({msg: 'Contraseña Modificada Correctamente'})
    }else{
        const error = new Error('La contraseña actual es incorrecta');
        return res.status(400).json({msg: error.message})
    }

    
}


export {
    register,
    confirmarcuenta,
    login,
    resetPassword,
    comprobarTokenPassword,
    restablecerPassword,
    perfil,
    editarPerfil,
    actualizarPassword

}