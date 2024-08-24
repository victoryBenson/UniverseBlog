import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Wrapper from "../shared/Wrapper"
import { AiOutlineCloudUpload } from "react-icons/ai";
import { UseData } from "../context/Blog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import { FullScreenLoader} from "../shared/LoaderAnimation";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import isQuillContentEmpty from "../utils/ValidateQillContent";

Quill.register('modules/imageResize', ImageResize);
const FontSize = Quill.import('formats/size');
FontSize.whitelist = ['small', 'normal', 'large', 'huge']; // Allowed font sizes
Quill.register(FontSize, true);


const CreateBlog = () => {
    const [author, setAuthor] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [readTime, setReadTime] = useState<string>("");
    const [img, setImg] = useState<File | null>(null);
    const [imagePrev, setImagePrev] = useState<string>("");
    const [label, setLabel] = useState<string>("")
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
            setImg(imageFile);
            setImagePrev(URL.createObjectURL(imageFile))
        }
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

            if(isQuillContentEmpty(content)){
                toast.error("Pls write a content")
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
    
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },  
            {'align': []},],
            [{ 'font': [] }, ],            
            ['link', 'image'],
            // ['clean']
        ],
      
        imageResize: {
            modules: ['Resize', 'DisplaySize']
         }
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'align','font','script',
        'color',
        'link', 'image',
        'clean',
        // 'size'
    ]

  return (
    <Wrapper>
        <div className="min-h-screen w-auto flex flex-col justify-center items-center rounded-lg bg-white ">
            <form ref={formRef} onSubmit={handleSubmit} className="">
                <div className="h-full justify-center items-center">
                    <label
                        className='flex justify-center items-center cursor-pointer overflow-hidden h-28 my-2 rounded-lg border-dashed border-2 border-lightGray'
                        onClick={handleClick}
                    >
                        {
                            imagePrev ? (
                                <div className='overflow-hidden w-full h-full'>
                                    <img src={imagePrev} alt="ProfilePreview" className='h-full w-full rounded object-cover object-top' />
                                </div>
                            ):(
                                <div className="flex flex-col items-center w-full">
                                   <FcAddImage size={60} />
                                   <p className="text-darkGray">Click to add cover image</p>
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
                <div className="flex flex-col gap-2 items-center justify-center my-2">
                    <div className="w-full">
                        <input type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New blog title..." className="p-3 w-full font-semibold rounded-xl text-base md:text-lg lg:text-3xl outline-none my-2"/>
                    </div>
                    <div className="gap-4 flex flex-wrap items-center justify-center">
                        <div className="w-full md:w-auto">
                            <input type="text" name="author" required value={author} onChange={(e) => setAuthor(e.target.value)}  placeholder="author's name" className="p-3 w-full rounded-lg outline-none border border-lightGray/40"/>
                        </div>
                        <div className="w-full md:w-auto">
                            <select id="labels" name="label" onChange={(e) => setLabel(e.target.value)} required className="p-3 w-full rounded-lg outline-none border border-lightGray/40">
                                <option value="" className="text-lightGray">-select label-</option>
                                <option value="technology">technology</option>
                                <option value="gadget">gadget</option>
                                <option value="editor's pick">editor's pick</option>
                                <option value="software">software</option>
                            </select>
                        </div>
                        <div className="w-full md:w-auto">
                        <select id="readTime" name="readTime" onChange={(e) => setReadTime(e.target.value)} required className="p-3 w-full rounded-lg outline-none border border-lightGray/40">
                                <option value="" className="text-lightGray">-select read time-</option>
                                <option value="1">1 minute</option>
                                <option value="2">2 minutes</option>
                                <option value="3">3 minutes</option>
                                <option value="4">4 minutes</option>
                                <option value="5">5 minutes</option>
                            </select>
                        </div>
                    </div>
                    <div className=" h-full w-full overflow-hidden prose-lg">
                        <ReactQuill 
                            value={content} 
                            className="prose-lg" 
                            placeholder="Write your post content here..."
                            formats={formats}
                            modules={modules}
                            onChange={setContent}
                            />
                    </div>
                </div>
                <div className="text-red">{isError && isError }</div>
                <div className=" w-full h-full my-5 rounded">
                    {
                        !loading? 
                        (<button disabled={loading} type='submit' className="w-full p-3 bg-blue1 text-white rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center cursor-pointer">
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