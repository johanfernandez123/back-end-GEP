import express from 'express'
import { 
    listarRepartidores,
    listarAdministradores,
    crearUsuarioAdmin,
    buscarUsuario,
    editarUsuario 
} from '../controllers/adminController.js';
import checkAuth from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/',checkAuth, listarRepartidores);
router.get('/listar-admins',checkAuth, listarAdministradores);
router.post('/crear',checkAuth,crearUsuarioAdmin);
router.get('/buscar-usuario/:_id',checkAuth, buscarUsuario);
router.put('/modificar-usuario',checkAuth, editarUsuario);

export default router