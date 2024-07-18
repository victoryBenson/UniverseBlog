import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";


const SocialMedia = () => {
  return (
    <div className="flex items-center gap-4">
        <Link to={"/"}>
            <FaFacebook size={20}/>
        </Link>
        <Link to={"/"}>
          <FaSquareXTwitter size={20}/>
        </Link>
        <Link to={"/"}>
          <RiInstagramFill size={20}/>
        </Link>
    </div>
  )
};


const SocialMedia2 = () => {
  return (
    <div className="flex items-center gap-4">
        <Link to={"/"}>
            <FaFacebook size={30}/>
        </Link>
        <Link to={"/"}>
          <FaSquareXTwitter size={30}/>
        </Link>
        <Link to={"/"}>
          <RiInstagramFill size={30}/>
        </Link>
    </div>
  )
}

export {
  SocialMedia,
  SocialMedia2
} 