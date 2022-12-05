import express from 'express'
import checkAuth from '../middleware/authMiddleware.js';
import { 
    listarOrdenes,
    listarOrdenesRecogidas,
    listarOrdenesEntregadas,
    recogerOrden,
    entregarOrden
 } from '../controllers/repartidorController.js';

const router = express.Router();



router.get('/',checkAuth,listarOrdenes)
router.get('/ordenes-recogidas',checkAuth,listarOrdenesRecogidas)
router.get('/ordenes-entregadas',checkAuth,listarOrdenesEntregadas)
router.put('/recoger-orden',checkAuth,recogerOrden)
router.put('/entregar-orden',checkAuth,entregarOrden)

export default router;