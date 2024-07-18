import { BlogProps } from "../interface/BlogProps"
import { SocialMedia2 } from "../shared/SocialMedia"
import displayRandom from "../utils/ShufflePost"
import { useMemo } from "react"
import Newsletter from "./Newsletter"

interface BlogLabelProps {
    blogLabel: BlogProps[]
}

export const SideScreen = ({blogLabel}: BlogLabelProps) => {
    const displayPosts = displayRandom(blogLabel)

    const uniquePosts = useMemo(() => {

        const uniqueLabel = new Set<string>();

        return displayPosts.filter(post => {

        if (uniqueLabel.has(post.label)) {
            return false;
        } else {
            uniqueLabel.add(post.label);
            return true;
        }
        });

    }, [displayPosts]);
    
  return (
        <div>
            {/* popular post */}
            <div className="p-2 bg-white rounded">
                <p className="p-2 font-bold text-lg">Popular Posts</p>
                <div className="flex flex-wrap w-full gap-2">
                    {
                        uniquePosts.slice(1,3).map(post => {
                            return (
                                <div key={post._id} className="flex">
                                    <p className=" p-2 text-base capitalize">{post.title}- <i className="font-normal text-sm lowercase text-darkGray">{post.author}</i></p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/*  */}
            <div className="p-2">
                <p className="p-2 font-bold text-lg">Label</p>
                <div className="flex flex-wrap w-full gap-2">
                    {
                        uniquePosts.map(post => {
                            return (
                                <div key={post._id} className="">
                                    <button className="bg-blue1 hover:bg-blue2 transition-all text-white bg-gradient-to-r p-1 rounded">{post.label}</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/*  */}
            <Newsletter/>
            {/*  */}
            <div className="p-3" >
                <p className="text-xl font-bold p-2">Stay Connected</p>
                <div className="p-3">
                    <SocialMedia2/>
                </div>
            </div>
        </div>
  )
}
