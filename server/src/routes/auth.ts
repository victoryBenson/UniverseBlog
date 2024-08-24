import { Router } from "express";
import { userLogin, RegisterUser, ForgotPassword, VerifyOTP, ResetPassword } from "../controllers/auth";


const router = Router();

router.post('/register', RegisterUser);
router.post('/login', userLogin);
router.post('/forgotPassword', ForgotPassword);
router.post('/verifyOTP', VerifyOTP);
router.post('/resetPassword', ResetPassword)


export default router