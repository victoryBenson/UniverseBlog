import { Request, Response } from "express";
import User from "../models/user";

//getUsers
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select("-password").sort("-createdAt");

        if (!users?.length) {
            return res.status(400).json({ message: "No user found!" });
        }

        res.status(200).json(users);
      
    } catch (err) {
        const error = err as Error;
      res.status(500).json(error.message);
    }
};
