
import { FaFileDownload } from "react-icons/fa";
import { usePDF } from 'react-to-pdf';

import useTickets from "../hooks/useTickets"
import HomeLayout from "./HomeLayout"


function Dashboard(){
  
    const ticketState = useTickets()
    console.log("dashbaord",ticketState)
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
    
    return (
        <>
            <HomeLayout>
                <div className='min-h-[90vh] flex justify-center flex-col items-center w-full'>
                    <div className="bg-yellow-500 py-4 text-3xl w-full text-center font-bold text-black  ">
                    Ticket Records <FaFileDownload onClick={() => toPDF()}  className="inline"/>
                    </div>
                    <div className="flex flex-col w-full" ref={targetRef}>
                        <div className="flex justify-between items-center gap-3 bg-purple-600 px-2 py-2 grid-cols-7">
                            <div className="table-title basis-[8%]">
                                Ticket Id
                            </div>
                            <div className="table-title basis-[12%]">
                                Title
                            </div>
                            <div className="table-title basis-[20%]">
                                Description
                            </div>
                            <div className="table-title basis-[20%]">
                                Reported
                            </div>
                            <div className="table-title basis-[5%]">
                                Priority
                            </div>
                            <div className="table-title basis-[22%]">
                                Assignee
                            </div>
                            <div className="table-title basis-[13%] ">
                               Status
                            </div>
                        </div>
                        {
                            ticketState && ticketState.ticket.map((tickets)=>{
                                return (
                                    <div  key ={tickets._id}className="flex justify-between items-center gap-3 bg-white text-black px-2 mt-4  py-2 grid-cols-1">
                                        <div className="table-title basis-[8%]">
                                            {tickets._id.substring(0,8)+'..'}
                                        </div>
                                        <div className="table-title basis-[12%]">
                                            {tickets.title}
                                        </div>
                                        <div className="table-title basis-[20%]">
                                            {tickets.description}
                                        </div>
                                        <div className="table-title basis-[20%]">
                                            {tickets.assignee}
                                        </div>
                                        <div className="table-title basis-[5%]">
                                            {tickets.ticketPriority}
                                        </div>
                                        <div className="table-title basis-[22%]">
                                            {tickets.assignedTo}
                                        </div>
                                        <div className="table-title basis-[13%]">
                                            {tickets.status}
                                        </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </HomeLayout>
        </>
    )

}
export default Dashboard