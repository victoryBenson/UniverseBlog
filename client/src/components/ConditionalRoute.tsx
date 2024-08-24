import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { PropsWithChildren } from 'react'

export const ConditionRoute = ({children}: PropsWithChildren) => {
    const location = useLocation()
    const [display, setDisplay] = useState<boolean>(false)

    useEffect(() => {    
      if (location.pathname.includes("/login") || location.pathname.includes("/register") || location.pathname.includes("/resetPassword") || location.pathname.includes("*")) {
        setDisplay(false)
      }else{
        setDisplay(true)
      }
    }, [location])
    
  return (
    // display
    <div>{display && children}</div>
  )
}