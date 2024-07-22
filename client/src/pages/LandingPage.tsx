import { UseData } from "../context/Blog"
import Hero from '../components/Hero'
import Wrapper from '../shared/Wrapper'
import LatestPosts from '../components/LatestPosts'
import { SideScreen } from '../components/SideScreen';
import StylePosts from '../components/StylePosts';
import { useEffect } from "react";
import {LoaderAnimation} from "../shared/LoaderAnimation";


const LandingPage = () => {
  const {data, isLoading, isError, fetchAllBlogs} = UseData()


  useEffect(() => {
    fetchAllBlogs()
  },[])

   
  
    if(isLoading){
      <LoaderAnimation/>
    }

    if(isError){
      <span>An error occurred...</span>
    }

  return (
    <Wrapper>
        <div className=''>
            <Hero posts={data} />
            {/* posts */}
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

export default LandingPage