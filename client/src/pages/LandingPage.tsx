import Header from '../components/Header'
import { UseData } from "../context/Blog"
import Hero from '../components/Hero'
import Wrapper from '../shared/Wrapper'
import LatestPosts from '../components/LatestPosts'
import { SideScreen } from '../components/SideScreen';
import StylePosts from '../components/StylePosts';


const LandingPage = () => {
  const {data, isLoading, isError} = UseData()
   
  // console.log(data)

    if(isLoading){
      <span>Loading...</span>
    }

    if(isError){
      <span>error...</span>
    }

  return (
    <Wrapper>
        <Header/>
        <Hero posts={data} />
        {/* posts */}
        <div className='grid grid-cols-7 relative gap-3 h-full'> 
            <div className='col-span-7 md:col-span-5'>
                <StylePosts stylePosts={data}/>
                <LatestPosts blogs={data}/>
            </div>
            <div className='col-span-7 md:col-span-2 border'>
                <SideScreen/>
            </div>
        </div>
    </Wrapper>
  )
}

export default LandingPage