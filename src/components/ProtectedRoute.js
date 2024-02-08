import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice2";
import axios from "axios";


const ProtectedRoute = () =>{

    const dispatch = useDispatch();

    const user = useSelector(state => state.user)
    // data del login
    const getUserData = async () => {

    try {
        const response = await axios.post(
            '/api/users/info',{token: localStorage.getItem("token")},
            {
                headers: {
                    Autorizathion: "Bearer " + localStorage.getItem("token",)
                },
            });

            console.log(response);

            dispatch(setUser(response.data));

    } catch (error) {
        console.log(error);
    }

};
    
    let auth = localStorage.getItem('token');

        return (auth ? <Outlet/> : <Navigate to="/"/>
        )
        
}
export default ProtectedRoute;