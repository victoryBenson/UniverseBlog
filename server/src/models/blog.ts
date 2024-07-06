    import { Document, model, Schema } from "mongoose";

export interface MyBlog extends Document {
    author: string;
    title: string;
    content: string;
    image: string;
    readTime: string;
    createdAt: Date;
    updatedAt: Date
}

const blogSchema = new Schema<MyBlog>(
    {
        author:{
            type: String,
            required: true
        },
        title:{
            type:String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        readTime:{
            type:String
        },
        image:{
            type: String                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        }
    },
    {
        timestamps:true
    }
);


const Blog = model<MyBlog>("Blog", blogSchema)

export default Blog;