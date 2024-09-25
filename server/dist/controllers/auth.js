"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = exports.VerifyOTP = exports.ForgotPassword = exports.userLogin = exports.RegisterUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.ACCESS_TOKEN_SECRET;
//user login
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email: email.toLowerCase() });
        // console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!' });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Wrong email or password, try again!' });
        }
        const token = jsonwebtoken_1.default.sign({ userID: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        const expiryDate = new Date(Date.now() + 24 * (3600000)); //expire in 24hrs
        res
            .status(200)
            .setHeader("authorization", `Bearer ${token}`)
            .cookie("token", token, { httpOnly: true, secure: false, expires: expiryDate })
            .json({ user, token });
    }
    catch (err) {
        next(err);
    }
});
exports.userLogin = userLogin;
//register user
const RegisterUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            res.status(400).json({ message: 'All field are required' });
            return;
        }
        const duplicateUser = yield user_1.default.findOne({ email: email.toLowerCase() });
        if (duplicateUser) {
            res.status(400).json({ message: 'Email is already in use' });
            return;
        }
        if (password != confirmPassword) {
            res.status(400).json({ message: "Password mismatch" });
        }
        const newUser = new user_1.default({ username, email, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ userID: newUser._id }, secret, { expiresIn: '24h' });
        const expiryDate = new Date(Date.now() + 24 * (3600000)); //expire in 24hrs
        res
            .status(201)
            .header("authorization", `Bearer ${token}`)
            .cookie("token", token, { httpOnly: true, secure: true, expires: expiryDate })
            .json({ newUser, token });
    }
    catch (err) {
        next(err);
    }
});
exports.RegisterUser = RegisterUser;
//ForgotPassword
const ForgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const expires = new Date(Date.now() + 5 * 60 * 1000); //5min timeout
    const otp = crypto_1.default.randomInt(100000, 999999).toString(); //get 6 digit otp
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const verifyUser = yield user_1.default.findOne({ email });
        if (!verifyUser) {
            return res.status(404).json({ message: 'User does not exist, Pls enter an email address associated with your account' });
        }
        verifyUser.otp = otp;
        verifyUser.otpExpires = expires;
        yield verifyUser.save();
        const recipientEmail = verifyUser.email;
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD,
            },
        });
        const mailOptions = {
            to: recipientEmail,
            from: process.env.ADMIN_EMAIL,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. It will expire in ${expires}.`,
        };
        transporter.sendMail(mailOptions);
        res
            .status(200)
            .json({ message: 'OTP sent to email' });
    }
    catch (error) {
        next(error);
    }
});
exports.ForgotPassword = ForgotPassword;
//VerifyOTP
const VerifyOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        ;
        if (user.otpExpires && user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'OTP is invalid' });
        }
        res
            .status(200)
            .json({ message: 'You can now reset a new password' });
    }
    catch (error) {
        next(error);
    }
});
exports.VerifyOTP = VerifyOTP;
//resetPassword
const ResetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, newPassword, confirmNewPassword } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Password mismatch" });
        }
        if (newPassword === user.password) {
            return res.status(400).json({ message: "Please choose a different passwrd" });
        }
        if (user.otpExpires && user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
        user.password = newPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        yield user.save();
        res.status(200).json({ message: 'Password has been reset successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.ResetPassword = ResetPassword;
