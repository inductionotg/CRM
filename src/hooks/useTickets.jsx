import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { filterTickets,resetTickets,ticketThunk } from "../Redux/Slice/ticketSlice"

function useTickets(){
    const authState = useSelector(state=>state.auth)
    const ticketState = useSelector((state)=>state.ticket)
    

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()

    async function loadTickets(){
        try {
        if(ticketState.downloadedTickets.length===0)
            {
            const response = await dispatch(ticketThunk(ticketState))
            
            }
        if(searchParams.get("status")){
            dispatch(filterTickets({status:searchParams.get("status")}))
        }
        else{
            dispatch(resetTickets())
        }
        
        } catch (error) {
            console.log(error)
        }   
    }
   
   
    useEffect(()=>{
            loadTickets() 
    },[authState.token,searchParams.get("status")])
    

    return ticketState

}
export default useTickets