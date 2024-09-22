import { FaArrowRightLong } from "react-icons/fa6"
import Logo from "../shared/Logo"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"
import { GiMoebiusTriangle } from "react-icons/gi"
import { ChangeEvent, FormEvent, useState } from "react"
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu"
import { MdOutlineMail } from "react-icons/md"
import image from "../assets/images/login.jpg"
import { AuthProps } from "../interface/AuthProps"
import { UserAuth } from "../context/Auth"
import toast from "react-hot-toast"
import axios from "axios"
import { TbLoader3 } from "react-icons/tb"

const initialState = {
    email: "",
    password: ""
}

export const Login = () => {
    const [viewPwd, setViewPwd] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | null>();
    const {login} = UserAuth();
    const [formState, setFormState] = useState<AuthProps>(initialState);
    const navigate = useNavigate();


    const togglePwd = () => {
       setViewPwd(!viewPwd)
    };

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormState({ ...formState, [name]: value})
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)

            const userData ={
                email: formState.email.toLowerCase(),
                password: formState.password
            };

            if(!userData){
                toast.error("Pls fill_in the input field")
                return
            }
    
            await login(userData)
            navigate('/')
            toast.success('Logged in Successfully')

        } catch (error: unknown ) {
            if(axios.isAxiosError(error)){
                setIsError(error.response?.data.message)
                toast.error(`${error.response?.data.message}`)
            }else{
                setIsError("An unknown error occurred")
                toast.error(`An unknown error occurred`)
            }
        }finally{
            setLoading(false)
        }
    };
    

  return (
    <div className='flex flex-col justify-center items-center min-h-screen inset-0 overflow-hidden' >
        <div className='lg:grid grid-cols-1 sm:grid-cols-2 h-screen fixed inset-0'>
            <div  className=' min-h-full relative hidden lg:flex justify-center flex-col items-center text-white gap-4'>
                <span className='absolute inset-0 bg-blue1/70 -z-10'/>
                <span className='flex justify-center absolute inset-0 -z-20'>
                    <img src={image} alt="logo" className='h-full w-full object-cover' />
                </span>
                <Logo/>
                <h1 className='font-extrabold text-5xl p-5'>Welcome Back !</h1>
                <h4 className='sign text-xl p-2 text-center '>Sign in into your account for full access</h4>
                <Link to={"/"} className="pl-4 my-3 flex items-center absolute bottom-4 gap-2 text-lightGray font-light cursor-pointer"><FaArrowRightLong size={30} className="animate-pulse "/>continue without login!</Link>
            </div>
            <div className='bg-white min-h-full flex justify-center flex-col items-center relative p-5'>
                <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-3/4">
                    <h1 className='font-bold text-3xl py-7 hidden lg:block text-center'>Have an Account?</h1>
                    <div className="text-center lg:hidden">
                        <div className="flex items-center justify-center ">
                            <GiMoebiusTriangle className=" rounded"/>
                        </div>
                        <h1 className='font-extrabold md:text-3xl text-lg md:p-3'>Welcome here!</h1>
                        <h4 className='text-base md:text-xl p-2 text-center '>Sign in into your account for full access</h4>
                    </div>
                    <div className="flex flex-col items-start justify-start py-2 relative">
                        <label htmlFor="email" className="text-lg md:text-2xl">Email</label>
                        <input type="email" value={formState.email} name="email" required onChange={handleChange} className="required border-b border-lightGray/80 outline-none text-lg w-full pl-7 p-2 font-light" placeholder="example@gmail.com" />
                        <span className="absolute left-0 bottom-5 text-darkGray"><MdOutlineMail size={20}/></span>
                    </div>
                    <div className="flex flex-col items-start justify-start py-3 relative">
                        <label htmlFor="password" className="text-lg md:text-2xl">Password</label>
                        <input type={viewPwd? "text" : "password"} name="password" required value={formState.password} onChange={handleChange} className=" border-b border-lightGray/80 outline-none text-lg w-full pl-7 p-2" placeholder="**********" />
                        <span onClick={togglePwd} className='absolute top-[54%] text-darkGray right-10 text-brown transition-transform  duration-300 cursor-pointer white z-10 bg-white'>{viewPwd? <LuEye /> : <LuEyeOff/>}</span>
                        <span className="absolute left-0 top-1/2 text-darkGray"><LuLock size={20}/></span>
                    </div>
                    <Link to={"/resetPassword"} className="text-blue1 flex justify-end py-">forget password?</Link>
                    <span className="text-red">{isError && isError}</span>
                    <div>
                        <button type='submit' disabled={loading} className="flex bg-blue1 my-2 items-center justify-center p-3 rounded-full text-white w-full">
                            {
                                loading ?
                                <TbLoader3 className="animate-spin" size={40} />
                                :
                                <FaArrowRightLong size={30} className="animate-pulse"/>
                            }
                        </button>
                    </div>
                    <span className="text-xl flex justify-center">or</span>
                    <button className="flex w-full my-3 items-center justify-center p-3 rounded-full border border-lightGray/40 text-lg gap-2"><FcGoogle size={30}/>Sign in with Google</button>
                    <span className="pl-4 my-3 block py-3">no account yet?<Link to={'/register'} className="text-blue1 px-2 hover:underline decoration-2 underline-offset-2">create one</Link></span>
                </form>
            </div>
        </div>
    </div>
  )
}