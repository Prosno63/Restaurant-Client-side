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

        <li><Link>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order'>Orders</Link></li>




        {
            user ? <>


                <li><Link onClick={handleLogOut}>Log Out</Link></li>
                <li><Link to='/dashboard/cart'>
                    <button className="btn">
                        <FaCartShopping></FaCartShopping>
                        <div className="badge badge-secondary"> + {cart.length}</div>
                    </button>
                </Link></li>
                {
                    isAdmin ? <>

                        <li><Link to='/dashboard'>Manage Site</Link></li>
                    </>
                        :
                        <></>
                }


            </>

                :

                <> <li><Link to='/login'>Log in</Link></li> </>
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