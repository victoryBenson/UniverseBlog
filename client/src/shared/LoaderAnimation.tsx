import { GiMoebiusTriangle } from "react-icons/gi";
import { TbLoader3 } from "react-icons/tb";

const LoaderAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div>
            <TbLoader3 className="animate-spin text-blue1" size={40} />
        </div>
    </div>
  )
};


const LoaderAnimation2 = () => {
    return (
        <div className="flex items-center justify-center h-inherit">
            <div className="">
                <TbLoader3 className="animate-spin text-blue1" size={40} />
            </div>
        </div>
    )
}

const FullScreenLoader = () => {
    return (
        <div className="flex items-center justify-center h-inherit bg-black/80 fixed inset-0 z-[999]">
            <div className="flex flex-col items-center shadow-inner bg-gradient-to-tr from-blue1 to-blue2 via-seaGreen rounded-full p-4 animate-pulse">
                <GiMoebiusTriangle className=" text-white" size={40}/>
            </div>
        </div>
    )
}

export {
    LoaderAnimation,
    LoaderAnimation2,
    FullScreenLoader
};