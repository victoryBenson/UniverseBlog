import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Wrapper from "../shared/Wrapper"
import { AiOutlineCloudUpload } from "react-icons/ai";
import { NewBlog } from '../interface/BlogProps';
import { UseData } from "../context/Blog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import { FullScreenLoader} from "../shared/LoaderAnimation";


const initialState: NewBlog = {
    author: "",
    title: "",
    content: "",
    readTime: "",
    label: "",
    img: null as File | null,
    imagePrev: ""
};


const CreateBlog = () => {
    const [formState, setFormState] = useState<NewBlog>(initialState);
    const {author, title, content, readTime, label, img, imagePrev} = formState;
    const {createBlog} = UseData();
    const [loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<null | string>()
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null);


    const handleClick = () => {
        inputRef.current?.click()
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if(imageFile){
            setFormState({
                ...formState,
                img: imageFile,
                imagePrev: URL.createObjectURL(imageFile)
            })
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    }

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            if(!img){
                toast.error("Please upload an image!")
                console.log("Please upload an image!")
                return
            }
    
            const formData = new FormData();
            formData.append('author', author);
            formData.append("title", title);
            formData.append("content", content);
            formData.append("readTime", readTime);
            formData.append("label", label);
            formData.append("image", img);

            await createBlog(formData)

            toast.success('Blog created Successfully!')

            navigate("/")

        } catch (error) {
            if(error instanceof Error){
                setIsError(error.message)
            }else{
                setIsError("An unknown error occurred")
            }
        }finally{
            setLoading(false)
        }
    };

  return (
    <Wrapper>
        <div className="max-h-screen flex justify-center md:m-10 p-2 rounded-lg ">
            <form ref={formRef} onSubmit={handleSubmit} className=" md:w-[80%] flex flex-col items-center ">
                <div className="h-full flex justify-center items-center">
                    <label
                        className='flex justify-center items-center cursor-pointer overflow-hidden h-40 md:h-56 w-[80vw] md:w-[50vw] my-2 rounded-lg border-dashed border-2 border-darkGray'
                        onClick={handleClick}
                    >
                        {
                            imagePrev ? (
                                <div className='overflow-hidden w-full h-full'>
                                    <img src={imagePrev} alt="ProfilePreview" className='h-full w-full rounded object-cover object-top' />
                                </div>
                            ):(
                                <div className="flex flex-col items-center">
                                   <FcAddImage size={60} />
                                   <p className="text-darkGray">Click to add image</p>
                                </div>
                            )
                        }
                    </label>
                     <input
                        type="file"
                        accept='image/*'
                        hidden
                        name="image"
                        onChange={handleImageChange}
                        ref={inputRef}
                    />
                </div>

                <div className="flex flex-col gap-2 items-center justify-center my-2 h-full">
                    <div className="w-full md:w-2/3">
                        <input type="text" name="title" required value={title} onChange={handleChange} placeholder="blog title" className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                    </div>
                    <div className="gap-4 flex flex-wrap items-center justify-center">
                        <div className="w-full md:w-auto">
                            <input type="text" name="author" required value={author} onChange={handleChange}  placeholder="author" className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                        </div>
                        <div className="w-full md:w-auto">
                            <select id="labels" name="label" onChange={handleChange} required className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40">
                                <option value="" className="text-lightGray">-select an option-</option>
                                <option value="technology">technology</option>
                                <option value="gadget">gadget</option>
                                <option value="editor's pick">editor's pick</option>
                                <option value="software">software</option>
                            </select>
                        </div>
                        <div className="w-full md:w-auto">
                        <select id="readTime" name="readTime" onChange={handleChange} required className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40">
                                <option value="" className="text-lightGray">-select an option-</option>
                                <option value="1">1 minute</option>
                                <option value="2">2 minutes</option>
                                <option value="3">3 minutes</option>
                                <option value="4">4 minutes</option>
                                <option value="5">5 minutes</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full h-40 ">
                        <textarea name="content" value={content} onChange={handleChange} required className=" w-full h-full p-2 ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40" placeholder="Tell your story"></textarea>
                    </div>
                </div>
                <div className="text-red">{isError && isError }</div>
                <div className=" md:w-[80%] w-full my-5 rounded ">
                    {
                        !loading? 
                        (<button disabled={loading} className="w-full p-3 bg-blue1 text-white rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center cursor-pointer">
                            <AiOutlineCloudUpload />Publish
                        </button>
                        ) :
                        (
                            <FullScreenLoader/>
                        )
                    }
                </div>
            </form>
        </div>
    </Wrapper>
  )
}

export default CreateBlog;