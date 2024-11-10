import { useMemo, useState } from 'react'
import { BlogProps } from '../interface/BlogProps';
import displayRandom from '../utils/ShufflePost';
import { Link } from 'react-router-dom';
import scrollToTop from '../utils/ScrollTo';

interface DisplayPosts {
    stylePosts: BlogProps[]
}


const StylePosts = ({stylePosts}: DisplayPosts) => {
    // const shufflePost = displayRandom(stylePosts)

    const [selectedCategory, setSelectedCategory] = useState<string >("software");

    const items = Array.from(new Set(stylePosts.map(item => item.label)));
  
    const handleLabelClick = (label: string) => {
        setSelectedCategory(label);
    };
  
    // const filteredItems = selectedCategory ? shufflePost.filter(item => item.label === selectedCategory).slice(0, 3) : [];

    const filteredItems = useMemo(() => {
        return selectedCategory ? displayRandom(stylePosts).filter(item => item.label === selectedCategory).slice(0, 3) : [];
    },[selectedCategory, stylePosts])
   
  return (
    <div className='p-2 rounded text-sm bg-white'>
        <div className='flex flex-wrap justify-between py-2 md:py-5 items-center w-full'>
            <p className='font-bold text-base md:text-xl'>Style</p>
            <div className='flex truncate items-center justify-center gap-2'>
                {
                    items && items.map(item => {
                        return (
                            <div key={item} onClick={() => handleLabelClick(item)} className={`sm:px-2 sm: py-2 p-1 text-sm rounded cursor-pointer truncate ${selectedCategory === item ? 'bg-blue1 text-white' : 'bg-lightGray text-black'}`}>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
        </div>
        {
            selectedCategory && filteredItems.length? (
                <>
                    <div className='grid grid-cols-3 gap-2 content-center transition-all duration-700'>
                        <div className='col-span-3 md:col-span-2'>
                            {
                                filteredItems[0] && (
                                    <Link onClick={scrollToTop} to={`blog/${filteredItems[0]._id}`} key={filteredItems[0]._id} className='p-2 rounded-lg group flex flex-col h-96 overflow-hidden'>
                                        <div className='overflow-hidden h-2/3 rounded-lg'>
                                            {(filteredItems[0].image)?.includes('uploads') ? 
                                            <img src={`http://localhost:3000${filteredItems[0].image}` || filteredItems[0].image} alt="" className='h-full w-full object-cover object-center group-hover:scale-105 duration-500 ' />
                                            :
                                            <img src={ filteredItems[0].image} alt="" className='h-full w-full object-cover object-center group-hover:scale-105 duration-500 ' />
                                            }
                                        </div>
                                        <div className=' overflow-hidden'>
                                            <p className='text-blue2 cursor-pointer underline decoration-2 decoration-seaGreen'>{filteredItems[0].label}</p>
                                            <p className='capitalize font-bold text-lg truncate'>{filteredItems[0].title}</p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <p className="text-darkGray capitalize">{filteredItems[0].author}</p>
                                                <p className="text-darkGray">{new Date(filteredItems[0].updatedAt).toLocaleDateString('default', { month:"long", year:"numeric" })}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }

                        </div>
                        <div className='gap-2 flex flex-col col-span-3 md:col-span-1'>
                            <div className='shadow-xs rounded'>
                                {
                                    filteredItems[1] && (
                                        <Link onClick={scrollToTop} to={`blog/${filteredItems[1]._id}`} key={filteredItems[1]._id} className='flex flex-col h-48 p-1 group rounded-lg'>
                                            <div className='h-3/4 md:h-1/ overflow-hidden rounded-lg'>
                                                {
                                                    (filteredItems[1].image)?.includes('uploads')?
                                                    <img src={`http://localhost:3000${filteredItems[1].image}` || filteredItems[1].image} alt="" className='h-full w-full object-cover object-center rounded group-hover:scale-105 duration-500 ' />
                                                    :
                                                    <img src={filteredItems[1].image} alt="" className='h-full w-full object-cover object-center rounded group-hover:scale-105 duration-500 ' />
                                                }
                                            </div>
                                            <div>
                                                <p className='text-blue2 cursor-pointer underline decoration-2 decoration-seaGreen'>{filteredItems[1].label}</p>
                                                <p className='capitalize font-bold truncate'>{filteredItems[1].title}</p>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <p className="text-darkGray capitalize">{filteredItems[1].author}</p>
                                                    <p className="text-darkGray">{new Date(filteredItems[1].updatedAt).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                            <div className='shadow-xs rounded'>
                                {
                                    filteredItems[2] && (

                                    <Link onClick={scrollToTop} to={`blog/${filteredItems[2]._id}`} key={filteredItems[2]._id} className='flex flex-col h-48 p-1 group rounded-lg'>
                                        <div className='h-3/4 md:h-1/ overflow-hidden rounded-lg'>
                                            {
                                                (filteredItems[2].image)?.includes('uploads')?
                                                <img src={`http://localhost:3000${filteredItems[2].image}` || filteredItems[2].image} alt="" className='h-full w-full object-cover object-center rounded-lg group-hover:scale-105 duration-500' />
                                                :
                                                <img src={filteredItems[2].image} alt="" className='h-full w-full object-cover object-center rounded-lg group-hover:scale-105 duration-500' />
                                            }
                                        </div>
                                        <div>
                                            <p className='text-blue2 cursor-pointer underline decoration-2 decoration-seaGreen'>{filteredItems[2].label}</p>
                                            <p className='capitalize font-bold truncate'>{filteredItems[2].title}</p>
                                            <div className="flex items-center gap-2 text-xs">
                                                <p className="text-darkGray capitalize">{filteredItems[2].author}</p>
                                                <p className="text-darkGray">{new Date(filteredItems[2].updatedAt).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </>
            ):
            <div className='text-sm animate-pulse text-lightGray'>Please wait...</div>
        }
    </div>
  )
}

export default StylePosts

