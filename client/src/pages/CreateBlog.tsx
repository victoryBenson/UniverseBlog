import Wrapper from "../shared/Wrapper"

const CreateBlog = () => {
  return (
    <Wrapper>
        <div className="max-h-screen flex justify-center">
            <form className="rounded-lg h-inherit md:w-[80%] shadow-lg flex flex-col items-center my-2">
                <div className="h-40 w-full md:w-[80%] my-2 rounded border overflow-hidden">
                    <img src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" className="object-contain w-full h-full" alt="image file" />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center my-2">
                    <div className="w-full md:w-auto">
                        <input type="text" placeholder="blog title" className="border p-2 rounded w-full"/>
                    </div>
                    <div className="gap-4 flex flex-wrap items-center justify-center">
                        <div className="w-full md:w-auto">
                            <input type="text"  placeholder="author" className="border p-2 rounded w-full flex"/>
                        </div>
                        <div className="w-full md:w-auto">
                            <input list="labels"  placeholder="select label" className="border p-2 rounded w-full"/>
                            <datalist id="labels">
                                <option value="technology"></option>
                                <option value="gadget"></option>
                                <option value="editor's pick"></option>
                                <option value="software"></option>
                            </datalist>
                        </div>
                        <div className="w-full md:w-auto">
                            <input list="readTime"  placeholder="select read time" className="border p-2 rounded w-full"/>
                            <datalist id="readTime">
                                <option value="1"></option>
                                <option value="2"></option>
                                <option value="3"></option>
                                <option value="4"></option>
                                <option value="5"></option>
                            </datalist>
                        </div>
                    </div>
                    <textarea name="content" id="" rows={10} className="border w-full p-2" placeholder="tell your story"></textarea>
                </div>
                <div className="w-full md:w-[80%] my-5 rounded">
                    <button className="w-full p-3 bg-blue1 text-white rounded">Publish</button>
                </div>
            </form>
        </div>
    </Wrapper>
  )
}

export default CreateBlog;