import { PropsWithChildren } from "react"

const Wrapper = (props: PropsWithChildren) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Wrapper