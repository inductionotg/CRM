import { GiPencil } from "react-icons/gi";

import Card from '../components/Card'
import HomeLayout from "../layout/HomeLayout"
function Home(){
    return (
        <HomeLayout>
            <Card>
                <GiPencil size={28} />
            </Card>
           
        </HomeLayout>
        
    )
}
export default Home