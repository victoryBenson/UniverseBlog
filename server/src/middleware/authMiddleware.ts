import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, {IUser} from "../models/user";
import dotenv from 'dotenv';
import { decode } from "punycode";

dotenv.config()

interface AuthRequest extends Request {
    user?: IUser;
}
  
const secret = process.env.ACCESS_TOKEN_SECRET as string

export const protect = async (req: AuthRequest, res: Response, next:NextFunction) => {
    let token;

    const authHeader = req.headers.authorization

    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message: 'Not Authorized, Pls Login'})
    }

    try {
        const decoded: any = jwt.verify(token, secret);

        console.log(req.user)
        req.user = decoded 

        next();

    } catch (error) {
        res.sendStatus(401)
    }
}