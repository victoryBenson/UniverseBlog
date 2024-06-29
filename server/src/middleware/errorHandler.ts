import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
dotenv.config()

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    const statusCode = err.statusCode || 500
    const env = process.env.NODE_ENV || "development"

    if(env === "development"){
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
            error: err
        })
    }else {
        res.status(statusCode).json({
            message: "Something went wrong, Pls try again!"
        })
    }
}

export default errorHandler;