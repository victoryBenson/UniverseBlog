import { useParams } from 'react-router-dom'
import { UseData } from '../context/Blog';
import { useEffect, useState } from 'react';
import { BlogProps } from '../interface/BlogProps';
import { CiClock1, CiHeart } from 'react-icons/ci';
import { IoBookOutline } from 'react-icons/io5';
import { FaRegComments } from 'react-icons/fa';

type BlogParams = {
  id: string;
}

const BlogDetails = () => {
    const { id } = useParams<BlogParams>();
    const { isLoading, isError, getBlogByID} = UseData();
    const [blog, setBlog] = useState<BlogProps | undefined>(undefined)

  
    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlog = await getBlogByID(id!);
            setBlog(fetchedBlog)
        }
        fetchBlog();
    },[])
  


    if(isLoading){
        return <div>Loading...</div>
    }


    if(isError){
        return <div>An error occurred</div>
    }



    if(!blog){
        return <div>No blog found</div>
    }

    return (
        <div className='min-h-screen mx-4 md:mx-8 lg:mx-20'>
            <span className='bg-blue1 text-white p-1 rounded'>{blog.label}</span>
            <h1 className='font-bold p-2 text-3xl fond-bold py-10 capitalize'>{blog.title}</h1>
            <div className='flex flex-wrap items-center gap-2 text-darkGray divide-x-3 py-2'>
                <span>by <strong className='text-black'> {blog.author}</strong></span>
                <span className='flex items-center'><CiClock1 /> {new Date(blog.updatedAt).toLocaleString('default', { month:"long", year:"numeric" })}</span>
                <span className='flex items-center'><FaRegComments /> 9 comments</span>
                <span className='flex items-center'><IoBookOutline className='mx-1'/> {blog.readTime} read</span>
                <span><CiHeart size={20}/></span>
            </div>
            <div className=' overflow-hidden rounded-2xl w-full  h-96'>
                <img src={blog.image} alt="image" className='rounded-2xl overflow-hidden h-full w-full object-cover hover:scale-105 duration-1000 '/>
            </div>
            <div className='py-2'>
                <p className='py-2 font-light'>{blog.content}</p>
            </div>
            <div className='bg-white p-5 my-5 rounded-xl'>
                <h1 className='font-bold text-xl'>Write a comment</h1>
                <p className='py-2'>sunt in culpa qui officia deserunt</p>
                <form action="#" className='space-y-4'>
                    <textarea name="" id="" placeholder='What are your thoughts?' rows={2} className='ring-1 ring-blue2/20 w-full rounded-xl focus:ring-1 focus:outline-blue1/60 p-2 text-darkGray bg-arch/40'></textarea>
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