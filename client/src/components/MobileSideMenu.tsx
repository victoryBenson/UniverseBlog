import { Link } from 'react-router-dom'
import {SocialMedia} from '../shared/SocialMedia'
import { LuPenLine } from 'react-icons/lu'
import scrollToTop from '../utils/ScrollTo'
import { MdOutlineClose } from 'react-icons/md'


type HandleMobileBtnProps = {
    handleMobile: () => void,
}
const MobileSideMenu = ({handleMobile}: HandleMobileBtnProps) => {
   

  return (
    <div className=' top-0 fixed right-0 left-0 h-screen z-50 transition-all duration-200 ease-in'>
        <span onClick={handleMobile} className='bg-black/30 top-0 fixed right-0 left-0 h-screen z-50 transition-all duration-200 ease-in'></span>
        <div className='bg-white h-72 text-black inset-0 m-5 rounded-2xl fixed flex flex-col space-y-4 justify-center items-center z-[999] group'>
            <MdOutlineClose size={30} onClick={handleMobile} className='absolute top-4 right-4 cursor-pointer' />
            <Link to={"/"} onClick={scrollToTop} className='text-lg'>
                Home
            </Link>
            <Link to={"/createBlog"} className="flex items-center text-lg"> <LuPenLine />Write</Link>
            <Link to={"/login"} onClick={scrollToTop} className='text-lg bg-blue1 flex w-2/3 p-2 rounded-full text-white text-center justify-center'>
                Login
            </Link>
            <div>
                <p className='font-bold text-blue2'>Follow us</p>
                <SocialMedia/>
            </div>
        </div>
    </div>
  )
}

export default MobileSideMenu