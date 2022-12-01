import jwt from "jsonwebtoken";
import User from "../models/usersModels.js";
const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            token = req.headers.authorization.split(' ')[1];
            const decore = jwt.verify(token, process.env.JWT_SECRET)
            const usuarioValidador = await User.findById(decore.id);

            const usuario = {
                _id: usuarioValidador._id,
                nombre: usuarioValidador.nombre,
                email: usuarioValidador.email,
                rol: usuarioValidador.rol,
                direccion: usuarioValidador.direccion,
                ciudad: usuarioValidador.ciudad,
                token
            }
            req.usuario = usuario;

            return next();
        } catch (error) {
            const e = new Error('Token incorrecto ');
            console.log(error);
            return res.status(404).json({ msg: e.message });
        }
    }

    if(!token){
        const error = new Error('Token incorrecto o inexistente');
       return res.status(404).json({ msg: error.message });
    }


    next()
}

export default checkAuth;