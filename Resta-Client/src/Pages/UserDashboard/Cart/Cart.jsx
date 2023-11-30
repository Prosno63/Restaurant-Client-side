import React from 'react';
import useCart from '../../../Hooks/useCart';
import { FaCross } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import UseAxiosHook from '../../../Hooks/UseAxiosHook';
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {

    const [cart, refetch] = useCart();

    const axiosHook = UseAxiosHook();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleDelete = id => {
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

                axiosHook.delete(`/carts/${id}`)
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
    return (
        <div className='p-2'>

            <h1 className="text-6xl text-center">My Cart</h1>
            <div className='flex justify-around gap-x-8 items-center mt-5'>
                <h2 className="text-4xl text-center">Item: {cart.length}</h2>
                <h2 className="text-4xl text-center"> Total Price: {totalPrice}</h2>
                {cart.length ?
                    <Link to='/dashboard/payment'><button className="btn btn-outline btn-primary"> Make Payment</button></Link> :
                    <>

                        <button disabled className="btn btn-outline btn-primary"> Make Payment</button>

                    </>
                }
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}

                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                    <br />

                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg"><MdDeleteForever /></button>
                                </th>
                            </tr>)
                        }
                        {/* row 1 */}




                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Cart;