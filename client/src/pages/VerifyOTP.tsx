import { FaArrowRightLong } from "react-icons/fa6"
import Logo from "../shared/Logo"
import { Link, useNavigate } from "react-router-dom"
import { GiMoebiusTriangle } from "react-icons/gi"
import { FormEvent, useRef, useState } from "react"
import image from "../assets/images/otp.jpg"
import axios from "axios"
import { UserAuth } from "../context/Auth"
import toast from "react-hot-toast"


const VerifyOTP = () => {
    const otpLength = 6;
    const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolen>(false);
    const {verifyOTP} = UserAuth();
    const navigate = useNavigate();


    const handleChange = (value: string, index: number) => {
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        
            // Move focus to the next input field
            if (index < otpLength - 1 && value) {
                inputRefs.current[index + 1]?.focus();
            }
        }
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
      };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData('Text').slice(0, otpLength);
        if (/^[0-9]+$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp.concat(Array(otpLength - newOtp.length).fill('')));
            inputRefs.current[newOtp.length - 1]?.focus();
        }
        e.preventDefault();
    };


    const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        try {
            await verifyOTP({otp})
            toast.success("Proceed to create new Password!");
            navigate('/newPassword');
        } catch (error: unknown) {
            if(axios.isAxiosError(error)){
                setError(error.response?.data.message);
                toast.error(`${error.response?.data.message}`)
            }else{
                setError("An unknown error occurred")
                toast.error('An unknown error occurred')
            }
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
                <h1 className='font-extrabold text-5xl p-5'>Get your Code!</h1>
            </div>
            <div className='bg-white min-h-full flex justify-center flex-col items-center relative p-5'>
                <form onSubmit={handleSubmit}>
                    <div className="text-center lg:hidden">
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center shadow-inner bg-gradient-to-tr from-blue1 to-blue2 via-seaGreen rounded-full p-4">
                                <GiMoebiusTriangle className=" text-white" size={20}/>
                            </div>
                        </div>
                        <h1 className='font-extrabold text-3xl p-3'>Get your Code!</h1>
                    </div>
                    <div className="flex flex-col items-start justify-start py-3 relative">
                        <label htmlFor="password" className="text-lg md:text-2xl">Enter your verification code(OTP)</label>
                        <div className="flex justify-start items-center text-center w-full py-3">
                            <div className="flex gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        className="w-12 h-12 border border-darkGray text-center font-lg rounded-lg focus-within:border-blue1 outline-none"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className=" py-3">
                        We've sent a verification 6 digits code to 
                        <span className="text-blue1 cursor-pointer"> example@gmail.com</span>
                        <p className="py-2">Not received? <button className="text-blue1 font-bold hover:underline">Resend(06)</button></p> 
                    </div>
                    <div>
                        <button className="flex bg-blue1 my-3 items-center justify-center p-3 rounded-full text-white w-full"><FaArrowRightLong size={30} className="animate-pulse"/></button>
                    </div>
                    <span className="pl-4 my-3 block py-3">no account yet?<Link to={'/register'} className="text-blue1 px-2 hover:underline decoration-2 underline-offset-2">create one</Link></span>
                </form>
            </div>
        </div>
    </div>
  )
}


export default VerifyOTP;