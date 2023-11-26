import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";



const axiosHook = axios.create({
    baseURL: 'http://localhost:5000'
})
const UseAxiosHook = () => {

    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext);
    axiosHook.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    })

    //response
    axiosHook.interceptors.request.use(function (response){
        
        return response;
    }, async (error)=>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logOut();


            navigate('/login')

        }
        return Promise.reject(error);
    })
    return axiosHook;
};

export default UseAxiosHook;