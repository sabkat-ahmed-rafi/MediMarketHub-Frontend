import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <section  className='flex w-full'>
                <div className='lg:w-[25%] w-[30%]'>
                    <Sidebar  />
                </div>
                <div className='w-[75%]'>
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default Dashboard;