
import { GiPencil } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { TbProgress } from "react-icons/tb";
import { TbPlaceholder } from "react-icons/tb";
import { TiTickOutline } from "react-icons/ti";

import Card from '../components/Card'
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layout/HomeLayout"

function Home(){
    const ticketState = useTickets()
    console.log("cutsdom",ticketState)
    return (
        <HomeLayout>
           {ticketState.ticketDistribution && <div className="flex gap-5 justify-center items-center mt-10 flex-wrap">
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
            
}
        </HomeLayout>
        
    )
}
export default Home