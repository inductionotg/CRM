
import { useEffect } from "react";
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch,useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slice/AuthSlice";
function HomeLayout({children}){

    const authState = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onLogout(){
        dispatch(logout())
        navigate('/login')
    }
    useEffect(()=>{
        if(!authState.isLoggedIn){
            toast.error('Please Login ')
            navigate('/login')
           
        }
    },[])
    return (
        <div className="min-h-[90vh] ">
            <div className="drawer absolute left-0 right-0 cursor-pointer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" ><GiHamburgerMenu size={`38px`} className="mt-4 ml-4" /></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                        <div className="flex w-full justify-space items-center mt-10 gap-10">
                            {authState.isLoggedIn ? 
                            (
                                <>
                                    <li className="btn btn-primary" onClick={onLogout}><Link to='/logout'>Logout</Link></li>
                                    <li className="btn btn-primary"><Link to='/profile'>Profile</Link></li>
                                </>
                                
                            ):(
                                <>
                                    <li className="btn btn-primary"><Link to='/login'>Login</Link></li>
                                    <li className="btn btn-primary"><Link to='/signup'>Signup</Link></li>
                                </>
                                
                            )}
                            
                        </div>
                    </ul>
                    
                </div>
               
            </div>
            
            <div className="flex items-start justify-center">
                <div className="w-3/4 justify-center items-center">
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default HomeLayout