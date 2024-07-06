import { NextFunction, Request, Response } from "express";
import Blog from "../models/blog";
import { Types } from "mongoose";

const createBlog = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const newBlog = new Blog(req.body);
        if(!newBlog){
            return res.sendStatus(204)
        }
        
        const savedBlog = await newBlog.save();
        res.sendStatus(201).json(savedBlog);
      } catch (err) {
        res.sendStatus(400).send(err);
      }
};

const getBlogs = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const blogs = await Blog.find({}).sort("-createdAt")

        if(!blogs){
            return res.sendStatus(400).json({message: "user not found"})
        };

        res.sendStatus(200).json(blogs)
    } catch (error) {
        next(error)
    }
};


//single user
const getBlog = async (req: Request, res: Response, next: NextFunction) => { 
    try {

        const blogId = req.params.id
        if(!Types.ObjectId.isValid(blogId)){
            return res.sendStatus(400).json({message: "Invalid blogId"})
        }

        const blog = await Blog.findById(blogId)

        if(!blog) {
            return res.sendStatus(400).json({ message: "User does not exist!" });
        }

        res.sendStatus(200).json(blog);
      
    } catch (err) {
        next(err)
    }
};

const deleteBlog = async(req:Request, res:Response, next:NextFunction) => {
    const blogId = req.params.id
    try {
        if(!blogId){
            return res.sendStatus(400).json({message: "Invalid blog Id"})
        }
    
        const blog = await Blog.findByIdAndDelete(blogId)
    
        if(!blog){
            return res.sendStatus(400).json({message: "blog not found"})
        }
    } catch (error) {
       next(error) 
    }

};

const updateBlog = async(req:Request, res:Response, next:NextFunction) => {
    const blogId = req.params.id;
    try {
        if(!blogId){
            return res.sendStatus(400).json({message: "Invalid blog Id"})
        }

        const blogDetails = req.body;
        const options = { new: true, runValidators: true }

        const blog = await Blog.findByIdAndUpdate(blogId, blogDetails, options)

        if(!blog){
            return res.sendStatus(400).json({message: "user does not exist"})
        }

       
        res.sendStatus(200).json(blog)
    } catch (error) {
        next(error)
    }
}




export {
    getBlog,
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog
}