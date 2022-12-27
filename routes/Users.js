import express from 'express';
import {getUsers, register, login, logout, token} from '../controllers/Users.js';
import {VerifyToken} from '../middlewears/VerifyToken.js';


const router = express.Router();

router.get('/users', VerifyToken, getUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout)
router.get('/token', VerifyToken, token)


export default router;