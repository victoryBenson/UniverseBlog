import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "../utils/AxiosConfig";

import { BlogProps } from '../interface/BlogProps';


interface BlogContextType {
    data: BlogProps[];
    isError: unknown;
    isLoading: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

type DataProviderProps = {
    children: ReactNode
}


const BlogProvider = ({children}: DataProviderProps) => {
    const [data, setData] = useState<BlogProps[]>([]);
    const [isError, setIsError] = useState<unknown>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    
     useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get<BlogProps[]>(`getBlogs`);
                const result = await response.data;
                setData(result)
                
            } catch (err: unknown) {
                if(err instanceof Error){
                    setIsError(err.message)
                }else {
                    setIsError(err)
                }
            }finally {
                setIsLoading(false)
            }
        };

        fetchBlog()
    }, []);

    return (
        <BlogContext.Provider value={{data, isError, isLoading}}>
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