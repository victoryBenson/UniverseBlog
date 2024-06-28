import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { Types } from "mongoose";

//getUsers
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const users = await User.find({}).select("-password").sort("-createdAt");

        if (!users?.length) {
            return res.status(400).json({ message: "No user found!" });
        }

        res.status(200).json(users);
      
    } catch (err) {
        next(err)
    }
};


//single user
const getUser = async (req: Request, res: Response, next: NextFunction) => { 
    try {

        const userId = req.params.id
        if(!Types.ObjectId.isValid(userId)){
            return res.status(400).json({message: "Invalid user Id"})
        }

        const user = await User.findById(userId).select('-password').sort("-createdAt");

        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        res.status(200).json(user);
      
    } catch (err) {
        next(err)
    }
};

//update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const userId = req.params.id
        if(!Types.ObjectId.isValid(userId)){
            return res.status(400).json({message: "Invalid user Id"})
        }

        const userDetails = req.body
        const user = await User.findByIdAndUpdate(userId, userDetails, { new: true }).select('-password').sort("-createdAt");

        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        res.status(200).json(user);
      
    } catch (err) {
        next(err)
    }
};


export {
    getUser,
    getUsers,
    updateUser
}