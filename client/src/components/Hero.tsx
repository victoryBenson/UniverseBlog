import { BlogProps } from "../interface/BlogProps"
import displayRandom from "../utils/ShufflePost";

interface BlogListProps {
  posts: BlogProps[]
}

const Hero = ({posts}: BlogListProps) => {

  const shufflePosts = displayRandom(posts);
    
  return (
    <div className="justify-center flex flex-wrap md:gap-2  h-full">
      {
        shufflePosts.slice(0, 4).map((post, index) => {
          return(
            <div key={index} className={` h-96 w-[22rem] my-5 md:my-14 lg:w-64 rounded shadow relative group`}>
                <div className="absolute top-0 h-full w-full overflow-hidden">
                    <img src={post.image} alt="image" className="h-full object-cover rounded overflow-hidden group-hover:scale-105 duration-300 transition-all"/>
                    <p className="bg-black/30 h-full w-full top-0 absolute rounded"/>
                </div>
                <div className="justify-center absolute bottom-0 p-2 h-1/2 group-hover:scale-y-90 transition-all duration-300 transform-gpu">
                    <p className="gap-1 flex items-center">
                      <span className="text-sm text-white bg-blue2 p-1 rounded-sm cursor-pointer">2.5</span>
                      <span className="underline decoration-2 text-[#d8e4bd]">#{post.label}</span>
                    </p>
                    <h1 className="text-white text-lg font-bold capitalize cursor-pointer py-2 hover:underline decoration-2 duration-300 transition-all">{post.title}</h1>
                    <p className="flex items-center text-sm gap-2 text-arch">
                        <span className="group-hover:cursor-pointer">{post.author}</span>
                        <span className="group-hover:cursor-pointer">{post.readTime} read</span>
                    </p>
                </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Hero