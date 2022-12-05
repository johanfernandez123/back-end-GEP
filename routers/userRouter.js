import express from 'express'
import checkAuth from '../middleware/authMiddleware.js';
import { 
    crearOrden,
    editarOrden,
    editarEstado,
    listarOrdenesUsuario,
    buscarOrden,
} from '../controllers/userController.js';

const router = express.Router();



router
.route('/orden')
.get(checkAuth,listarOrdenesUsuario)
.post(checkAuth,crearOrden)
.put(checkAuth,editarOrden)

router.get('/orden/:_id',checkAuth,buscarOrden)

router.put('/editar-estado',checkAuth, editarEstado)



export default router;