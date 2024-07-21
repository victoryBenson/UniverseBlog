import { Link } from "react-router-dom";
import { BlogProps } from "../interface/BlogProps"
import displayRandom from "../utils/ShufflePost";
import { useEffect, useState } from "react";
import { UseData } from "../context/Blog";
import {LoaderAnimation} from "../shared/LoaderAnimation";


interface BlogListProps {
  posts: BlogProps[]
}

const Hero = ({posts}: BlogListProps) => {
    const result = displayRandom(posts).slice(0,4)
    const [index, setIndex] = useState<number>(0); 
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const {scrollToTop} = UseData()

    useEffect(() => {
      const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile); 
  
      return () => window.removeEventListener('resize', checkIsMobile);
    }, []);


    useEffect(() => {
        if(!isMobile) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % result.length)
        }, 3000);
        
        return () => clearInterval(interval)
    },[isMobile, result.length])
    
  return (
    <div className="flex flex-col justify-center items-center my-10 relative">
        <div className="w-full h-full overflow-x-auto whitespace-nowrap no-scrollbar rounded-lg lg:flex justify-center">
            {
                result.length ? (
                    result.map((post, idx) => {
                    return(
                        <Link onClick={scrollToTop} to={`blog/${post._id}`} key={idx} className={`${index === index ? 'opacity-100' : 'opacity-0'} lg:mx-2 duration-700 ease-in h-96 inline-block my-5 lg:my-10 w-full lg:w-64 rounded-lg shadow relative group`}>
                            <div className="absolute top-0 h-full w-full overflow-hidden rounded-lg">
                                <img src={post.image} alt="image" className="h-full w-full object-cover rounded-lg group-hover:scale-105 duration-700 transition-all"/>
                                <p className="bg-black/30 h-full w-full top-0 absolute rounded"/>
                            </div>
                            <div className="justify-center absolute bottom-0 p-2 h-1/2 group-hover:scale-y-90 transition-all duration-300 transform-gpu">
                                <div className="gap-1 flex items-center">
                                    <span className="text-sm text-white bg-blue2 p-1 rounded-sm cursor-pointer">2.5</span>
                                    <span className="underline decoration-2 text-[#d8e4bd]">#{post.label}</span>
                                </div>
                                <div className="text-white text-lg font-bold capitalize cursor-pointer py-2 hover:underline decoration-2 duration-300 transition-all items-center whitespace-normal ">{post.title} </div>
                                <div className="flex items-center text-sm gap-2 text-arch">
                                    <span className="group-hover:cursor-pointer">{post.author}</span>
                                    <span className="group-hover:cursor-pointer">{post.readTime} read</span>
                                </div>
                            </div>
                        </Link>
                    )
                    })
                ):
                <LoaderAnimation/>
            }
        </div>
        {/* indicator */}
        <div className='text-center lg:hidden'>
            {
            result.map((_, idx) => (
                    <div 
                        key={idx}
                        onClick={()=> setIndex(idx)}
                        className={`slideshowDo ${idx === index ? "bg-blue1" : "bg-blue2"} duration-500 ease-in mx-1 rounded-full h-1 w-5 inline-block cursor-pointer bg-gray`}
                    ></div>
                ))
            }
        </div>
    </div>
  )
}

export default Hero;
