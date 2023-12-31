import React from 'react';
import { FaCalendar, FaCartShopping, FaHouseMedical, FaList, FaSpoon, FaUser } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import { GoCodeReview } from "react-icons/go";
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';
const Dashboard = () => {

    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            <div className='bg-green-500 w-64 min-h-screen'>

                <ul className="menu">

                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/adminHome'>
                                <FaHouseMedical></FaHouseMedical>Admin Home</NavLink></li>

                            <li><NavLink to='/dashboard/users'>
                                <FaUser></FaUser> Manage Users</NavLink></li>

                            <li><NavLink to='/dashboard/addItems'>
                                <FaSpoon></FaSpoon> Add Items</NavLink></li>
                            <li><NavLink to='/dashboard/manageItems'>
                                <FaSpoon></FaSpoon>Manage Item</NavLink></li>

                            <li><NavLink to='/dashboard/bookings'>
                                <FaList></FaList> Handle Bookings</NavLink></li></>
                            :


                            <>
                                <li><NavLink to='/dashboard/userHome'>
                                    <FaHouseMedical></FaHouseMedical>Home</NavLink></li>

                                <li><NavLink to='/dashboard/cart'>
                                    <FaCartShopping></FaCartShopping> My cart ({cart.length})</NavLink></li>

                                <li><NavLink to='/dashboard/reservation'>
                                    <FaCalendar></FaCalendar>Reservation</NavLink></li>

                                <li><NavLink to='/dashboard/review'>
                                    <GoCodeReview /> Add a Review</NavLink></li>

                                <li><NavLink to='/dashboard/paymentHistory'>
                                    <FaList></FaList>Payment History</NavLink></li>
                            </>
                    }

                </ul>
                <div className='divider'></div>

                <ul className='menu'>
                    <li><NavLink to='/'>
                        <FaHouseMedical></FaHouseMedical> Web Home</NavLink></li>
                    <li><NavLink to='/menu'>
                        <FaHouseMedical></FaHouseMedical> Menu </NavLink></li>
                    <li><NavLink to='/order'>
                        <FaHouseMedical></FaHouseMedical> Orders</NavLink></li>
                </ul>


            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;