import { NextFunction, Request, Response } from "express";
import User from '../models/user';
import generateToken from "../utils/generateToken";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
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
      .json(user)
    } catch (err) {
       next(err)
    }
  }

//register user
const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ message: 'All field are required' });
        return;
      }
  
      const duplicateUser = await User.findOne({ email });
      if (duplicateUser) {
        res.status(400).json({ message: 'Email is already in use' });
        return;
      }
  
      const newUser = new User({ username, email, password });
      await newUser.save();

      const token = jwt.sign({userID: newUser._id}, secret, {expiresIn: '24h'})
      
      const expiryDate = new Date(Date.now() + 24*(3600000)) //expire in 24hrs
      res
      .status(201)
      .header("authorization", `Bearer ${token}`)
      .cookie("token", token, {httpOnly: true, secure:true, expires: expiryDate})
      .json(newUser)
      
    } catch (err) {
        next(err)
    }
}


export {
  userRegister,
  userLogin
}