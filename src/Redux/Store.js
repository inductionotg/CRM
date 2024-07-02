import {configureStore} from '@reduxjs/toolkit'

import authSliceReducer from '../Redux/Slice/AuthSlice'
import ticketSlice from './Slice/ticketSlice'
const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        ticket:ticketSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
    devTools:true
})
export default store