import { Link, useParams } from 'react-router-dom'
import { UseData } from '../context/Blog';
import { useEffect, useState } from 'react';
import { BlogProps } from '../interface/BlogProps';
import { CiClock1, CiEdit, CiHeart } from 'react-icons/ci';
import { IoBookOutline } from 'react-icons/io5';
import { FaRegComments } from 'react-icons/fa';
import {LoaderAnimation} from '../shared/LoaderAnimation';
import "react-quill/dist/quill.snow.css"; 
import { RiDeleteBinLine } from 'react-icons/ri';


type BlogParams = {
  id: string;
}

const BlogDetails = () => {
    const { id } = useParams<BlogParams>();
    const { isLoading, isError, getBlogByID} = UseData();
    const [blog, setBlog] = useState<BlogProps | undefined>()

  
    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlog = await getBlogByID(id!);
            setBlog(fetchedBlog)
        }
        fetchBlog();
    },[])
  

    if(isLoading){
        return <LoaderAnimation/>;
    }

    if(isError){
        return <div className='text-red text-center'>{isError && isError}</div>
    }


    let backendImageURL
    if (process.env.NODE_ENV === 'production') {
        backendImageURL = "https://universeblog-api.onrender.com";
    } else{
        backendImageURL = "http://localhost:3000";
        console.log(process.env.NODE_ENV)
    }

    if(!blog){
        return <div>No blog found</div>
    }


    return (
        <div className='min-h-screen md:mx-8 lg:mx-20 bg-white p-1 md:p-5'>
            <div className=' overflow-hidden rounded-2xl w-full h-72'>
                {
                    (blog.image)?.includes('uploads') ?
                    <img src={`${backendImageURL}${blog.image}`} alt="image" className='rounded-2xl h-full w-full object-cover object-top hover:scale-105 duration-1000 '/>
                    :
                    <img src={blog.image} alt="image" className='rounded-2xl h-full w-full object-cover object-top hover:scale-105 duration-1000 '/>
                }
            </div>
            <div className='my-4'>
                <span className='bg-blue1 text-white p-1 rounded my-10 text-sm'>{blog.label}</span>
            </div>
            <h1 className='font-bold p-2 text-lg md:text-2xl fond-bold capitalize'>{blog.title}</h1>
            <div className='flex flex-col flex-wrap justify-end gap-2 text-darkGray divide-x-3 text-base'>
                <p className='flex gap-4 items-center'>
                    <span>Author:<strong className='text-black capitalize text-base'>{blog.author}</strong></span>
                    <span className='flex items-center'><CiClock1 /> {new Date(blog.updatedAt).toLocaleString('default', { day: "2-digit", month:"long", year:"numeric" })}</span>
                </p>
                <p className='flex items-center gap-4'>
                    <span className='flex items-center'><FaRegComments /> 9 comments</span>
                    <span className='flex items-center'><IoBookOutline className='mx-1'/>{blog.readTime} read</span>
                    <span><CiHeart size={20}/></span>
                </p>
            </div>
            <div className='prose ql-editor'>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} className='py-2 font-light first-letter:text-2xl first-letter:mx-2' />
            </div>
            <div className='my-4 flex justify-end gap-4'>
                <Link to={`/edit_blog/${blog._id}`} className='hover:bg-blue1 hover:text-white border border-blue2 transition-all p-2 rounded my-10 text-sm flex items-center '><CiEdit size={20}/>Edit Blog</Link>
                <Link to={"/"} className='bg-blue1 text-white hover:bg-white hover:text-black border border-blue2 transition-all p-2 rounded my-10 text-sm flex items-center'><RiDeleteBinLine/>Delete Blog</Link>
            </div>
            <div className='bg-white p-5 my-5 rounded-xl'>
                <h1 className='font-bold text-xl'>Write a comment</h1>
                <p className='py-2'>sunt in culpa qui officia deserunt</p>
                <form action="#" className='space-y-4'>
                    <textarea name="" id="" placeholder='What are your thoughts?' rows={2} className='ring-1 ring-blue2/20 w-full rounded-xl focus:ring-1 focus:outline-blue1/40 p-2 text-darkGray bg-arch/40'></textarea>
                    <div className='flex items-center gap-4 py-2'>
                        <input type="text" className='p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40' placeholder='Name'/>
                        <input type="email" className='p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-1 focus:outline-blue1/60 bg-arch/40' placeholder='Email'/>
                    </div>
                    <div className='overflow-hidden rounded' >
                        <button className='bg-blue1 hover:bg-blue2 transition-all w-full p-3 rounded text-white hover:scale-105 duration-500'>Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default BlogDetails;