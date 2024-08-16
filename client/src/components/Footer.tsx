import { Link } from "react-router-dom"
import Logo from "../shared/Logo"
import {SocialMedia,} from "../shared/SocialMedia"
import { LuHeart } from "react-icons/lu"


const Footer = () => {
  return (
    <div className=" bg-blue1 text-sm md:text-base">
        <div className="flex flex-col justify-center items-center text-white px-3 h-72">
            <div className="p-4"><Logo/></div>
            <div className="flex gap-4 text-white/80">
              <Link to={"/"}>Sign up</Link>
              <Link to={"/"}>About</Link>
              <Link to={"/"}>Pricing</Link>
              <Link to={"/"}>Blog</Link>
            </div>
            <div className="flex space-x-2 p-2 flex-wrap justify-center items-center text-lightGray">
              <span>&copy;2024</span>
              <span>Terms & Conditions</span>
              <span>Privacy</span>
              <span>Support</span>
              <span>Newsletter</span>
            </div>
            <SocialMedia/>
            <div className="flex items-center md:pt-10 p-5 text-white/80">Built with <LuHeart className="mx-1 text-seaGreen" /> by Kennytech</div>
        </div>
    </div>
  )
}

export default Footer