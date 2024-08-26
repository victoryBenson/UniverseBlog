import { FaArrowRightLong } from "react-icons/fa6"
import Logo from "../shared/Logo"
import { Link, useNavigate } from "react-router-dom"
import { GiMoebiusTriangle } from "react-icons/gi"
import { FormEvent, useState } from "react"
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu"
import image from "../assets/images/newpassword.jpg"
import axiosInstance from "../utils/AxiosConfig"
import toast from "react-hot-toast"
import axios from "axios"
import { TbLoader3 } from "react-icons/tb";


interface NewPasswordProps {
    email: string;
    otp:string
}

const NewPassword = ({email, otp}: NewPasswordProps) => {
    const [viewPwd, setViewPwd] = useState<boolean>(false)
    const [viewConfirmPwd, setViewConfirmPwd] = useState<boolean>(false)
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate()


    const togglePwd = () => {
       setViewPwd(!viewPwd)
    }

    const toggleConfirmPwd = () => {
       setViewConfirmPwd(!viewConfirmPwd)
    };


    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axiosInstance.post('auth/resetPassword', {email, otp, newPassword, confirmNewPassword})
            toast.success('Congratulations!')
            navigate('/login')
            return response.data
        } catch (error:unknown) {
            if(axios.isAxiosError(error)){
                setError(error.response?.data.message);
                toast.error(`${error.response?.data.message}`);
            }else{
                setError("An unknown error occurred")
                toast.error('An unknown error occurred')
            }
        } finally{
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col justify-center items-center w-auto min-h-screen inset-0 overflow-hidden' >
        <div className='lg:grid grid-cols-1 sm:grid-cols-2 h-screen fixed inset-0'>
            <div  className=' min-h-full relative hidden lg:flex justify-center flex-col items-center text-white gap-4'>
                <span className='absolute inset-0 bg-blue1/70 -z-10'/>
                <span className='flex justify-center absolute inset-0 -z-20'>
                    <img src={image} alt="logo" className='h-full w-full object-cover' />
                </span>
                <Logo/>
                <h1 className='font-extrabold text-5xl p-5'>Create new Password!</h1>
                <h4 className='sign text-xl p-2 text-center '>Your new password must be different from previously used password</h4>
            </div>
            <div className='bg-white min-h-full flex justify-center flex-col items-center relative p-5'>
                <form onSubmit={handleSubmit} className="mx-[5%]">
                    <div className="text-center lg:hidden">
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center shadow-inner bg-gradient-to-tr from-blue1 to-blue2 via-seaGreen rounded-full p-4">
                                <GiMoebiusTriangle className=" text-white" size={20}/>
                            </div>
                        </div>
                        <h1 className='font-extrabold text-xl p-3'>Create new Password!</h1>
                        <h4 className='sign text-lg p-2 text-center '>Your new password must be differant from previously used password</h4>
                    </div>
                    <div className="flex flex-col items-start justify-start py-3 relative">
                        <label htmlFor="password" className="text-lg md:text-2xl text-darkGray">New Password</label>
                        <input 
                            type={viewPwd? "text" : "password"} 
                            className=" border-b border-lightGray/80 outline-none text-xl w-full lg:w-[30vw] pl-7 p-2" 
                            placeholder="**********" 
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            required
                        />
                        <span onClick={togglePwd} className='absolute top-[54%] right-10 text-darkGray transition-transform  duration-300 cursor-pointer'>{viewPwd? <LuEye /> : <LuEyeOff/>}</span>
                        <span className="absolute left-0 top-1/2 text-darkGray"><LuLock size={20}/></span>
                    </div>
                    <div className="flex flex-col items-start justify-start py-3 relative">
                        <label htmlFor="password" className="text-lg md:text-2xl text-darkGray">Confirm New Password</label>
                        <input 
                            type={viewConfirmPwd? "text" : "password"} 
                            className=" border-b border-lightGray/80 outline-none text-xl w-full lg:w-[30vw] pl-7 p-2" 
                            placeholder="**********" 
                            onChange={(e)=> setConfirmNewPassword(e.target.value) }
                            value={confirmNewPassword}
                            required
                        />
                        <span onClick={toggleConfirmPwd} className='absolute top-[54%] right-10 text-darkGray transition-transform  duration-300 cursor-pointer'>{viewConfirmPwd? <LuEye /> : <LuEyeOff/>}</span>
                        <span className="absolute left-0 top-1/2 text-darkGray"><LuLock size={20}/></span>
                    </div>
                    <span className="text-red">{error && error}</span>
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
                    <span className="pl-4 my-3 block py-3">no account yet?<Link to={'/register'} className="text-blue1 px-2 hover:underline decoration-2 underline-offset-2">create one</Link></span>
                </form>
            </div>
        </div>
    </div>
  )
}


export default NewPassword;