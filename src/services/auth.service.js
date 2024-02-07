import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const register = async (userName, email, password) => {
    return axios.post(API_URL + "signup", {
        userName, 
        email,
        password  
    });
};

const login  = async  (email, password) => {
const request = await axios.post(API_URL + "login", {
        email,
        password
    });
    const response = await request.data;
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    
};
export default {
    register, login
};