
const Newsletter = () => {
  return (
    <div className="my-10 p-3 mx-2 rounded bg-white h-80 flex justify-center items-center">
        <div className="rounded space-y-2 ">
            <p className="font-bold text-xl py-3">Subscribe to Our Newsletter</p>
            <p className="text-darkGray">gravida aliquet vulputate faucibus tristique odio.</p>
            <form action="#" className="flex flex-col space-y-3">
                <input type="email" name="" id="" className="p-2 rounded ring-1 focus:ring-2 focus:outline-blue1/60" placeholder="Email address" />
                <button type="submit" className="p-2 bg-blue1 text-white rounded hover:bg-blue2 transition-all duration-300">Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default Newsletter