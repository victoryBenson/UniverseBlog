import { PropsWithChildren } from "react"

const Wrapper = (props: PropsWithChildren) => {
  return (
    <div className=" mx-5 md:mx-8 lg:mx-20 my-2 transition-all">
      {props.children}
    </div>
  )
}

export default Wrapper