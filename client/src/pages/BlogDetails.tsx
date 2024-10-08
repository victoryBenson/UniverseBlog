import { Link, useNavigate, useParams } from 'react-router-dom'
import { UseData } from '../context/Blog';
import { useEffect, useState } from 'react';
import { BlogProps } from '../interface/BlogProps';
import { CiClock1, CiEdit, CiHeart } from 'react-icons/ci';
import { IoBookOutline, IoWarningOutline } from 'react-icons/io5';
import { FaRegComments } from 'react-icons/fa';
import {LoaderAnimation} from '../shared/LoaderAnimation';
import "react-quill/dist/quill.snow.css"; 
import { RiDeleteBinLine } from 'react-icons/ri';
import scrollToTop from '../utils/ScrollTo';
import { MdArrowBackIosNew } from 'react-icons/md';
import toast from 'react-hot-toast';



type BlogParams = {
    id: string;
}

const BlogDetails = () => {
    const { id } = useParams<BlogParams>();
    const { isLoading, isError, getBlogByID, deleteBlog} = UseData();
    const [blog, setBlog] = useState<BlogProps | undefined>()
    const navigate = useNavigate()
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

  
    const handleDeleteModal =()=> {
        setDeleteModal(!deleteModal)
    }

    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlog = await getBlogByID(id!);
            setBlog(fetchedBlog)
        }
        fetchBlog();
    },[])

    const handleDeleteBlog = async() => {
        try {
            await deleteBlog(id!)
            toast.success("Post deleted successfully")
            goBack()
        } catch (error) {
            toast.error("An error occurred")
        }
    }
  

    if(isLoading){
        return <LoaderAnimation/>;
    }

    if(isError){
        return <div className='text-red text-center'>{isError && isError}</div>
    }


    if(!blog){
        return <div>No blog found</div>
    }

    const goBack = () =>{
        navigate(-1)
    }


    return (
        <div className='min-h-screen'>
            <div className=' bg-white p-1 md:p-5 rounded-xl'>
                <div className=' overflow-hidden rounded-2xl w-full h-60'>
                    <img src={blog?.image} alt="image" className='rounded-2xl h-full w-full object-contain object-top hover:scale-105 duration-1000 '/>
                </div>
                <div className='my-4 px-4'>
                    <span className='bg-blue1 text-white p-1 rounded my-10 text-sm'>{blog.label}</span>
                </div>
                <h1 className='font-bold p-2 text-lg md:text-2xl fond-bold capitalize px-4'>{blog.title}</h1>
                <div className='flex flex-col flex-wrap justify-end gap-2 text-darkGray text-base px-4'>
                    <p className='flex gap-4 items-center'>
                        <span>Author:<strong className='text-black capitalize text-base'> {blog.author}</strong></span>
                        <span className='flex items-center'><CiClock1 /> {new Date(blog.updatedAt).toLocaleString('default', { day: "2-digit", month:"long", year:"numeric" })}</span>
                    </p>
                    <p className='flex items-center gap-4'>
                        <span className='flex items-center'><FaRegComments /> 9 comments</span>
                        <span className='flex items-center'><IoBookOutline className='mx-1'/>{blog.readTime} read</span>
                        <span><CiHeart size={20}/></span>
                    </p>
                </div>
                <div className=' ql-editor prose-base'>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className=' py-2 font-light first-letter:text-2xl first-letter:mx-1' />
                </div>
                <div className='my-4 flex flex-wrap justify-end gap-4 items-center relative'>
                    <button onClick={goBack} className='absolute left-0 shadow hover:shadow-lg p-3 rounded-lg flex items-center mx-1'><MdArrowBackIosNew />go back</button>
                    <Link to={`/editBlog/${blog._id}`} onClick={scrollToTop} className='hover:bg-blue1 hover:text-white shadow transition-all p-3 rounded-lg my-10 text-sm flex items-center '><CiEdit size={20}/>Edit Post</Link>
                    <div>
                        <button onClick={handleDeleteModal} className='bg-blue1 text-white hover:bg-white hover:text-black shadow transition-all p-3 rounded-lg my-10 text-sm flex items-center'><RiDeleteBinLine/>Delete Post</button>
                        {
                            deleteModal && (
                            <div className='fixed bg-black/40 inset-0 z-50 flex justify-center items-center'>
                                <span onClick={handleDeleteModal} className='bg-black/40 fixed inset-0 z-40'/>
                                <div className='fixed bg-white shadow-lg md:h-64 gap-2 p-5 mx-2 md:w-1/3 rounded-lg z-50 flex flex-col justify-center items-center text-center overflow-hidden'>
                                    <span className='bg-lightGray/50 p-2 rounded-full'><IoWarningOutline size={30} className='text-red/50'/></span>
                                    <p className='font-bold text-lg'>Are you sure?</p>
                                    <p className='text-darkGray text-lg'>This will delete this post permanently, you cannot undo this action </p>
                                    <p className='flex flex-col md:flex-row gap-4 justify-around w-full '>
                                        <button onClick={handleDeleteModal} className='border border-lightGray p-3 rounded-2xl text-darkGray hover:bg-opacity-80'>No,Cancel</button>
                                        <button onClick={handleDeleteBlog} className='hover:bg-opacity-80 p-3 rounded-2xl text-white bg-red transition-all'>Yes, Delete!</button>
                                    </p>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='bg-whit p-5 my-5 rounded-xl'>
                <h1 className='font-bold text-xl'>Write a comment</h1>
                <p className='py-2'>Top comments (0)</p>
                <form action="#" className='space-y-4'>
                    <textarea name="" id="" placeholder='What are your thoughts?' rows={2} className='ring-1 ring-blue2/20 w-full rounded-xl focus:ring-1 focus:outline-blue1/40 p-2 text-darkGray bg-arch/40'></textarea>
                    <div className='overflow-hidden rounded-lg' >
                        <button className='bg-blue1 hover:bg-blue2 transition-all w-full p-3 rounded text-white hover:scale-105 duration-500'>Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default BlogDetails;