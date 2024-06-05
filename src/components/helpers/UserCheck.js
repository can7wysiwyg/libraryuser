import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUser } from "../redux/actions/authAction"

export function UserCheck() {



const dispatch = useDispatch()
const user = useSelector((state) => state.authRdcr.user)


useEffect(() => {

const fetchData = async() => {
    try {
        await dispatch(getUser())
        

      
        
        
        
    } catch (error) {
        console.error(error)
    }
      


}   


fetchData()



}, [dispatch])





const AuthInfo = () => {

    if(user?.role === 1) {

        return (<>
         <a className="nav-link" href="/user_panel">MY PANEL</a>
        
        </>)

    } else {
        return ""
    }


} 

return(<>
{ AuthInfo() }

</>)

    
}