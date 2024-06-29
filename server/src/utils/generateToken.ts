import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.ACCESS_TOKEN_SECRET as string

const generateToken = (id:string): string => {
    return jwt.sign({id}, secret, {expiresIn: '24h'})
}

export default generateToken