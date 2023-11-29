import React from 'react';
import SectionHeader from '../../components/SectionHeading.jsx/SectionHeader';
import useMenu from '../../Hooks/useMenu';
import { FaTrash } from 'react-icons/fa6';
import { CiEdit } from "react-icons/ci";
import Swal from 'sweetalert2';
import UseAxiosHook from '../../Hooks/UseAxiosHook';
import { Link } from 'react-router-dom';




const ItemHandler = () => {

    const [menu, refetch] = useMenu();
    const axiosHook = UseAxiosHook();



    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosHook.delete(`/menu/${item._id}`);
                console.log(response.data)
                if (response.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });




    }
    return (
        <div>

            <SectionHeader heading="Manage Item" subHeading="Any Update?"></SectionHeader>
            <div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>

                                        <span className="badge badge-ghost badge-sm">{item.name}</span>
                                    </td>
                                    <td>{item.price}</td>
                                    <th>

                                        <Link to = {`/dashboard/update/${item._id}`} >  <button className="btn btn-md text-blue-600"> <CiEdit /> </button>
                                        </Link>

                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-md text-red-600"><FaTrash></FaTrash></button>
                                    </th>
                                </tr>)
                            }


                        </tbody>


                    </table>
                </div>


            </div>

        </div>
    );
};

export default ItemHandler;