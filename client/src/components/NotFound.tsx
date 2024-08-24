import { Link } from "react-router-dom"


const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        <p className="font-bold text-4xl">Not Found!</p>
        <Link to={"/"} className="text-blue1 py-5">Home Page</Link>
    </div>
  )
}

export default NotFound