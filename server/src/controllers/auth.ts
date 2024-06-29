import { NextFunction, Request, Response } from "express";
import User from '../models/user';
import generateToken from "../utils/generateToken";


//user login
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // verify password 
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      
      const token = generateToken(user.id)
      const expiryDate = new Date(Date.now() + 24*(3600000)) //expire in 24hrs

      res
      .status(201)
      .json(token)
      .header("authorization", `Bearer ${token}`)
      .cookie("token", token, {httpOnly: true, secure:true, expires: expiryDate})

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

      const token = generateToken(newUser.id);
      const expiryDate = new Date(Date.now() + 24*(3600000)) //expire in 24hrs
      res
      .status(201)
      .json(newUser)
      .header("authorization", `Bearer ${token}`)
      .cookie("token", token, {httpOnly: true, secure:true, expires: expiryDate})
      
    } catch (err) {
        next(err)
    }
}


export {
  userRegister,
  userLogin
}