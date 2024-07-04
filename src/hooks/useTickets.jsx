import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ticketThunk } from "../Redux/Slice/ticketSlice"

function useTickets(){
    const authState = useSelector(state=>state.auth)
    console.log(authState.token)
    const ticketState = useSelector((state)=>state.ticket)
    console.log(ticketState)

    const dispatch = useDispatch()

    async function loadTickets(){
        try {
         const response = await dispatch(ticketThunk(ticketState))
         console.log(response)
        } catch (error) {
            console.log(error)
        }   
    }
   
   
    useEffect(()=>{
        if(ticketState.ticket.length===0){
            loadTickets()
        }
        
    },[authState.token])
    console.log("dfdfdfdf",ticketState)

    return ticketState

}
export default useTickets