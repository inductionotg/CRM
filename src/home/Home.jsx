import { useEffect } from "react";
import { GiPencil } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

import Card from '../components/Card'
import HomeLayout from "../layout/HomeLayout"
import { ticketThunk } from "../Redux/Slice/ticketSlice";
function Home(){
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
        loadTickets()
    },[authState.token])
    return (
        <HomeLayout>
            <div className="flex gap-5 justify-center items-center mt-10">
                <Card>
                    <GiPencil size={28} />
                </Card>
                <Card>
                    <GiPencil size={28} />
                </Card>
                <Card>
                    <GiPencil size={28} />
                </Card>
            </div>
            
           
        </HomeLayout>
        
    )
}
export default Home