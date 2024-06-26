import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom"

import {login} from "../../Redux/Slice/AuthSlice"

function Login(){
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [loginDetails,setLoginDetails] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    function handleInputChange(e){
        const name = e.target.name
        const value = e.target.value
        setLoginDetails((loginDeatils)=>({
            ...loginDeatils,
            [name]:value
        }))
    }

    function resetLoginState(){
        setLoginDetails({
            email:"",
            password:""
        })
    }

    async function handleOnSubmit(){
        setLoading(true)
        try {
            console.log(loginDetails.email,loginDetails.password)
            if(!loginDetails.email||!loginDetails.password){
                return 
                }
            const response = await dispatch(login(loginDetails))
            console.log("dsdsd",response)
            if(response.payload){
                navigate('/')
            }
            else {
                resetLoginState()
            }
        } catch (error) {
            console.log(error)
            
        }finally{
            setLoading(false)
        }
        
        


    }
    return(
        <div className="flex justify-center h-[90vh] items-center">
                <div className="card w-96 bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Login</h2>
                            <label className="input input-bordered flex items-center gap-2 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="text" value={loginDetails.email} className="grow" placeholder="Email" onChange={handleInputChange} name="email" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2  text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" value={loginDetails.password}  className="grow" onChange={handleInputChange} name="password" />
                            </label>
                        <div className="card-actions justify-end">
                            <button className="btn btn-accent w-full" onClick={handleOnSubmit}>{loading?<span className="loading loading-dots loading-md"></span>:'Login'}</button>
                        </div>
                        <p>
                            Dont Have An Account? <Link to='/signup'>Create Instead</Link>
                        </p>
                    </div>
                </div>
        </div>
    )
}
export default Login