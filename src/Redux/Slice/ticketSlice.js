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
/* 
export const updateTicketThunk = createAsyncThunk('update/updateTicketThunk',async(ticket)=>{
    console.loh("ticket from update thunks",ticket)
    try {
        const ty = localStorage.getItem('token')
        const response =  axiosInstance.patch(`ticket/${ticket._id}`,ticket,{
            headers:{
                'x-access-token':ty
            }
        })
        toast.promise(response,{
            success:"Updated Successfully",
            pending:'Data is Loading...',
            error:'Error while fetching the data'
        })
        return await response
    } catch (error) {
        console.log(error)
    }  
}) */
    export const updateTicketThunk = createAsyncThunk(
        'update/updateTicketThunk',
        async (ticket) => {
            console.log("ticket from update thunks", ticket);
            try {
                const ty = localStorage.getItem('token');
                const response = await axiosInstance.patch(`ticket/${ticket._id}`, ticket, {
                    headers: {
                        'x-access-token': ty
                    }
                });
    
                toast.promise(response, {
                    success: "Updated Successfully",
                    pending: 'Data is Loading...',
                    error: 'Error while fetching the data'
                });
    
                return response.data;
            } catch (error) {
                console.log(error);
                throw error; // Ensure the error is propagated
            }
        }
    );
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
        .addCase(updateTicketThunk.fulfilled,(state,action)=>{
            const updatedTicket = action.payload.data.result
            state.ticket = state.ticketList.map((tickets)=>{
                if(tickets._id===updatedTicket._id) return updatedTicket
                return tickets
            })
            state.downloadedTickets = state.downloadedTickets.map((tickets)=>{
                if(tickets._id === updatedTicket._id) return updatedTicket
                return tickets
            })

            state.ticketDistribution = {
                open:0,
                inProgress:0,
                resolved:0,
                onHold:0,
                cancelled:0
            }
            state.downloadedTickets.forEach(tickets=>{
                state.ticketDistribution[tickets.status] = state.ticketDistribution[tickets.status]+1
            })
        })
    }
    
})
export const {filterTickets,resetTickets} = ticketSlice.actions
export default ticketSlice.reducer