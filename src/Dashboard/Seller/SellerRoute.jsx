import React from 'react';
import useRole from '../../Hooks/useRole';
import { Navigate } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import useAuth from '../../Hooks/useAuth';

const SellerRoute = ({children}) => {
    const [role, isLoading] = useRole()
    const {loading} = useAuth()
    if(isLoading || loading) return <ImSpinner2 size={30} color='green' className='sticky top-[50%] left-[63%] items-center animate-spin' />
    if(role === 'seller') return children
    return <Navigate to={'/dashboard'} />
};

export default SellerRoute;