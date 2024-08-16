import { NextFunction, Request, Response } from "express";
import Blog from "../models/blog";
import { Types } from "mongoose";


//create_blog
const createBlog = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {author, title, content, label, readTime} = req.body
        const imagePath = req.file?.path;
    
        if(!imagePath){
            return res.status(400).json({message: "Please upload an image!"})
        };

        const newBlogData = {
            author, 
            title,
            content, 
            label, 
            readTime, 
            image: imagePath
        };

        const newBlog = new Blog(newBlogData);
        await newBlog.save();

        res.status(201).json(newBlog);
      } catch (err) {
        next(err)
      }
};


//get_blog
const getBlogs = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const blogs = await Blog.find({}).sort("-createdAt")

        if(!blogs){
            return res.status(400).json({message: "blog not found"})
        };

        res.status(200).json(blogs)
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
            return res.status(400).json({ message: "blog does not exist!" });
        }

        res.status(200).json(blog);
      
    } catch (err) {
        next(err)
    }
};


//deleteBlog
const deleteBlog = async(req:Request, res:Response, next:NextFunction) => {
    const blogId = req.params.id
    try {
        if(!blogId){
            return res.status(400).json({message: "Invalid blog Id"})
        }
    
        const blog = await Blog.findByIdAndDelete(blogId)
    
        if(!blog){
            return res.status(400).json({message: "Blog not found"})
        }

        res.status(200).json({message: "Deleted successfully"})
    } catch (error) {
       next(error) 
    }

};


//updateBlog
const updateBlog = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const blogId = req.params.id;
        const {author, title, content, label, readTime} = req.body
        const imagePath = req.file?.path;

        if(!blogId){
            return res.status(400).json({message: "Invalid blog Id"})
        }

        const blogUpdateData = {
            author, 
            title,
            content, 
            label, 
            readTime, 
            image: imagePath
        };
        const options = { new: true, runValidators: true }

        const blog = await Blog.findByIdAndUpdate(blogId, blogUpdateData, options)

        if(!blog){
            return res.status(400).json({message: "Blog does not exist"})
        }
        res.status(200).json({message: "Updated successfully!"})
        
    } catch (error) {
        next(error)
    }
};


//getLabel
const getLabels = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const Labels = await Blog.find({label: req.params.tag});
        res.json(Labels)
    } catch (error) {
        next(error)
    }
}




export {
    getBlog,
    getBlogs,
    createBlog,
    deleteBlog,
    updateBlog,
    getLabels
}