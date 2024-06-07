import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const Profile = () => {

    const {user} = useAuth()

    return (
        <>
        <Helmet>
        <title>Profile || MediMarketHub</title>
      </Helmet>
           <section className='flex justify-center items-center '>
           <div className="flex flex-col max-w-md p-6 dark:bg-gray-50 dark:text-gray-900 rounded-3xl">
	<img src={user?.photoURL} alt="" className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square" />
	<div>
		<h2 className="text-xl font-semibold">{user?.displayName}</h2>
		<span className="block pb-2 text-sm dark:text-gray-600">Member since:  {user?.metadata.creationTime}</span>
		<h2 className="text-xl font-semibold">{user?.email}</h2>
	</div>
</div>
            </section> 
        </>
    );
};

export default Profile;