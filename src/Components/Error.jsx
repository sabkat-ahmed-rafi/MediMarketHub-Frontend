import { Button } from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
         <section className='flex items-center '>
            <div className=''>
                <img src={"/public/error.gif"} alt="" />
            </div>
            <div className=''>
                <Link to="/">
                <Button className='bg-gradient-to-br to-teal-400 from-emerald-500 shadow-lg shadow-green-600 text-white font-semibold'>Go to Homopage</Button>
                </Link>
            </div>
         </section>   
        </>
    );
};

export default Error;