import { BlogProps } from "../interface/BlogProps"
import displayRandom from "../utils/ShufflePost";
import truncateText from "../utils/TruncateText";
// import truncateText from '../utils/TruncateText';

interface MyBlogProps{
    blogs: BlogProps[], 
}

const LatestPosts = ({blogs}: MyBlogProps) => {
    const shufflePost = displayRandom(blogs)
  return (
    <div className=" p-1 md:p-2 rounded">
        <div>
            <p className="p-3 text-xl font-bold">Latest Posts</p>
        </div>
        <div className="flex flex-col gap-4">
            {shufflePost.slice(0, 3).map((blog, index) => {
            return (
                <div key={index} className="grid grid-cols-8 h-40 w-[100vm] gap-1 md:gap-2 group md:p-2 bg-white rounded">
                    <div className="col-span-2 md:col-span-2  overflow-hidden cursor-pointer rounded m-1 p-1 md:p-2">
                        <img src={blog.image} alt="image" className="h-full w-full object-cover group-hover:scale-105 duration-300 transition-all rounded overflow-hidden"/>
                    </div>
                    <div className="col-span-6 md:col-span-6  space-y-2 text-sm py-2">
                        <p className="text-blue2 cursor-pointer hover:underline decoration-2 decoration-seaGreen underline-offset-4 duration-300 transition-all">{blog.label}</p>
                        <p className="font-bold text-sm md:text-base capitalize cursor-pointer ">{blog.title}</p>
                        <p className="truncate">{truncateText(blog.content, 20)} <span className="text-blue1 text-xs cursor-pointer">readmore</span></p>
                        <div className="flex items-center gap-2">
                            <p className="text-darkGray">{blog.author}</p>
                            <p className="text-darkGray">{blog.readTime} read</p>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default LatestPosts