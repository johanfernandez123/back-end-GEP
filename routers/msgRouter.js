import express from 'express'
import checkAuth from '../middleware/authMiddleware.js';
import { 
    crearMensaje,
    listarMensajes
} from '../controllers/msgController .js';
const router = express.Router();



router.post('/create',checkAuth,crearMensaje);

router.get('/:orden',checkAuth,listarMensajes);




export default router;