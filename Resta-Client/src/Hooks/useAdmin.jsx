import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import UseAxiosHook from './UseAxiosHook';

const useAdmin = () => {
    
    const {user} = useContext(AuthContext);
    const axiosHook = UseAxiosHook();
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({

        queryKey: [user?.email, 'isAdmin'],
        queryFn: async()=>{
            const res = await axiosHook.get(`/user/admin/${user.email}`)
            return res.data?.admin;
        }

    })
    return [isAdmin, isAdminLoading]

};

export default useAdmin;