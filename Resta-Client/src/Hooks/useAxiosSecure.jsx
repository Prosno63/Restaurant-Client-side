import axios from "axios";

export const axiosSecure = axios.create({
    baseURl: 'http://localhost:5000'
});

const useAxiosSecure = () => {
   return axiosSecure;
};

export default useAxiosSecure;