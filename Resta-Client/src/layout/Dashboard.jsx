import React from 'react';
import { FaCalendar, FaCartShopping, FaHouseMedical, FaList } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import { GoCodeReview } from "react-icons/go";
import useCart from '../Hooks/useCart';
const Dashboard = () => {

    const [cart] = useCart();
    return (
        <div className='flex'>
            <div className='bg-green-500 w-64 min-h-screen'>

                <ul className="menu">

                    <li><NavLink to='/dashboard/userHome'>
                        <FaHouseMedical></FaHouseMedical> Home</NavLink></li>

                    <li><NavLink to='/dashboard/cart'>
                        <FaCartShopping></FaCartShopping> My cart ({cart.length})</NavLink></li>

                    <li><NavLink to='/dashboard/reservation'>
                        <FaCalendar></FaCalendar> Reservation</NavLink></li>

                    <li><NavLink to='/dashboard/review'>
                        <GoCodeReview /> Add a Review</NavLink></li>

                    <li><NavLink to='/dashboard/bookings'>
                        <FaList></FaList> My Bookings</NavLink></li>

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