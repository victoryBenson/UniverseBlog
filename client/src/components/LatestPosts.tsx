import { Link } from "react-router-dom";
import { BlogProps } from "../interface/BlogProps"
import displayRandom from "../utils/ShufflePost";
import truncateText from "../utils/TruncateText";
import useIsMobile from "../utils/isMobileView";
import { UseData } from "../context/Blog";


interface MyBlogProps{
    blogs: BlogProps[], 
}

const LatestPosts = ({blogs}: MyBlogProps) => {
    const shufflePost = displayRandom(blogs);
    const isMobile = useIsMobile();
    const {scrollToTop} = UseData()


  return (
    <div className=" p-1 md:p-2 rounded">
        <div>
            <p className="font-bold text-base md:text-xl">Latest Posts</p>
        </div>
        <div className="flex flex-col gap-4">
            {shufflePost.length ?(

                shufflePost.slice(0, 3).map((blog, index) => {
                return (
                    <Link onClick={scrollToTop} key={index} className="grid grid-cols-8 h-40 w-[100vm] gap-1 md:gap-2 group md:p-2 bg-white rounded" to={`/blog/${blog._id}`}>
                        <div className="col-span-2 md:col-span-2  overflow-hidden cursor-pointer rounded-lg m-1">
                            <img src={blog.image} alt="image" className="h-full w-full object-cover group-hover:scale-105 duration-700 transition-all rounded-lg overflow-hidden"/>
                        </div>
                        <div className="col-span-6 md:col-span-6  space-y-2 text-sm py-2">
                            <p className="text-blue2 cursor-pointer hover:underline decoration-2 decoration-seaGreen underline-offset-4 duration-300 transition-all">{blog.label}</p>
                            <p className="font-bold text-sm md:text-base capitalize cursor-pointer ">{blog.title}</p>
                            <p className="truncate">{isMobile ? truncateText(blog.content, 20) : blog.content} <span className="text-blue1 text-xs cursor-pointer">readmore</span></p>
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-darkGray truncate">{blog.author}</p>
                                <p className="text-darkGray">{blog.readTime} read</p>
                            </div>
                        </div>
                    </Link>
                )
            })
            ) :
            (
                <div className="text-lightGray text-sm">Please wait...</div>
            )
    }
        </div>
    </div>
  )
}

export default LatestPosts