import { TbLoader3, TbLoaderQuarter } from "react-icons/tb";

const LoaderAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="">
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
        <div className="flex items-center justify-center h-inherit bg-white/80 fixed inset-0 z-[999]">
            <div className="flex flex-col items-center">
                <TbLoaderQuarter className="animate-spin text-blue1" size={40} />
                <p className="text-blue1 font-bold text-xl">please wait!</p>
            </div>
        </div>
    )
}

export {
    LoaderAnimation,
    LoaderAnimation2,
    FullScreenLoader
};