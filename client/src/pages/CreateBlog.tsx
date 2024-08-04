import Wrapper from "../shared/Wrapper"
import { AiOutlineCloudUpload } from "react-icons/ai";

const CreateBlog = () => {
  return (
    <Wrapper>
        <div className="max-h-screen flex justify-center md:m-10 p-2 rounded-lg ">
            <form className=" h-inherit md:w-[80%] flex flex-col items-center ">
                <div className="h-40 w-full md:w-[80%] cursor-pointer my-2 rounded border-dashed border-2 border-darkGray overflow-hidden flex justify-center items-center">
                    <div className="flex items-center text-xl text-darkGray h-inherit"><AiOutlineCloudUpload />click to upload image</div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center my-2">
                    <div className="w-full md:w-2/3">
                        <input type="text" placeholder="blog title" className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                    </div>
                    <div className="gap-4 flex flex-wrap items-center justify-center">
                        <div className="w-full md:w-auto">
                            <input type="text"  placeholder="author" className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                        </div>
                        <div className="w-full md:w-auto">
                            <input list="labels"  placeholder="select label" className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                            <datalist id="labels">
                                <option value="technology"></option>
                                <option value="gadget"></option>
                                <option value="editor's pick"></option>
                                <option value="software"></option>
                            </datalist>
                        </div>
                        <div className="w-full md:w-auto">
                            <input list="readTime"  placeholder="select read time" className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                            <datalist id="readTime">
                                <option value="1"></option>
                                <option value="2"></option>
                                <option value="3"></option>
                                <option value="4"></option>
                                <option value="5"></option>
                            </datalist>
                        </div>
                    </div>
                    <div className="w-full">
                        <textarea name="content" id="" rows={10} className=" w-full p-2 ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40" placeholder="Tell your story"></textarea>
                    </div>
                </div>
                <div className=" md:w-[80%] w-full my-5 rounded">
                    <button className="w-full p-3 bg-blue1 text-white rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
                        <AiOutlineCloudUpload />Publish
                    </button>
                </div>
            </form>
        </div>
    </Wrapper>
  )
}

export default CreateBlog;