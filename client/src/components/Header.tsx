import { Link } from "react-router-dom"
import Logo from "../shared/Logo"
import {SocialMedia} from "../shared/SocialMedia"
import { FaRegUserCircle } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { LuPenLine } from "react-icons/lu"
import { IoLockClosedOutline } from "react-icons/io5"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { useEffect, useState } from "react"
import MobileSideMenu from "./MobileSideMenu"
import scrollToTop from "../utils/ScrollTo"



const Header = () => {
    const [mobile, setMobile] = useState<boolean>(false)
    const [category, setCategory] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false)

    const handleMobileView = () => {
        setMobile(!mobile)
    };

    const handleCategory = () => {
        setCategory(!category)
    }

    useEffect(() => {
        window.addEventListener('scroll', ()=>{
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
        })
    }, [])
 

  return (
    <div className={`${isActive && 'fixed z-40 inset-0 top-0 py-3 h-20 bg-white'}`}>
        <div className='bg-gradient-to-l h-14 md:h-18 from-blue1 via-seaGreen to-blue2 text-white rounded-lg justify-between items-center p-2 px-3 flex m-2 md:mx-16 md:my-5'>
            <Link to={"/"}>
                <Logo/>
            </Link>
            <div className="flex md:hidden " >
                <HiOutlineMenuAlt3 size={30} onClick={handleMobileView}/>
                {mobile && (
                    <MobileSideMenu 
                        handleMobile={handleMobileView}
                    />
                )}
            </div>
            <div  className="gap-4 hidden lg:flex text-lg">
                <Link to={'/'} >Home</Link>
                <div className="flex items-center relative">
                    <span onClick={handleCategory} className="flex items-center cursor-pointer">
                        Categories <IoIosArrowDown />
                    </span>
                    {
                        category && (
                            <div className="w-40 bg-white text-darkGray absolute top-10 rounded shadow p-2 z-10 transition-all duration-300">
                                <p className="p-2 cursor-pointer my-1 hover:bg-blue1 hover:text-white hover:rounded">Software</p>
                                <p className="p-2 cursor-pointer my-1 hover:bg-blue1 hover:text-white hover:rounded">Editor's Pick</p>
                                <p className="p-2 cursor-pointer my-1 hover:bg-blue1 hover:text-white hover:rounded">Gadget</p>
                                <p className="p-2 cursor-pointer my-1 hover:bg-blue1 hover:text-white hover:rounded">Technology</p>
                            </div>
                        )
                    }
                </div>
                <Link to={"/createBlog"} onClick={scrollToTop} className="flex items-center cursor-pointer"> <LuPenLine />Write</Link>
            </div>
            <div className="items-center justify-between hidden md:flex  h-14 md:gap-4">
                <div className="hidden md:flex"><SocialMedia/></div>
                <div className="rounded   items-right w-1/2  text-black ">
                    <input type="text" name="" id="" placeholder="search here" className="p-2 outline-none w-full rounded text-black/60 font-normal" />
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <Link to={"/"} className="flex items-center"><IoLockClosedOutline />login</Link>
                    <Link to={"/"}><FaRegUserCircle size={20}/></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header