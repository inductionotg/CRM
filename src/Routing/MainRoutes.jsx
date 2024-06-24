import { Route, Routes } from "react-router-dom";

import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Home from "../home/Home";

function MainRoutes(){
    return (
        <Routes>
             <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}
export default MainRoutes