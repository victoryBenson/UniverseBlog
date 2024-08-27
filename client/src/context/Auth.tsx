import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosConfig";


interface AuthContextType {
    login: (data: unknown) => Promise<void>,
    register: (data: unknown) => Promise<void>,
    userToken: string,
    forgotPassword:(data:unknown) => Promise<void>,
    // verifyOTP:(data: string[]) => Promise<string[]>
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
    children: ReactNode
};

const AuthProvider = ({children}: AuthProviderProps) => {
    const [userToken, setUserToken] = useState<string>("")

    //login
    const login = async(data: unknown) => {
        const response = await axiosInstance.post("auth/login", data);
        const token = JSON.stringify(response.data.token)
        const userID = JSON.stringify(response.data.user._id)
        
        if(token && userID){
            sessionStorage.setItem('userToken', token)
            sessionStorage.setItem('userID', userID)
        }
        return response.data
    };

    //register
    const register = async(data: unknown) =>{
        const response = await axiosInstance.post("auth/register", data);
        const token = JSON.stringify(response.data.token)
        const userID = JSON.stringify(response.data.user._id)
        
        if(token && userID){
            sessionStorage.setItem('userToken', token)
            sessionStorage.setItem('userID', userID)
        }
        return response.data
    };

    //forgotPassword
    const forgotPassword = async(data: unknown) => {
        const response = await axiosInstance.post('auth/forgotPassword', data)
        return response.data
    }

    // const verifyOTP = async(data: string[]) => {
    //     const response = await axiosInstance.post('auth/verifyOTP', data);
    //     return response.data
    // }


    useEffect(() => {
        const fetchToken = sessionStorage.getItem('token')
        if(fetchToken){
            setUserToken(JSON.parse(userToken))
        }
    },[])

    return(
        <AuthContext.Provider value={{login, register, userToken, forgotPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


// export AuthContext using custom hook
export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('userAuth must be used within a AuthProvider');
    }
    return context;

};

