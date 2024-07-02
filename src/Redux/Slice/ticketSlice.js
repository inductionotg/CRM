import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../config/axiosInstance"

const initialState = {
    ticket:[]
}

export const ticketThunk = createAsyncThunk('tickets/ticketThunk',async()=>{
    try {
        const ty = localStorage.getItem('token')
        console.log("rerer",ty)
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
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ticketThunk.fulfilled,(state,action)=>{
            console.log(state,action,"from builders")
            if(!action?.payload?.data) return 
            state.ticket = action?.payload?.data?.result

        })
    }
})

export default ticketSlice.reducer