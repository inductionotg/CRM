import { useEffect,useState } from "react"

import useTickets from "./useTickets"
function useTicketData(){
    const [ticketStatus,setTicketStatus] = useState({
        openTickets:[],
        inProgressTicket:[],
        openTicketsByMonth:[],
        closeTicketsByMonth:[]
    })
    const ticketState = useTickets()
    
    const openTicketsByMonth ={"January":0,"February":0,"March":0,"April":0,"May":0,"June":0,"July":0,"August":0,"September":0,
        "October":0,"November":0,"December":0}
    const closeTicketsByMonth ={"January":0,"February":0,"March":0,"April":0,"May":0,"June":0,"July":0,"August":0,"September":0,
        "October":0,"November":0,"December":0}
    const pieCharData = {
        labels:Object.keys(ticketState.ticketDistribution),
        fontColor:"white",
        datasets:[
            {
                data:Object.values(ticketState.ticketDistribution),
                backgroundColor:["yellow","red","green","blue","white"],
                borderColor:["yellow","red","green","blue","white"]
            }
        ]
    }
    const lineData = {
        labels:Object.keys(ticketStatus.openTickets),
        fontColor:"white",
        datasets:[
            {
                label:'Open Ticket Data',
                data:Object.values(ticketStatus.openTickets),
                backgroundColor:"green",
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
               
            },
            {
                label:'Inprogress Ticket Data',
                data:Object.values(ticketStatus.inProgressTicket),
                backgroundColor:"green",
                fill: false,
                borderColor: 'rgb(75, 70, 192)',
                tension: 0.1
               
            }
        ]
    }
    const Bardata = {
        labels:["January","February","March","April","May","June","July","August","September",
            "October","November","December"],
        backgroundColor:'red',
        datasets: [{
          label: 'Open TicketsByMonth',
          data: Object.values(ticketStatus.openTicketsByMonth),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        },
        {
            label: 'Close Tickets ByMonth',
            data: Object.values(ticketStatus.closeTicketsByMonth),
            backgroundColor:'Yellow',
            borderColor:'rgb(255, 159, 64)',
          },
    ]
      };
    
    function processTickets(){ 
        //fetch the current date
        const currentDate = new Date();
        console.log("current date",currentDate)
        //calculate the 10th day date from today
        const tenthDayFromToday = new Date()
        console.log("10thcurrent date",tenthDayFromToday)
        tenthDayFromToday.setDate(currentDate.getDate()-10)
        if(ticketState.ticket.length>0){
            //prepare two localobjects to asct as frequency map
            let openTicketData = {}
            let inProgressTicketsData = {}
            //Initialise the frequency map with default value 0 for the last 10days
            for(let i=0;i<10;i++){
                //get the ith day from today
                const dateObject = new Date()
                dateObject.setDate(currentDate.getDate()-i);
                console.log("sdsds",dateObject)
                /**
                 * dateObject.toLocaleDateString()->gives us string in the format DD/MM/YYYY
                *CONVERT this to YYYY-MM-DD                
                */

                openTicketData[dateObject.toLocaleDateString().split("/").reverse().join("-")]=0
                inProgressTicketsData[dateObject.toLocaleDateString().split("/").reverse().join("-")]=0
                console.log(openTicketData,inProgressTicketsData)
            }
            console.log(openTicketData,inProgressTicketsData)
            ticketState.ticket.forEach(ticket=>{
                //gET the date part from tickets by removing everything post the character T
                const date = ticket.createdAt.split("T")[0]
                console.log("data",date)
                const ticketDate = new Date(date)
                //check if the ticket is open and lies in the last 10days
                if(ticket.status==="open" && ticketDate>=tenthDayFromToday){
                    openTicketData[date] = openTicketData[date]+1
                }
                if(ticket.status==="inProgress" && ticketDate>=tenthDayFromToday){
                    openTicketData[date] = openTicketData[date]+1
                }
                const datemon = new Date(ticketDate);
                const month = datemon.toLocaleString('default', { month: 'long' });
                console.log(month,"ritesh")
                if(ticket.status==='open'){
                    openTicketsByMonth[month] =openTicketsByMonth[month] +1
                }
                if(ticket.status==='resolved'){
                    closeTicketsByMonth[month] =  closeTicketsByMonth[month] +1
                }
            })
            console.log("opennn",openTicketData)
            setTicketStatus({
                openTickets:openTicketData,
                inProgressTicket:inProgressTicketsData,
                closeTicketsByMonth:closeTicketsByMonth,
                openTicketsByMonth:openTicketsByMonth
            })
            console.log("closeTicketsByMonth",closeTicketsByMonth)
            
        }
       
    }
    useEffect(()=>{
        console.log("ritesh",ticketState)
       processTickets()
    },[ticketState.ticket.length])

    return [pieCharData,lineData, Bardata]

}
export default useTicketData