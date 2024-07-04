import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { filterTickets,resetTickets,ticketThunk } from "../Redux/Slice/ticketSlice"

function useTickets(){
    const authState = useSelector(state=>state.auth)
    console.log(authState.token)
    const ticketState = useSelector((state)=>state.ticket)
    console.log(ticketState)

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()

    async function loadTickets(){
        try {
        if(ticketState.downloadedTickets.length===0)
            {
            const response = await dispatch(ticketThunk(ticketState))
            console.log(response)
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
    console.log("dfdfdfdf",ticketState)

    return ticketState

}
export default useTickets