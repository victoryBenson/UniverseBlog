import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, {IUser} from "../models/user";
import dotenv from 'dotenv';

dotenv.config()

interface AuthRequest extends Request {
    user?: IUser;
}
  

const secret = process.env.ACCESS_TOKEN_SECRET as string

export const protect = async (req: AuthRequest, res: Response, next:NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message: 'Not Authorized, Pls Login'})
    }

    try {
        const decoded: any = jwt.verify(token, secret);
        (req as any).user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
}