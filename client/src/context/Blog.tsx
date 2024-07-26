import { createContext, ReactNode, useContext, useState } from "react";
import axiosInstance from "../utils/AxiosConfig";
import { BlogProps } from '../interface/BlogProps';


interface BlogContextType {
    data: BlogProps[];
    isError: unknown;
    isLoading: boolean;
    getBlogByID: (id: string) => Promise<BlogProps | undefined>;
    fetchAllBlogs: () => Promise<void>,
    scrollToTop: () => void,
    createBlog: (newBlog: Omit<BlogProps, "_id" | "createdAt" | "updatedAt">)=> Promise<void>
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

type DataProviderProps = {
    children: ReactNode
}


const BlogProvider = ({children}: DataProviderProps) => {
    const [data, setData] = useState<BlogProps[]>([]);
    const [isError, setIsError] = useState<unknown>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    
     //fetch all blog
    const fetchAllBlogs = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get<BlogProps[]>(`getBlogs`);
            const result = await response.data;
            setData(result)
            // console.log(data)
        } catch (err: unknown) {
            if(err instanceof Error){
                setIsError(err.message)
            }else {
                setIsError(err)
            }
        }finally {
            setIsLoading(false)
        }
    }


    //getSingleBlog
    const getBlogByID = async (id: string): Promise<BlogProps | undefined> => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get<BlogProps>(`getBlog/${id}`)
            return response.data
        } catch (error) {
            setIsError(error)
        }finally{
            setIsLoading(false)
        }
    }

    //createBlog
    const createBlog = async(newBlog: Omit<BlogProps, "_id" | "createdAt" | "updatedAt">) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post<BlogProps[]>("createBlog", newBlog);
            return response.data
        } catch (error) {
            if(error instanceof Error){
                setIsError(error.message)
            }else{
                setIsError("An unknown error occurred")
            }
        }finally{
            setIsLoading(false)
        }
    }
                                                      


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
        <BlogContext.Provider value={{data, isError, isLoading, getBlogByID, fetchAllBlogs, scrollToTop, createBlog}}>
            {children}
        </BlogContext.Provider>
    )
};


export default BlogProvider;
                                                                                                         
export const UseData = () => {
    const context = useContext(BlogContext);
    if (context === undefined) {
      throw new Error('useData must be used within a BlogProvider');
    }
    return context;

};