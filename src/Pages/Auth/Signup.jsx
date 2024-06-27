import {  useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { signUp } from "../../Redux/Slice/AuthSlice"

function Signup(){
    const [loading,setLoading] = useState(false)
    const [signupDetails,setSignUpDetails] = useState({
        email:"",
        password:"",
        name:"",
        userType:"",
        userStatus:"",
        clientName:""
    })

    const dropDownref = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    function handleInputChange(e){
        const {name,value} = e.target
        setSignUpDetails((signUpDetails)=>({
            ...signUpDetails,
            [name]:value
        }))
    }
    function resetSignUpPage(){
        setSignUpDetails({
                email:"",
                password:"",
                name:"",
                userType:"",
                userStatus:"",
                clientName:""
            
        })
    }
 
    function handleUserType(e){
        const userTypeSelected = e.target.textContent
        setSignUpDetails({
            ...signupDetails,
            userType:userTypeSelected,
            userStatus:(userTypeSelected==='customer')?"approved":"suspended"
        })
        dropDownref.current.open = !dropDownref.current.open
    }

    async function handleSubmit(){
        
        if(!signupDetails.email || !signupDetails.name || !signupDetails.password ||!signupDetails.clientName ||!signupDetails.userType || !signupDetails.userStatus ) return 
        try {
            setLoading(true)
            const response =await dispatch(signUp(signupDetails))
            console.log(response)
            if(response.payload) {navigate('/login')}
            else {
                resetSignUpPage()
        }
           
        } catch (error) {
            console.log(error)
        }
        finally{
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
                                <input type="text" className="grow" placeholder="Email" name="email" value={signupDetails.email} onChange={handleInputChange} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2  text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input type="text" className="grow" placeholder="Username" name="name" value={signupDetails.name} onChange={handleInputChange} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2  text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow" name="password" value={signupDetails.password} onChange={handleInputChange}/>
                            </label>

                            <div className="flex justify-between items-center gap-2 w-full">
                                    <details className="dropdown" ref={dropDownref} >
                                        <summary className="m-1 btn">{!signupDetails.userType?'UserType':signupDetails.userType}</summary>
                                            <ul  onClick={handleUserType} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-white">
                                                <li><a>customer</a></li>
                                                <li><a>engineer</a></li>
                                                <li><a>admin</a></li>
                                            </ul>
                                    </details>
                            </div>
                            <label className="input input-bordered flex items-center gap-2  text-white">
                                <input type="text" className="grow" placeholder="Client Name..." name="clientName" value={signupDetails.clientName} onChange={handleInputChange} />
                            </label>
                        <div className="card-actions justify-end">
                            <button className="btn btn-accent w-full" onClick={handleSubmit}>{loading?<span className="loading loading-dots loading-md"></span>:'SignUp'}</button>
                        </div>
                        <p>
                            Already Have an Account? <Link to='/login'>Login Instead</Link>
                        </p>
                    </div>
                </div>
        </div>
    )
}
export default Signup