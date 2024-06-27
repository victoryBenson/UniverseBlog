import { Router } from "express";
import { userLogin, userRegister } from "../controllers/auth";



const router = Router();

//register user
router.post('/register', userRegister);

// Login user
router.post('/login', userLogin);


export default router