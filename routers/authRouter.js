import express from 'express'
import {
    register,
    confirmarcuenta,
    login,
    resetPassword,
    comprobarTokenPassword,
    restablecerPassword,
    perfil,
    editarPerfil,
    actualizarPassword
} from '../controllers/authController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/register',register);
router.get('/confirmar-cuenta/:tokenConfir',confirmarcuenta)
router.post('/login',login);
router.post('/reset-password',resetPassword);
router
    .route('/reset-password/:tokenConfir')
    .get(comprobarTokenPassword)
    .post(restablecerPassword)

router
    .route('/perfil')
    .get(checkAuth, perfil)
    .put(checkAuth, editarPerfil)

router.put('/modificar-password',checkAuth,actualizarPassword)

export default router