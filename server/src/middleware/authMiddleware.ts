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

        console.log(decoded.userID)
        console.log("hello")

        // const user = await User.findById(decoded.userID).select('-password');
        // (req as any).user = user
        // console.log(user)

        req.body.user = decoded

        next();

      } catch (error) {
        res.sendStatus(401)
      }

    // try {
        
    //     const decoded = jwt.verify(token, secret);

    //     // Attach user information to request object
    //     req.body.user = decoded;

    //     next();

    //   } catch (error) {

    //     return res.status(401).json({ message: 'Invalid or expired token' });
    //   }

    // jwt.verify(token, secret, (err, user) => {
    //     if (err) {
    //       return res.sendStatus(403); // Forbidden
    //     }
    //    ( req as any).user = user;
    //     next();
    //   });
}