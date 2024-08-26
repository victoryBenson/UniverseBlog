import { FaArrowRightLong } from "react-icons/fa6"
import Logo from "../shared/Logo"
import { GiMoebiusTriangle } from "react-icons/gi"
import image from "../assets/images/forgotpassword.jpg"
import { Link} from "react-router-dom"
import { MdOutlineMail } from "react-icons/md"
import { FormEvent, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { TbLoader3 } from "react-icons/tb"
import { UserAuth } from "../context/Auth"


interface OtpProps{
    onNext: () => void;
    setEmail: (email: string) => void;
}


const ForgotPassword = ({onNext, setEmail}: OtpProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string | null>();
    const [email, setEmailState] = useState<string>('');
    const {forgotPassword} = UserAuth()
    

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)

            await forgotPassword({email})
            setEmail(email)
            toast.success("Check your mail to get your OTP");
            onNext()
        } catch (error: unknown) {
            if(axios.isAxiosError(error)){
                setIsError(error.response?.data?.message)
                toast.error(`${error.response?.data?.message}`)
            }else{
                setIsError("An unknown error occurred")
                toast.error(`An unknown error occurred`)
            }
        }finally{
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
                <h1 className='font-extrabold text-5xl p-5'>Forgot Password?</h1>
                <h4 className='text-xl p-2 text-center font-light'>No worries, Provide the email address associated with your account!</h4>
            </div>
            <div className='bg-white min-h-full flex justify-center flex-col items-center relative p-5'>
                <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-3/4">
                    <div className="text-center lg:hidden">
                        <div className="flex items-center justify-center ">
                            <GiMoebiusTriangle className=" rounded"/>
                        </div>
                        <h1 className='font-extrabold text-xl p-2'>Forgot Password?</h1>
                        <h4 className='text-base p-2 text-center text-darkGray'>No worries, Provide the email address associated with your account!</h4>
                    </div>
                    <div className="flex flex-col items-start justify-start py-4 relative">
                        <label htmlFor="email" className="text-lg md:text-2xl">Enter your Email</label>
                        <input 
                            type="email" 
                            autoFocus 
                            className="required  border-b border-lightGray/80 outline-none text-xl w-full pl-7 p-2 font-light" 
                            placeholder="example@gmail.com"
                            onChange={(e)=> setEmailState(e.target.value)}
                            required
                            value={email} 
                        />
                        <span className="absolute left-0 bottom-7 text-darkGray"><MdOutlineMail size={20}/></span>
                    </div>
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
                    <span className="pl-4 my-3 block py-3">no account yet?<Link to={'/register'} className="text-blue1 px-2 hover:underline decoration-2 underline-offset-2">create one</Link></span>
                </form>
            </div>
        </div>
    </div>
  )
}


export default ForgotPassword;