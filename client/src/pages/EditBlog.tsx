
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogProps } from "../interface/BlogProps";
import { UseData } from "../context/Blog";
import { FullScreenLoader } from "../shared/LoaderAnimation";


const EditBlog = () => {
    const {id} = useParams<string>()
    const [blog, setBlog] = useState<BlogProps | undefined>();
    const { isLoading, isError, getBlogByID} = UseData();
    console.log(id);

  
    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlog = await getBlogByID(id!);
            setBlog(fetchedBlog)
        }
        fetchBlog();
    },[])

    if(isLoading){
        return <div><FullScreenLoader/></div>
    }

    if(isError){
        return <div>{isError}</div>
    }

  return (
    <div className="min-h-screen">
        EditBlog
        <p>{blog?.label}</p>
    </div>
  )
}

export default EditBlog;