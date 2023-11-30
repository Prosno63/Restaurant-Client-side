import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const UserHome = () => {

    const {user} = useContext(AuthContext);
    return (
        <div>

            <h1 className="text-3xl">Welcome Back,{user.displayName} </h1>
            
        </div>
    );
};

export default UserHome;