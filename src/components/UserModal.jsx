/* eslint-disable react/prop-types */

import { useEffect,useRef,useState } from "react"

import axiosInstance from "../config/axiosInstance"

// eslint-disable-next-line react/prop-types
function UserModal({userDisplay}){
    const [users,setUsers] = useState(userDisplay)
    const dropDownref = useRef(null)

    

    async function handleModalClick(e) {
        console.log(e.target.textContent);
        dropDownref.current.open = !dropDownref.current.open;
        const token = localStorage.getItem('token');
        try {
            const response = await axiosInstance.patch(
                'user/updateUser',
                {
                    userId: users._id,
                    updates: {
                        ...users,
                        userStatus: e.target.textContent
                    }
                },
                {
                    headers: {
                        'x-access-token': token
                    }
                }
            );
            console.log(response);
        } catch (error) {
            console.log("error", error);
        }
    }
    
   

    return (
        <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">User Details</h3>
                    <div className="py-4 m-4">
                    <div className="py-4 ">Name:{users.name}</div>
                    <div className="py-4 ">Email:{users.email}</div>
                    <div className="py-4 ">UserType:{users.userType}</div>
                    <div className="py-4 ">UserStatus:
                    <details className="dropdown" ref={dropDownref} >
                        <summary className="m-1 btn">{users.userStatus}</summary>
                                <ul  onClick={handleModalClick} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-white">
                                    <li><a>approved  </a></li>
                                    <li><a>suspended</a></li>
                                    <li><a>rejected</a></li>
                                </ul>
                    </details>
                    </div>
                    <div className="py-4 ">Client Name:{userDisplay.clientName}</div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn bg-red-900">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    )
}

export default UserModal