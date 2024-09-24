import { useParams } from "react-router-dom";
import { BlogProps, CreateBlogProps } from "../interface/BlogProps";
import { UseData } from "../context/Blog";
import { FullScreenLoader } from "../shared/LoaderAnimation";
import { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import Wrapper from "../shared/Wrapper"
import { AiOutlineCloudUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import isQuillContentEmpty from "../utils/ValidateQillContent";
import { MdArrowBackIosNew } from "react-icons/md";
import scrollToTop from "../utils/ScrollTo";



Quill.register('modules/imageResize', ImageResize);
const FontSize = Quill.import('formats/size');
FontSize.whitelist = ['small', 'normal', 'large', 'huge']; 
Quill.register(FontSize, true);


const initialState: CreateBlogProps = {
    author: "",
    title: "",
    content: "",
    readTime: "",
    label: "",
    image: "",
    img: null as File | null,
    imagePrev:""
};



const EditBlog = () => {
    const [blog, setBlog] = useState<BlogProps | undefined>();
    const {id} = useParams<string>()
    const { isLoading, isError, getBlogByID, updateBlog} = UseData();
    const [formState, setFormState] = useState<CreateBlogProps>(initialState);
    const {author, title, readTime, label, image, img, imagePrev} = formState;
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>()
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null);


    const goBack = () =>{
        navigate(-1)
    }

    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlog = await getBlogByID(id!);
            setBlog(fetchedBlog)
        }
        fetchBlog();
    },[])
    
 
    useEffect(() => {
        if(blog){
            setFormState({
                author: blog?.author || "",
                title: blog?.title || "",
                content: blog?.content || "",
                readTime: blog?.readTime || "",
                label: blog?.label || "",
                image: blog?.image || ""
            });
            setContent(blog.content)
        }
    },[blog])
    

    if(isLoading){
        return <div><FullScreenLoader/></div>
    }

    if(isError){
        return <div className="text-red text-center p-2">{isError}</div>
    }

    const handleClick = () => {
        inputRef.current?.click()
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({
          ...formState,
          [e.target.name]: e.target.value,
        });
    };


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if(imageFile){
            setFormState({
                ...formState,
                img: imageFile,
                imagePrev:URL.createObjectURL(imageFile)
            })
        }
    };


    //for quill editor
    const handleContentChange = (value: string) => {
        setContent(value)
    };


    //handle-update
    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {

            if(!img && !image){
                toast.error("Please upload an image!")
                return
            }

            if(content){
                if(isQuillContentEmpty(content)){
                    toast.error("Pls write a content")
                    return
                }
            }
    
            const formData = new FormData();
            if(author !== undefined){
                formData.append('author', author);
            }
            if(title !== undefined){
                formData.append("title", title);
            }
            if(content !== undefined){
                formData.append("content", content);
            }
            if(readTime !== undefined){
                formData.append("readTime", readTime);
            }
            if(label !== undefined){
                formData.append("label", label);
            }
            if(img){
                formData.append("image", img);
            }

            await updateBlog(id!, formData)
            toast.success('Blog updated Successfully!')

           if(blog){
            navigate(-1)
           }
        

        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                toast.error(`${error.message}`)
                console.log(error)
                console.log(error.message)
            }else{
                setError("An unknown error occurred")
            }
        }finally{
            setLoading(false)
        }
    };

    const modules = {
        toolbar: [
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, {'align': []},],
            [{ 'font': [] }, ],
            // [{ 'script': 'sub' },{'script':'super' }],
            // [{ 'color': [] }, { 'background': [] }],
            ['link', 'image',],
            // ['clean']
        ],
      
        imageResize: {
            modules: ['Resize', 'DisplaySize']
         }
    }
    const formats = [
        // 'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'align','font','script',
        'color', 'background',
        'link', 'image',
        'clean',
        'size'
    ]

  return (
    <Wrapper>
        <div className="min-h-screen flex justify-center md:m-10 p-2 rounded-lg ">
            <form ref={formRef} onSubmit={handleSubmit} className=" md:w-[80%] flex flex-col items-center ">
                <div className="h-full flex justify-center items-center">
                    <label
                        className='flex justify-center items-center cursor-pointer overflow-hidden h-40 md:h-40 w-[80vw] md:w-[50vw] my-2 rounded-lg border-dashed border-2 border-darkGray'
                        onClick={handleClick}
                    >
                        {
                            imagePrev ? (
                                <div className='overflow-hidden w-full h-full'>
                                    <img src={imagePrev} alt="ProfilePreview" className='h-full w-full rounded object-cover object-top' />
                                </div>
                            ):
                             image?
                            (<img src={image} alt="ProfilePreview" className='h-full w-full rounded object-cover object-top' />)
                            :
                             (
                                <div className="flex flex-col items-center">
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
                <div className="flex flex-col gap-2 items-center justify-center my-5">
                    <div className="w-full md:w-2/3">
                        <input type="text" name="title" required value={title} onChange={handleInputChange} placeholder="blog title" className="p-3 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                    </div>
                    <div className="gap-4 flex flex-wrap items-center justify-center">
                        <div className="w-full md:w-auto">
                            <input type="text" name="author" required value={author} onChange={handleInputChange}  placeholder="author" className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40"/>
                        </div>
                        <div className="w-full md:w-auto">
                            <select id="labels" name="label" onChange={handleInputChange} className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40">
                                <option value="" className="text-lightGray">-select label-</option>
                                <option value="technology">technology</option>
                                <option value="gadget">gadget</option>
                                <option value="editor's pick">editor's pick</option>
                                <option value="software">software</option>
                            </select>
                        </div>
                        <div className="w-full md:w-auto">
                        <select id="readTime" name="readTime" onChange={handleInputChange} className="p-2 w-full ring-1 ring-blue2/20 rounded-xl focus:ring-2 focus:outline-blue1/60 bg-arch/40">
                                <option value="" className="text-lightGray">-select read time-</option>
                                <option value="1min">1 minute</option>
                                <option value="2min">2 minutes</option>
                                <option value="3min">3 minutes</option>
                                <option value="4min">4 minutes</option>
                                <option value="5min">5 minutes</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center h-full overflow-hidden no-scrollbar">
                        <ReactQuill 
                            value={content} 
                            className="md:w-[80%] mt-5 text-base" 
                            placeholder="Write something here..."
                            formats={formats}
                            modules={modules}
                            onChange={handleContentChange}
                        />
                    </div>
                </div>
                <div className="text-red">{error && error }</div>
                <div className="md:w-[80%] w-full rounded-lg h-20 my-2">
                    {
                        !loading? 
                        (<button type='submit' disabled={loading} className="w-full h-full p-3 bg-blue1 text-white rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer">
                            <AiOutlineCloudUpload />Update
                        </button>
                        ) :
                        (
                            <FullScreenLoader/>
                        )
                    }
                </div>
                <div onClick={scrollToTop} className="md:w-[80%] w-full rounded-lg h-20 my-2">
                    <button onClick={goBack} className="w-full h-full p-3 bg-white hover:bg-blue1 hover:text-white text-blue1 border-[.5px] rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center cursor-pointer">
                        <MdArrowBackIosNew />cancel and go back
                    </button>
                </div>
            </form>
        </div>
    </Wrapper>
  )
}

export default EditBlog;


