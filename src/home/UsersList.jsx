import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"

import UserModal from "../components/UserModal"
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
            name:'Email',
            selector:row=>row.email
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
                <h1 className="text-center font-bold m-10 text-yellow-500">Users Details</h1>
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
            
            <UserModal key={userDisplay.email} userDisplay={userDisplay}/>

            </div>
         
        </HomeLayout>
    )
}
export default UsersList