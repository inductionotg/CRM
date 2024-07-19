import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

function AuthRoutes({allowedRoles}){
    const authRole = useSelector((state)=>state.auth.role)
    console.log(authRole,"authRolee")
    return (
        <>
            {allowedRoles.find((role)=>role===authRole)?<Outlet/>:<div>Denied</div>}
        </>
    )
}
export default AuthRoutes