import { Link } from 'react-router-dom'
import { UseData } from '../context/Blog'
import {SocialMedia} from '../shared/SocialMedia'
import { LuPenLine } from 'react-icons/lu'


type HandleMobileBtnProps = {
    handleMobile: () => void,
}
const MobileSideMenu = ({handleMobile}: HandleMobileBtnProps) => {
    const {scrollToTop} = UseData()

  return (
    <div onClick={handleMobile} className='bg-black/20 top-0 fixed right-0 left-0 h-screen z-50 transition-all duration-200 ease-in'>
        <div className='bg-white h-full text-black w-4/5 right-0 fixed flex flex-col space-y-4 justify-center items-center'>
            <Link to={"/"} onClick={scrollToTop}>
                home
            </Link>
            <Link to={"/createBlog"} className="flex items-center cursor-pointer"> <LuPenLine />Write</Link>
            <div>
                <p className='font-bold text-blue2'>Follow us</p>
                <SocialMedia/>
            </div>
        </div>
    </div>
  )
}

export default MobileSideMenu