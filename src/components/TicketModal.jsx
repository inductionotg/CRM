// eslint-disable-next-line react/prop-types
import {useEffect, useState} from "react"
import { useDispatch } from "react-redux"

import { updateTicketThunk } from "../Redux/Slice/ticketSlice"
function TicketModal({ticketDetails}){
    console.log("ticketdetaisl from ticket modal",ticketDetails)
    const [updateChange,setUpdateChange]= useState(ticketDetails)
    const dispatcher = useDispatch()

    function onHandleChange(e){
        const {name,value} = e.target
        console.log("namee",name)
        setUpdateChange({
            ...updateChange,
            [name]:value
        })
    }
    
    async function handleFormSubmit(){
        console.log("arey hey",updateChange)
      await dispatcher(updateTicketThunk(updateChange))
      const modal = document.querySelector('#my_modal_2')
      modal.close()
    }
    
    return (
        
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-white">{updateChange.title}</h3>
                <div>
                    <div >
                        <textarea
                            className="bg-white w-full text-black p-2 m-2"
                            name="description"
                            rows="5"
                            cols="10"
                            value={updateChange.description}
                            onChange={onHandleChange}
                        />
                    </div>
                    <div className="flex gap-2">
                        <h1>Priority</h1>  
                        <select name="ticketPriority" onChange={onHandleChange}>
                            <option value="1" selected={updateChange.ticketPriority===1}>1</option>
                            <option value="2" selected={updateChange.ticketPriority===2}>2</option>
                            <option value="3" selected={updateChange.ticketPriority===3}>3</option>
                            <option value="4" selected={updateChange.ticketPriority>=4}>4</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <h1>Ticket Status</h1>  
                        <select name="status" onChange={onHandleChange} >
                            <option value="open" selected={updateChange.status==="open"}>open</option>
                            <option value="onHold" selected={updateChange.status==="onHold"}>OnHold</option>
                            <option value="inProgress" selected={updateChange.status==="inProgress"}>InProgress</option>
                            <option value="resolved" selected={updateChange.status==="resolved"}>Resolved</option>
                            <option value="resolved" selected={updateChange.status==="cancelled"}>Cancelled</option>
                            
                        </select>
                    </div>
                </div>
                <div className="modal-action">
                    <button className ="bg-green-600 p-2 text-white" onClick={()=>handleFormSubmit()}>Update</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )

}

export default TicketModal