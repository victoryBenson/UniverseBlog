import { useEffect } from "react"
import BlogDetails from "./BlogDetails"
import { UseData } from "../context/Blog"
import { SideScreen } from "./SideScreen"
import Wrapper from "../shared/Wrapper"



const BlogDetailDashboard = () => {
    const {data, fetchAllBlogs} = UseData()


    useEffect(() => {
      fetchAllBlogs()
    },[])

  return (
   <Wrapper>

    <div className='grid grid-cols-7 relative gap-3 min-h-screen py-10'> 
        <div className='col-span-7 md:col-span-5'>
            <BlogDetails/>
        </div>
        <div className='col-span-7 md:col-span-2'>
            <SideScreen blogLabel={data}/>
        </div>
    </div>
   </Wrapper> 
  )
}

export default BlogDetailDashboard