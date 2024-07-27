import { createContext, ReactNode, useContext, useState } from "react";
import { BlogProps} from '../interface/BlogProps';
import axiosInstance from "../utils/AxiosConfig";

interface BlogContextType {
    data: BlogProps[];
    isError: undefined | string;
    isLoading: boolean;
    getBlogByID: (id: string) => Promise<BlogProps | undefined>;
    fetchAllBlogs: () => Promise<void>,
    scrollToTop: () => void,
    createBlog: (blogData: unknown)=> Promise<void>
}


const BlogContext = createContext<BlogContextType | undefined>(undefined);

type DataProviderProps = {
    children: ReactNode
};


const BlogProvider = ({children}: DataProviderProps) => {
    const [data, setData] = useState<BlogProps[]>([]);
    const [isError, setIsError] = useState<undefined | string>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    
     //fetch all blog
    const fetchAllBlogs = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`blogs/getBlogs`);
            setData(response.data);
            return response.data;
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
        console.log(response.data)
        return response.data
    };
                                                      

    //scroll to top
    const scrollToTop = () => {
        window.scrollTo(
            {
                top: 0,
                behavior: 'smooth'
            }
        )
    };

    return (
        <BlogContext.Provider value={{data, isError, isLoading, getBlogByID, fetchAllBlogs, scrollToTop, createBlog }}>
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