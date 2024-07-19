import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../config/axiosInstance"

const initialState = {
    downloadedTickets:[],
    ticket:[],
    ticketDistribution:{
        open:0,
        inProgress:0,
        resolved:0, 
        onHold:0,
        cancelled:0
    }
}

export const ticketThunk = createAsyncThunk('tickets/ticketThunk',async()=>{
    try {
        const ty = localStorage.getItem('token')
        const response =  axiosInstance.get('getMyAssignedTickets',{
            headers:{
                'x-access-token':ty
            }
        })
        toast.promise(response,{
            success:"Data loaded successfully",
            pending:'Data is Loading...',
            error:'Error while fetching the data'
        })
        return await response
    } catch (error) {
        console.log(error)
    }
    
    
}) 
const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers:{
        filterTickets:(state,actions)=>{
            let  status = actions.payload.status.toLowerCase()
            if(status === "in progress"){
                status ='inProgress'
            }
            if(status === "on hold"){
            
                status ='onHold'
            }
            
            console.log("hell",status)
            state.ticket = state.downloadedTickets.filter((ticketrs)=>ticketrs.status===status)

        },
        resetTickets:(state,actions)=>{
            state.ticket = state.downloadedTickets
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(ticketThunk.fulfilled,(state,action)=>{
            
            if(!action?.payload?.data) return 
            state.ticket = action?.payload?.data?.result
            state.downloadedTickets = action?.payload?.data?.result
            const ticketData = action?.payload?.data?.result
            state.ticketDistribution={
                open:0,
                inProgress:0,
                resolved:0, 
                onHold:0,
                cancelled:0
            }
            ticketData.forEach(ticket => {
                
                state.ticketDistribution[ticket.status] =  state.ticketDistribution[ticket.status]+1
                
            });
            

        })
    }
})
export const {filterTickets,resetTickets} = ticketSlice.actions
export default ticketSlice.reducer