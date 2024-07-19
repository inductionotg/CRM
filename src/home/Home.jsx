
import { BarElement, CategoryScale, LinearScale } from "chart.js";
import Chart from "chart.js/auto";
import { Bar, Line,Pie } from "react-chartjs-2";
import { GiPencil } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { TbProgress } from "react-icons/tb";
import { TbPlaceholder } from "react-icons/tb";
import { TiTickOutline } from "react-icons/ti";

import Card from '../components/Card'
import useTicketData from "../hooks/useTicketData";
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layout/HomeLayout"
Chart.register(CategoryScale,LinearScale,BarElement);
function Home(){
    const ticketState = useTickets()
    const [pieCharData,lineData, Bardata] = useTicketData()
    return (
        <HomeLayout>
          
           {ticketState.ticketDistribution && 
             <>
            <div className="flex gap-5 justify-center items-center mt-10 flex-wrap">
                <Card
                    titleText="Open"
                    quantity={ticketState.ticketDistribution.open}
                    status={ticketState.ticketDistribution.open/ticketState.downloadedTickets.length}
                    background="bg-orange-600"
                    icon={ <GiPencil size={28} />}
                />
                <Card
                    titleText="In Progress"
                    quantity={ticketState.ticketDistribution.inProgress}
                    status={ticketState.ticketDistribution.inProgress/ticketState.downloadedTickets.length}
                    background="bg-purple-600"
                    icon={ <TbProgress size={28} />}
                />
                <Card
                    titleText="Resolved"
                    quantity={ticketState.ticketDistribution.resolved}
                    status={ticketState.ticketDistribution.resolved/ticketState.downloadedTickets.length}
                    background="bg-green-500"
                    icon={ <TiTickOutline size={28} />}
                />
                <Card
                    titleText="On Hold"
                    quantity={ticketState.ticketDistribution.onHold}
                    status={ticketState.ticketDistribution.onHold/ticketState.downloadedTickets.length}
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
            <div className="flex justify-center items-center flex-col mt-10">
                <div className="mt-10 ">
                    <div className="w-96 h-96">
                        <Pie data={pieCharData} />
                    </div>
                </div>
                <div className="mt-10 ">
                    <div className="w-[50rem]   bg-white">
                        <Line  data={lineData} />
                    </div>
                </div>
                <div className="mt-10 ">
                    <div className="w-[50rem]  bg-red-500 ">
                        <Bar  data={Bardata} />
                    </div>
                </div>
            </div>
            
            </>
            
}
        </HomeLayout>
        
    )
}
export default Home