import { useNavigate } from "react-router-dom"

function Card({icon,status,borderColor='border-accent',titleText="Card",quantity=50,background="bg-primary",fontColor="text-white"}){
    const navigator = useNavigate()
    function onCardClick(){
        navigator(`/dashboard?status=${titleText}`)
    }

   
    return (
        <div onClick={onCardClick} className={`bg-primary rounded-md w-64 h-44 flex flex-col ${background} py-5 border-b-8 ${borderColor}`}>
            <div className="flex justify-center items-center gap-5">
                {icon}
                <span className="text-3xl font-bold text-black">{titleText}</span>
            </div>
            <div className="divider bg-white h-0.5 w-3/4 mx-auto"></div>
            <div className="flex justify-center items-center gap-4">
                <div className={`text-7xl  ${fontColor}` }>
                    {quantity}
                </div>
                <div className={`radial-progress ${fontColor}`} style={{ "--value": status*100 ,"--size":'4rem'}} role="progressbar">
                    {status*100}%
                </div>
            </div>

        </div>
    )
}
export default Card