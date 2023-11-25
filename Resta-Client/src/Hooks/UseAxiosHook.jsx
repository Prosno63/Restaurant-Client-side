import axios from "axios";



const axiosHook = axios.create({
    baseURL: 'http://localhost:5000'
})
const UseAxiosHook = () => {
    return axiosHook;
};

export default UseAxiosHook;