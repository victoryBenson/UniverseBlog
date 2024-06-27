import { Request, Response } from "express";
import User from '../models/user';


//user login
const userLogin = async (req: Request, res: Response) => {
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
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        const error = err as Error;
      res.status(500).json(error.message);
    }
  }

//register user
const userRegister = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
  
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
      
    } catch (err) {
        const error = err as Error
      res.status(500).json(error.message);
    }
}


export {
  userRegister,
  userLogin
}