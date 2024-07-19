import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

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
        const response =  axiosInstance.post("auth/signin",data)
        toast.promise(response,{
            loading: 'Submiting the form',
            success: 'Logged in Successfully',
            error: 'Error while Submitting the form, Please Try Again',
        })
        return await response
    } catch (error) {
        console.log(error)
    }

})

export const signUp = createAsyncThunk('auth/signup',async(data)=>{
    try {
        const response =  axiosInstance.post("auth/signup",data)
        toast.promise(response,{
            loading: 'Submiting the form',
            success: 'Form Submitted',
            error: 'Error while Submitting the form, Please Try Again',
        })
        return await response
    } catch (error) {
        console.log(error)
    }
})
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            localStorage.clear()
            state.isLoggedIn = false;
            state.token =''
            state.role = ''
            state.data = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
    
            if(!action.payload) return 
            state.isLoggedIn = (action.payload?.data?.token!=undefined)
            state.data = action.payload?.data?.userData
            state.token = action.payload?.data?.token
            state.role = action.payload?.data?.userData?.userType
            localStorage.setItem("role",action.payload?.data?.userData?.userType)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("data",JSON.stringify(action.payload?.data?.userData))
            localStorage.setItem("token",action.payload?.data?.token)
        })
    }
})
export const {logout} = authSlice.actions
export default authSlice.reducer