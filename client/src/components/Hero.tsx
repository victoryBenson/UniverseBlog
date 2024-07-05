import { Link } from "react-router-dom"
import Logo from "../shared/Logo"
import SocialMedia from "../shared/SocialMedia"
import { FaRegUserCircle } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { GoHome } from "react-icons/go"
import { LuPenLine } from "react-icons/lu"
import { IoLockClosedOutline } from "react-icons/io5"


const Hero = () => {
  return (
    <>
        <div className='bg-gradient-to-r from-blue1 to-blue2 text-white wave-container'>
            <div className="absolute top-0 inset-0 h-20 bg-black z-20"></div>
            <div className="flex items-center justify-end relative h-20 p-2 gap-2">
                <div><SocialMedia/></div>
                <div className="rounded flex  items-right w-1/5 text-black ">
                    <input type="text" name="" id="" placeholder="search here" className="p-2 outline-none w-full rounded text-blue1" />
                </div>
            </div>
            <div className="flex items-center justify-between mx-10 h-14 bg-whit text-blue p-3 rounded">
                <div><Logo/></div>
                <div  className="gap-4 flex">
                    <Link to={'/'} className="flex items-center"><GoHome />home</Link>
                    <Link to={'/'} className="flex items-center">categories <IoIosArrowDown /></Link>
                    <Link to={'/'} className="flex items-center">topics</Link>
                    <Link to={"/"} className="flex items-center"> <LuPenLine />write</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link to={"/"} className="flex items-center"><IoLockClosedOutline />login</Link>
                    <Link to={"/"}><FaRegUserCircle /></Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Hero