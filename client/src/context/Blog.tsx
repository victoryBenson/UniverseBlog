import { createContext, ReactNode, useContext, useState } from "react";
import { BlogProps} from '../interface/BlogProps';
import axiosInstance from "../utils/AxiosConfig";


interface BlogContextType {
    data: BlogProps[];
    isError: undefined | string;
    isLoading: boolean;
    // loadingData: boolean;
    // LoadScreen: () => Promise<void>,
    getBlogByID: (id: string) => Promise<BlogProps | undefined>;
    fetchAllBlogs: () => Promise<void>,
    createBlog: (blogData: unknown)=> Promise<void>,
    deleteBlog: (id: string) => Promise<BlogProps | undefined>,
    updateBlog:(id:string, blogData:unknown) => Promise<BlogProps | undefined>
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

type DataProviderProps = {
    children: ReactNode
}


const BlogProvider = ({children}: DataProviderProps) => {
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

    //getSingleBlog
    const getBlogByID = async (id: string) => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`blogs/getBlog/${id}`)
            return response.data
        } catch (error) {
            if(error instanceof Error){
                setIsError(error.message)
            }else {
                setIsError("An error occurred")
            }
        }finally{
            setIsLoading(false)
        }
    }
                                                      
    //createBlog
    const createBlog = async(blogData: unknown) => {
        const response = await axiosInstance.post(`blogs/write_blog`, blogData);
        return response.data
    };

    //delete-blog
    const deleteBlog = async(id: string) => {
        const response = await axiosInstance.delete(`blogs/delete_blog/${id}`)
        return response.data
    };

    //updateBlog
    const updateBlog = async(id:string, blogData: unknown) => {
        const response = await axiosInstance.put(`blogs/update_blog/${id}`, blogData);
        return response.data
    }


    // new loader
// const LoadScreen = () => {
//     const [progress, setProgress] = useState<number>(0);
//     const [loadingData, setLoadingData] = useState<boolean>(false)
  
//     // Simulate the loading process
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setProgress((oldProgress: number) => {
//           if (oldProgress >= 170) {
//             clearInterval(interval);
//             setTimeout(() => setLoadingData(false), 500); // Simulate a short delay before hiding loader
//             return 100;
//           }
//           return oldProgress + 10; // Increase progress by 10 every interval
//         });
//       }, 500); // Adjust the speed of the loading progress
//     }, [setLoadingData]);
  
//     return (
//       <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-indigo-50">
//         <div className="relative text-4xl font-bold text-green-900 md:text-5xl lg:text-8xl">
//           <div
//             className="absolute top-0 left-0 overflow-hidden text-green-950 transition-all duration-500 ease-linear"
//             style={{
//               width: `${progress}%`,
//             }}
//           >
//             Coderina University Challenge
//           </div>
//           <div className="opacity-40">Coderina </div>{" "}
//           {/* Static background text */}
//         </div>
//       </div>
//     );
//   };


    return (
        <BlogContext.Provider value={{data, isError, isLoading, getBlogByID, fetchAllBlogs, createBlog, deleteBlog, updateBlog}}>
            {children}
        </BlogContext.Provider>
    )
};


export default BlogProvider;
    

// export BlogContext using custom hook
export const UseData = () => {
    const context = useContext(BlogContext);
    if (context === undefined) {
      throw new Error('useData must be used within a BlogProvider');
    }
    return context;
};