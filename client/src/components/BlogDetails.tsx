import { useParams } from 'react-router-dom'
import { UseData } from '../context/Blog';

type BlogParams = {
  id: string;
}

const BlogDetails = () => {
  const {id} = useParams<BlogParams>();
  const {getBlogById, isLoading, isError} = UseData();
  const blog = getBlogById(parseInt(id!));
  console.log(blog)

  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>{isError || 'An error occured'}</div>
  }

  if(!blog){
    return <div>No blog found</div>
  }

  return (
    <div className='min- h-screen'>
      <p>{blog._id}</p>
    </div>
  )
}

export default BlogDetails