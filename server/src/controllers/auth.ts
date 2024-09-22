import { NextFunction, Request, Response } from "express";
import User from '../models/user';
// import generateToken from "../utils/generateToken";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.ACCESS_TOKEN_SECRET as string

//user login
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
  
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!' });
        } 
                
        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Wrong email or password, try again!' });
        }
        
        const token = jwt.sign({userID: user._id}, secret, {expiresIn: '24h'})

        const expiryDate = new Date(Date.now() + 24*(3600000)) //expire in 24hrs

        res
        .status(200)
        .setHeader("authorization",`Bearer ${token}`)
        .cookie("token", token, {httpOnly: true, secure:false, expires: expiryDate})
        .json({user, token})
    } catch (err) {
        next(err)
    }
};

//register user
const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, confirmPassword} = req.body;

        if (!username || !email || !password || !confirmPassword) {
            res.status(400).json({ message: 'All field are required' });
            return;
        }
    
        const duplicateUser = await User.findOne({ email });
        if (duplicateUser) {
            res.status(400).json({ message: 'Email is already in use' });
            return;
        }

        if(password != confirmPassword){
            res.status(400).json({message: "Password mismatch"})
        }
  
        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = jwt.sign({userID: newUser._id}, secret, {expiresIn: '24h'})
        
        const expiryDate = new Date(Date.now() + 24*(3600000)) //expire in 24hrs
        res
            .status(201)
            .header("authorization", `Bearer ${token}`)
            .cookie("token", token, {httpOnly: true, secure:true, expires: expiryDate})
            .json({newUser, token})
        
        } catch (err) {
            next(err)
        }
};


//ForgotPassword
const ForgotPassword = async(req:Request, res:Response, next: NextFunction) => {
    const expires = new Date(Date.now() + 5 * 60 * 1000); //5min timeout
    const otp = crypto.randomInt(100000, 999999).toString(); //get 6 digit otp
    
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
    
        const verifyUser = await User.findOne({ email });

        if(!verifyUser) {
            return res.status(404).json({ message: 'User does not exist, Pls enter an email address associated with your account' });
        }
    
    
        verifyUser.otp = otp;
        verifyUser.otpExpires = expires;
        await verifyUser.save();
    
        const recipientEmail = verifyUser.email;

        const transporter = nodemailer.createTransport({
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

    } catch (error) {
        next(error)
    }
};


//VerifyOTP
const VerifyOTP = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        const {email, otp} = req.body;

        const user = await User.findOne({email})
    
        if(!user){
            return res.status(400).json({message: 'User not found'})
        };

        if (user.otpExpires && user.otpExpires < new Date() ) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
        if (user.otp !== otp ) {
            return res.status(400).json({ message: 'OTP is invalid' });
        }

        res
        .status(200)
        .json({ message: 'You can now reset a new password'})

    } catch (error) {
        next(error)
    }
};

//resetPassword
const ResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { email, otp, newPassword, confirmNewPassword } = req.body;
    
        const user = await User.findOne({email});
    
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Password mismatch"})
        }

        if(newPassword === user.password){
            return res.status(400).json({message: "Please choose a different passwrd"})
        }

        if (user.otpExpires && user.otpExpires < new Date() ) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
    
        user.password = newPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
    
        await user.save();
    
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        next(error)
    }
};


export {
  RegisterUser,
  userLogin,
  ForgotPassword,
  VerifyOTP,
  ResetPassword
};