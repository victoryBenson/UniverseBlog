import { useState } from 'react'
import { BlogProps } from '../interface/BlogProps';
import displayRandom from '../utils/ShufflePost';

interface DisplayPosts {
    stylePosts: BlogProps[]
}


const StylePosts = ({stylePosts}: DisplayPosts) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("software");
    
    const shufflePost = displayRandom(stylePosts)
    // console.log(shufflePost[1])

    const handleClick = (label: string) => {
      setSelectedCategory(selectedCategory === label ? "software" : label);
    };
  
    const filteredItems = shufflePost.filter(item => item.label === selectedCategory);
    // console.log(filteredItems[2])

   
  return (
    <div className='p-2 my-2 rounded text-sm bg-white'>
        <div className='flex justify-between py-2 md:py-5 items-center'>
            <p className='font-bold text-base md:text-xl'>Style</p>
            <p className='space-x-2 text-xs md:text-sm'>
                <span className='bg-arch md:px-2 p-[.07rem] rounded cursor-pointer' onClick={()=> handleClick("software")}>software</span>
                <span className='bg-arch md:px-2 p-[.07rem] rounded cursor-pointer' onClick={()=> handleClick("gadget")}>gadget</span>
                <span className='bg-arch md:px-2 p-[.07rem] rounded cursor-pointer' onClick={()=> handleClick("technology")}>technology</span>
            </p>
        </div>
        {
            selectedCategory && (
                <>
                    <div  className='grid grid-cols-3 gap-2 content-center'>
                        <div className='col-span-3 md:col-span-2'>
                            {
                                filteredItems[0] && (
                                    <div key={filteredItems[0]._id} className=' shadow-xs rounded'>
                                        <div className='flex flex-col h-96 md:p-2'>
                                            <span className='h-2/3'>
                                                <img src={filteredItems[0].image} alt="" className='h-full w-full object-cover object-center rounded' />
                                            </span>
                                            <div className='h-full'>
                                                <p className='text-blue2 cursor-pointer underline decoration-2 decoration-seaGreen'>{filteredItems[0].label}</p>
                                                <p className='capitalize font-bold text-lg truncate'>{filteredItems[0].title}</p>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <p className="text-darkGray capitalize">{filteredItems[0].author}</p>
                                                    <p className="text-darkGray">{new Date(filteredItems[0].updatedAt).toLocaleDateString('default', { month:"long", year:"numeric" })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                        <div className='gap-2 flex flex-col col-span-3 md:col-span-1'>
                            <div className='shadow-xs rounded'>
                                {
                                    filteredItems[1] && (
                                        <div key={filteredItems[1]._id} className='flex flex-col h-48 p-1'>
                                            <span className='h-2/3 md:h-1/2'>
                                                <img src={filteredItems[1].image} alt="" className='h-full w-full object-cover object-center rounded' />
                                            </span>
                                            <div className='h-full'>
                                                <p className='text-blue2 cursor-pointer underline decoration-2 decoration-seaGreen'>{filteredItems[1].label}</p>
                                                <p className='capitalize font-bold truncate'>{filteredItems[1].title}</p>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <p className="text-darkGray capitalize">{filteredItems[1].author}</p>
                                                    <p className="text-darkGray">{new Date(filteredItems[1].updatedAt).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='shadow-xs rounded'>
                                {
                                    filteredItems[2] && (

                                    <div key={filteredItems[2]._id} className='flex flex-col h-48 p-1'>
                                        <span className='h-2/3 md:h-1/2'>
                                            <img src={filteredItems[2].image} alt="" className='h-full w-full object-cover object-center rounded' />
                                        </span>
                                        <div className='h-full'>
                                            <p className='text-blue2 cursor-pointer underline decoration-2 decoration-seaGreen'>{filteredItems[2].label}</p>
                                            <p className='capitalize font-bold truncate'>{filteredItems[2].title}</p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <p className="text-darkGray capitalize">{filteredItems[2].author}</p>
                                                <p className="text-darkGray">{new Date(filteredItems[2].updatedAt).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    </div>
  )
}

export default StylePosts


{/* <div>
    {
        filteredItems.map(filteredItems[0] => {
            const formattedDate = new Date(filteredItems[0].updatedAt).toLocaleDateString('default', { month: 'long', year: 'numeric' });
            return (
                <div key={filteredItems[0]._id} className='grid grid-cols-3 gap-2'>
                    <div className='col-span-2 shadow-xs rounded'>
                        <div className='flex flex-col h-80'>
                            <span className='h-2/3 p-2'>
                                <img src={filteredItems[0].image} alt="" className='h-full w-full object-cover object-center rounded' />
                            </span>
                            <div className='p-2'>
                                <p className='text-blue2 cursor-pointer underline decoration-2 decoration-seaGreen'>{filteredItems[0].label}</p>
                                <p className='capitalize font-bold'>{filteredItems[0].title}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-darkGray capitalize">{filteredItems[0].author}</p>
                                    <p className="text-darkGray">{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div key={filteredItems[0]._id} className='gap-2 flex flex-col '>
                        <div className='border'>{filteredItems[0].label}</div>
                        <div className='border'>{filteredItems[0].label}</div>
                    </div>
                </div>
            )
        })
    }
</div> */}