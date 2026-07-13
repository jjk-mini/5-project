import { Children } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const privateRoute = ({ Children }) =>{
    const {isAuthenticated, loading } =useAuth()

    if(loading){
        return null
    }
    if (!isAuthenticated){
        return <Navigate to="login" replace />
    }

    return Children
}
export default privateRoute