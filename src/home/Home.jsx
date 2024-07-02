import { useEffect } from "react";
import { GiPencil } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { TbProgress } from "react-icons/tb";
import { TbPlaceholder } from "react-icons/tb";
import { TiTickOutline } from "react-icons/ti";
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
            <div className="flex gap-5 justify-center items-center mt-10 flex-wrap">
                <Card
                    titleText="Open"
                    quantity={ticketState.ticketDistribution.open}
                    status={ticketState.ticketDistribution.open/ticketState.ticket.length}
                    background="bg-orange-600"
                    icon={ <GiPencil size={28} />}
                />
                <Card
                    titleText="In Progress"
                    quantity={ticketState.ticketDistribution.inProgress}
                    status={ticketState.ticketDistribution.inProgress/ticketState.ticket.length}
                    background="bg-purple-600"
                    icon={ <TbProgress size={28} />}
                />
                <Card
                    titleText="Resolved"
                    quantity={ticketState.ticketDistribution.resolved}
                    status={ticketState.ticketDistribution.resolved/ticketState.ticket.length}
                    background="bg-green-500"
                    icon={ <TiTickOutline size={28} />}
                />
                <Card
                    titleText="On Hold"
                    quantity={ticketState.ticketDistribution.onHold}
                    status={ticketState.ticketDistribution.onHold/ticketState.ticket.length}
                    background="bg-yellow-600"
                    icon={ <TbPlaceholder size={28} />}
                />
                <Card
                    titleText="Cancelled"
                    quantity={ticketState.ticketDistribution.cancelled}
                    status={ticketState.ticketDistribution.cancelled/ticketState.ticket.length}
                    background="bg-red-600"
                    icon={ <ImCross size={28} />}
                />
                   
                
    
            </div>
            
           
        </HomeLayout>
        
    )
}
export default Home