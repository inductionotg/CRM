import { Route, Routes } from "react-router-dom";

import Home from "../home/Home";
import UsersList from "../home/UsersList";
import Dashboard from "../layout/Dashboard";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import AuthRoutes from "./AuthRoutes";

function MainRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route element={<AuthRoutes allowedRoles={["admin"]}/>}>
                <Route path="/users" element={<UsersList/>}/>
            </Route>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}
export default MainRoutes