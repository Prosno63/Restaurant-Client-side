import React from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaCartShopping } from "react-icons/fa6";
import useCart from '../../Hooks/useCart';
import useAdmin from '../../Hooks/useAdmin';


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const [cart] = useCart();

    const [isAdmin] = useAdmin();


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navLinks = <>

        <li className='mr-1'><NavLink to='/'>Home</NavLink></li>
        <li className='mr-1'><NavLink to='/menu'>Our Menu</NavLink></li>
        <li className='mr-1'><NavLink to='/order'>Orders</NavLink></li>




        {
            user ? <>


                <li className='mr-1'><Link onClick={handleLogOut}>Log Out</Link></li>
                {
                    !isAdmin ? <>

                        <li><NavLink to='/dashboard/cart'>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart.length}</span>
                            </div>
                        </NavLink></li>
                    </> : <></>
                }
                {
                    isAdmin ? <>

                        <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
                    </>
                        :
                        <></>
                }


            </>

                :

                <> <li><NavLink to='/login'>Log in</NavLink></li> </>
        }










    </>
    return (
        <div className="navbar fixed z-20 bg-opacity-30 bg-red-600 max-w-screen-xl mx-auto text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl text-yellow-600 uppercase">Khanna</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <p className="text-sm lg:text-3xl">
                    {user?.displayName && `Hi, ${user.displayName}`}
                </p>
            </div>
        </div>
    );
};

export default Navbar;