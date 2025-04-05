// /routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
