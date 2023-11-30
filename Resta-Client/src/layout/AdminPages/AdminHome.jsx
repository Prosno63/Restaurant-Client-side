import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const AdminHome = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>

            <h1 className="text-3xl">Welcome {user.displayName}</h1>
            
        </div>
    );
};

export default AdminHome;