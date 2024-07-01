import { Router } from "express";
import { userLogin, userRegister } from "../controllers/auth";
// import {protect} from "../middleware/authMiddleware";


const router = Router();

router.post('/register', userRegister);
router.post('/login', userLogin);


export default router