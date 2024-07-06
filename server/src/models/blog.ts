    import { Document, model, Schema } from "mongoose";

export interface MyBlog extends Document {
    author: string;
    title: string;
    content: string;
    label: string;
    image: string;
    readTime: string;
    createdAt: Date;
    updatedAt: Date
}

const blogSchema = new Schema<MyBlog>(
    {
        author:{
            type: String,
            required: true,
            lowercase: true
        },
        title:{
            type:String,
            required: true,
            lowercase: true
        },
        content:{
            type: String,
            required: true
        },
        readTime:{
            type:String,
            required: true,
            lowercase: true
        },
        label:{
            type: String,
            required: true,
            lowercase: true
        },
        image:{
            type: String,
            default: "https://i.postimg.cc/qRXRjfZB/undraw.png"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        }
    },
    {
        timestamps:true
    }
);


const Blog = model<MyBlog>("Blog", blogSchema)

export default Blog;