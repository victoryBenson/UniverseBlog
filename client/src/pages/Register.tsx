import { FaArrowRightLong } from "react-icons/fa6"
import Logo from "../shared/Logo"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"
import { GiMoebiusTriangle } from "react-icons/gi"
import { ChangeEvent, FormEvent, useState } from "react"
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu"
import { MdOutlineMail } from "react-icons/md"
import { FaRegUser } from "react-icons/fa"
import image from "../assets/images/register.jpg"
import { AuthProps } from "../interface/AuthProps"
import toast from "react-hot-toast"
import { UserAuth } from "../context/Auth"
import axios from "axios"
import { TbLoader3 } from "react-icons/tb"


const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export const Register = () => {
    const [viewPwd, setViewPwd] = useState<boolean>(false);
    const [formState, setFormState] = useState<AuthProps>(initialState);
    const {username, email, password, confirmPassword} = formState;
    const [viewConfirmPwd, setViewConfirmPwd] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>('');
    const {register} = UserAuth();
    const navigate = useNavigate()
 


    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState({ ...formState, [name]: value})
    };

    const togglePwd = () => {
       setViewPwd(!viewPwd)
    };

    const toggleConfirmPwd = () => {
        setViewConfirmPwd(!viewConfirmPwd)
     };

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true);

            const userData ={
                email: formState.email,
                password: formState.password,
                username: formState.username,
                confirmPassword: formState.confirmPassword
            };

            if(!userData){
                toast.error("Pls fill-in the input field")
                return
            }
    
            await register(userData)
            toast.success("Account created successfully");
            navigate('/');
        } catch (error: unknown) {
            if(axios.isAxiosError(error)){
                setIsError(error.response?.data.message)
            }else {
                setIsError("An unknown error occurred")
                toast.error(`An unknown error occurred`)
            }
        }
        finally{
            setLoading(false)
        }
    }



  return (
    <div className='flex flex-col justify-center items-center w-auto min-h-screen inset-0 overflow-hidden' >
        <div className='lg:grid grid-cols-1 sm:grid-cols-2 h-screen fixed inset-0 '>
            <div  className=' min-h-full w-[50vw] relative hidden lg:flex justify-center flex-col items-center text-white gap-4'>
                <span className='absolute inset-0 bg-blue1/70 -z-10'/>
                <span className='flex justify-center absolute inset-0 -z-20'>
                    <img src={image} alt="logo" className='h-full w-full object-cover' />
                </span>
                <Logo/>
                <h1 className='font-extrabold text-5xl'>Hi there!</h1>
                <h4 className='sign text-xl p-2 text-center '>Sign up to get access to members only content</h4>
                <Link to={"/"} className="pl-4 my-3 flex items-center absolute bottom-4 gap-2 text-lightGray font-light cursor-pointer"><FaArrowRightLong size={30} className="animate-pulse "/>continue without login!</Link>
            </div>
            <div className='bg-white min-h-full flex justify-center flex-col items-center relative p-5'>
                <form onSubmit={handleSubmit} className="px-5 md:px-0 w-full md:w-1/2 lg:w-2/3">
                    <h1 className='font-bold text-xl hidden lg:block text-center'>Create Account?</h1>
                    <div className="text-center lg:hidden">
                        <div className="flex items-center justify-center ">
                            <GiMoebiusTriangle className=" rounded"/>
                        </div>
                        <h1 className='font-extrabold text-base md:text-2xl'>Create Account?</h1>
                        <h4 className='text-sm sm:text-base text-center '>Sign up to get access to members only content</h4>
                        <button className="flex lg:hidden w-full my-3 items-center justify-center p-3 rounded-full border border-lightGray/40 text-base lg:text-lg gap-2"><FcGoogle/>Sign up with Google</button>
                        <span className="text-sm flex lg:hidden justify-center">or</span>
                    </div>
                    <div className="flex flex-col items-start justify-start relative">
                        <label htmlFor="username" className="text-base">Username</label>
                        <input 
                            type="text" 
                            autoFocus 
                            className="required border-b border-lightGray/80 outline-none text-base w-full pl-7 p-2" 
                            placeholder="John Doe"
                            name="username"
                            value={username}
                            onChange={handleChange} 
                            required
                        />
                        <span className="absolute left-0 bottom-4 text-darkGray"><FaRegUser/></span>
                    </div>
                    <div className="flex flex-col items-start justify-start py-1 relative">
                        <label htmlFor="email" className="text-base">Email</label>
                        <input 
                            type="email" 
                            className="required  border-b border-lightGray/80 outline-none text-base w-full pl-7 p-2" 
                            placeholder="example@gmail.com" 
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                        <span className="absolute left-0 bottom-4 text-darkGray"><MdOutlineMail/></span>
                    </div>
                    <div className="flex flex-col items-start justify-start relative">
                        <label htmlFor="password" className="text-base">Password</label>
                        <input 
                            type={viewPwd? "text" : "password"} 
                            className=" border-b border-lightGray/80 outline-none text-base w-full pl-7 p-2" 
                            placeholder="**********"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                        <span onClick={togglePwd} className='absolute top-[54%] right-10 text-brown transition-transform  duration-300 cursor-pointer text-darkGray'>{viewPwd? <LuEye /> : <LuEyeOff/>}</span>
                        <span className="absolute left-0 top-1/2 text-darkGray"><LuLock/></span>
                    </div>
                    <div className="flex flex-col items-start justify-start relative">
                        <label htmlFor="password" className="text-base">Confirm Password</label>
                        <input 
                            type={viewConfirmPwd? "text" : "password"} 
                            className=" border-b border-lightGray/80 outline-none text-base w-full pl-7 p-2" 
                            placeholder="**********"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <span onClick={toggleConfirmPwd} className='absolute top-[54%] right-10 text-brown transition-transform  duration-300 cursor-pointer text-darkGray'>{viewConfirmPwd? <LuEye /> : <LuEyeOff/>}</span>
                        <span className="absolute left-0 top-1/2 text-darkGray"><LuLock/></span>
                    </div>
                    <p className="gap-2 flex py-1 items-center text-sm"><input type="checkbox" required name="" id="" className="cursor-pointer" />I accept the terms of use.</p>
                    <span className="text-red text-sm flex">{isError && isError}</span>
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
                    <span className="text-sm hidden lg:flex justify-center">or</span>
                    <button className="hidden lg:flex w-full my-2 items-center justify-center p-3 rounded-full border border-lightGray/40 text-base gap-2 hover:shadow"><FcGoogle size={20}/>Sign up with Google</button>
                    <span className=" lg:text-sm block lg:py-3">Already have an account?<Link to={'/login'} className="text-blue1 px-2 hover:underline decoration-2 underline-offset-2">login</Link></span>
                </form>
            </div>
        </div>
    </div>
  )
}