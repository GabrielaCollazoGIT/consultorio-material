import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/users/userSlice2"
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

            dispatch(setUser(response));

    } catch (error) {
        console.log(error);
    }

};
    console.log(user);
useEffect(() =>{
if(user===null){
    getUserData();
}
},[user, getUserData ]);

    let auth = localStorage.getItem('token');

        return (auth ? <Outlet/> : <Navigate to="/"/>
        )
        
}
export default ProtectedRoute;