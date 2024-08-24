import { NextFunction, Request, Response } from "express";
import User from '../models/user';
import generateToken from "../utils/generateToken";
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
  
        const user = await User.findOne({ email }).lean();
        
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        } 
                
        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        
        const token = jwt.sign({userID: user._id}, secret, {expiresIn: '24h'})

        const expiryDate = new Date(Date.now() + 24*(3600000)) //expire in 24hrs

        res
        .status(200)
        .setHeader("authorization", `Bearer ${token}`)
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
    const otp = crypto.randomInt(100000, 999999).toString(); //get 6 digit otp
    const expires = new Date(Date.now() + 5 * 60 * 1000); //5min timeout

    try {
        const { email } = req.body;
        
        if (!email) {
            res.status(400).json({ message: 'Email is required' });
            return;
        }
    
        const verifyUser = await User.findOne({ email });

        if(!verifyUser) {
            return res.status(404).json({ message: 'User does not exist, check the mail and try again' });
        }
    
        verifyUser.resetPasswordOtp = otp;
        verifyUser.resetPasswordExpires = expires;
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


//OTP
const VerifyOTP = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        
        const {otp} = req.body;
        
        const confirmOTP = await User.findOne({resetPasswordOtp: otp})
    
        
        if(!confirmOTP){
            return res.status(400).json({message: 'OTP is invalid or has expired'})
        };

        // if (user.otpExpiresAt < new Date()) {
        //     res.status(400).json({ message: 'OTP has expired' });
        //     return;
        // }
    
        res
        .status(200)
        .json({ message: 'You can now reset a new password'})
    } catch (error) {
        next(error)
    }
}

//resetPassword
const ResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { email, otp, newPassword } = req.body;
    
        const user = await User.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordExpires: { $gt: Date.now() },
        });
    
        if (!user) {
            return res.status(400).json({ message: 'OTP is invalid or has expired' });
        }
    
        user.password = newPassword; // Ensure you hash the password before saving
        // user.resetPasswordOtp = undefined;
        user.resetPasswordExpires = undefined;
    
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
}