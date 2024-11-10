// import { UseData } from "../context/Blog"
import Hero from '../components/Hero'
import Wrapper from '../shared/Wrapper'
import LatestPosts from '../components/LatestPosts'
import { SideScreen } from '../components/SideScreen';
import StylePosts from '../components/StylePosts';
import { useEffect, useState } from "react";
import {FullScreenLoader} from "../shared/LoaderAnimation";
import axiosInstance from "../utils/AxiosConfig";
import { BlogProps } from "../interface/BlogProps";


const LandingPage = () => {
  // const {data, isLoading, isError, fetchAllBlogs} = UseData()

  // useEffect(() => {
  //   fetchAllBlogs()
  // },[])

  const [data, setData] = useState<BlogProps[]>([]);
    const [isError, setIsError] = useState<undefined | string>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    
     //fetch all blog
    const fetchAllBlogs = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`blogs/getBlogs`);
            const result = await response.data;
            setData(result)
        } catch (error) {
            if(error instanceof Error){
                setIsError(error.message)
            }else {
                setIsError("An error occurred")
            }
        }finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
    fetchAllBlogs()
  },[])
  
  if(isLoading){
    return <div><FullScreenLoader/></div>
  }

  if(isError){
    <span>An error occurred...</span>
  }
  
  return (
    <Wrapper>
        <div>
            <Hero posts={data} />
            <div className='grid grid-cols-7 relative gap-3 h-full'> 
                <div className='col-span-7 md:col-span-5'>
                    <StylePosts stylePosts={data}/>
                    <LatestPosts blogs={data}/>
                </div>
                <div className='col-span-7 md:col-span-2'>
                    <SideScreen blogLabel={data}/>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default LandingPage;