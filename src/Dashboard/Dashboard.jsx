import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    return (
        <>
        <Helmet>
        <title>Dashboard || MediMarketHub</title>
      </Helmet>
            <section  className='flex w-full'>
                <div className='lg:w-[25%] w-[30%]'>
                    <Sidebar  />
                </div>
                <div className='w-[75%] px-[4%]'>
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default Dashboard;