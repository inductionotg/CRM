import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { useSelector } from "react-redux"

import axiosInstance from "../config/axiosInstance"
import HomeLayout from "../layout/HomeLayout"

function UsersList(){
    const [alluser,setAllUser] = useState([])
    const [userDisplay,setUserDisplay] = useState({
        name:'',
        email:'',
        userType:'',
        userStatus:'',
        clientName:''
    })
    const token = localStorage.getItem('token')
    console.log("helllo",token)
    async function loadusers(){
        try {
            const users = await axiosInstance.get('/users',{
                headers:{
                    'x-access-token':token
                }
            })
            setAllUser(users.data.result)
            console.log("userslist",users)
        } catch (error) {
            console.log("error",error)
        }
    }
    useEffect(()=>{
        loadusers()
    },[])
    const columns=[
        {
            name:'ID',
            selector:row=>row._id
        },
        {
            name:'Name',
            selector:row=>row.name
        },
        {
            name:'UserType',
            selector:row=>row.userType
        },
        {
            name:'UserStatus',
            selector:row=>row.userStatus
        },
        {
            name:'ClientName',
            selector:row=>row.clientName,
        },
    ]
    return (
        <HomeLayout>
            <div className='min-height-[90vh] flex flex-col  '>
                <h1 className="text-center font-bold m-10">Users Details</h1>
                {alluser &&   <DataTable
                    onRowClicked={(row)=>{
                        setUserDisplay(row)
                        document.getElementById('my_modal_1').showModal()
                    }}
                    columns={columns}
                    data={alluser}
                />
                }
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">User Details</h3>
                    <div className="py-4 m-4">
                    <p className="py-4 ">Name:{userDisplay.name}</p>
                    <p className="py-4 ">Email:{userDisplay.email}</p>
                    <p className="py-4 ">UserType:{userDisplay.userType}</p>
                    <p className="py-4 ">UserStatus:{userDisplay.userStatus}</p>
                    <p className="py-4 ">Client Name:{userDisplay.clientName}</p>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn bg-red-900">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            </div>
         
        </HomeLayout>
    )
}
export default UsersList