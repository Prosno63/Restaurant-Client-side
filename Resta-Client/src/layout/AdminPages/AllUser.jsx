import React from 'react';
import UseAxiosHook from '../../Hooks/UseAxiosHook';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import { FaUser } from 'react-icons/fa6';

const AllUser = () => {


    const axiosHook = UseAxiosHook();

    const { data: users = [], refetch } = useQuery({

        queryKey: ['users'],
        queryFn: async () => {

            const res = await axiosHook.get('/users')
            return res.data;

        }

    })

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosHook.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
            }
        });

    }

    const handleAddAdmin = user=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Admin"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosHook.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: `${user.name} is an Admin Now`,
                                icon: "success"
                            });

                        }
                    })
            }
        });
    }


    return (
        <div>

            <div className='flex justify-evenly'>
                <h2 className="3xl">All Users</h2>
                <h2 className="3xl">Total user: {users.length}</h2>
            </div>


            <div className="overflow-x-auto m-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                   { user.role === 'admin'? 'Admin' : <button onClick={() => handleAddAdmin(user)} className="btn btn-ghost btn-lg"><FaUser></FaUser></button>
}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg"><MdDeleteForever /></button>

                                </td>

                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUser;