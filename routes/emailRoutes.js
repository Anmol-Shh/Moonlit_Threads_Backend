import express from 'express';
import { sendTestEmail } from '../controllers/emailControllers.js';

const router = express.Router();

router.post('/send-email', sendTestEmail);

export default router;
