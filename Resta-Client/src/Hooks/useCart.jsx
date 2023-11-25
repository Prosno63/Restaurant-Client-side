import { useQuery } from "@tanstack/react-query";
import UseAxiosHook from "./UseAxiosHook";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";

const useCart = () => {

  const axiosHook = UseAxiosHook();
  const {user} = useContext(AuthContext);

  const {refetch,data: cart =[] } = useQuery({

    queryKey: ['cart', user?.email],
    queryFn: async()=>{
      const res = await axiosHook.get(`/carts?email=${user.email}`);
      return res.data;
    }

  })
    

  
    
    return [cart, refetch]
};

export default useCart;