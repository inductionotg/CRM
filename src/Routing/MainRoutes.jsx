import { Route, Routes } from "react-router-dom";

import Home from "../home/Home";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";

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