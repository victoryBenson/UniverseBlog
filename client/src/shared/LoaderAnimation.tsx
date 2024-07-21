import { TbLoader3 } from "react-icons/tb";

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

export {
    LoaderAnimation,
    LoaderAnimation2
};