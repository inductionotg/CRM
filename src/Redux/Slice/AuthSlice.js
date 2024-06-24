import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    role:localStorage.getItem("role")||"",
    data:JSON.parse(localStorage.getItem("data"))|| {},
    token:localStorage.getItem("token") || "",
    isLoggedIn:localStorage.getItem("isLoggedIn") ||false
}
export const login = createAsyncThunk('auth/signin',async(data)=>{
    console.log("dsdsde3433",data)
    console.log("Dsdse3w232",axiosInstance)
    try {
        const response = await axiosInstance.post("auth/signin",data)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }

})
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            console.log("fdfdf",state,action.payload)
            if(!action.payload) return 
            state.isLoggedIn = (action.payload?.data?.token!=undefined)
            state.data = action.payload?.data?.userData
            state.token = action.payload?.data?.token
            state.role = action.payload?.data?.userData?.userType
            localStorage.setItem("role",action.payload?.data?.userData?.userType)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("data",JSON.stringify(action.payload?.data?.userData))
            localStorage.setItem("token",action.payload?.data?.token!=undefined)
        })
    }
})

export default authSlice.reducer