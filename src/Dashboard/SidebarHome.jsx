import React from 'react';
import useRole from '../Hooks/useRole';
import SellerHome from './Seller/SellerHome';
import AdminHome from './Admin/AdminHome';
import UserHome from './User/UserHome';
import { ImSpinner2 } from 'react-icons/im';

const SidebarHome = () => {

    const [role, loading] = useRole()

    if(loading)  <ImSpinner2 size={30} color='green' className='flex flex-col justify-center items-center animate-spin' />

   if (role === 'admin') return  <AdminHome />
   if (role === 'seller') return <SellerHome />
   if (role === 'user') return   <UserHome />
};

export default SidebarHome;