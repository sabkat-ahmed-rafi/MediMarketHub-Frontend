import React from 'react';
import { AiFillMedicineBox } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import useAuth from '../Hooks/useAuth';

const NavBar = () => {

  const {user, logout} = useAuth()
  console.log(user)

  const handleLogout = () => {
    logout();
  }

    const li = <>
    <NavLink to={'/'}>Home</NavLink>
    <NavLink to={'/shop'}>Shop</NavLink>
    <NavLink to={'/cart'} className={'flex items-center space-x-2'}> <span>Cart</span> <FaCartPlus className='animate-bounce text-green-600' />
</NavLink>
    <NavLink to={'/join'}>Join us</NavLink>
    </>

    return (
        <>
            <section className='pb-[50px]'>
                <div className="navbar bg-base-100 mx-auto border-b-green-600  shadow-lg shadow-green-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-x-4 font-bold space-y-2">
        {li}
      </ul>
    </div>
    <Link to={'/'} className="btn btn-ghost font-bold text-2xl "><AiFillMedicineBox className='text-green-600 text-4xl' />
 MediMarketHub</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-9 font-semibold text-base">
      {li}
    </ul>
  </div>
 {
    user ?  <div className="dropdown dropdown-end md:pl-[400px] pl-[190px] lg:pl-[450px] ">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-14 rounded-full ">
        <img alt="Tailwind CSS Navbar component" src={user? user?.photoURL : "invalidPhoto.jpg"} />
      </div>
    </div>
    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li className='font-semibold'>
        <Link to={'/profile'} className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li className='font-semibold'><Link to={'/dashboard'}>Dashboard</Link></li>
      <li onClick={handleLogout} className='font-semibold'><a>Logout</a></li>
    </ul>
  </div> :   <div className="navbar-end space-x-5">
    <Link to={'/login'} className="btn text-white font-bold bg-gradient-to-br from-green-500 to-emerald-600">Log in </Link>
    <Link to={'/signUp'} className="btn text-white font-bold bg-gradient-to-br from-green-500 to-emerald-600">Sign up</Link>
  </div>
 }
</div>
            </section>
        </>
    );
};

export default NavBar;