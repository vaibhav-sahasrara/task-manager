import express from 'express';
import { register, login, getClients  } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/clients", getClients);

export default router;
