import express from 'express';
import { register, login, getClients, getAllUsers  } from '../controllers/authController.js';
// import { authMiddleware, isAdmin } from "../middleware/auth.js";
// import { auth } from "../middleware/auth.js";
// import { auth } from '../middleware/auth.js'
// import auth from "../middleware/auth.js";
import { auth, verifyAdmin } from "../middleware/auth.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/clients", getClients);
// router.get("/", authMiddleware, getAllUsers); 
// router.get("/users", auth, verifyAdmin, getAllUsers); 

router.get("/users", auth, getAllUsers);


export default router;
