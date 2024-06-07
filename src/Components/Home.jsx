import React from 'react';
import CategoryCard from './CategoryCard';
import Slider from './Slider';
import DiscountProduct from './DiscountProduct';
import Marquee from "react-fast-marquee";
import Accordian from './Accordian';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    


    return (
        <div>
            <Helmet>
        <title>MediMarketHub</title>
      </Helmet>
            <Slider />
            <CategoryCard/>
            <DiscountProduct />
            <Accordian />
            <Marquee className='text-2xl mt-[100px] font-bold text-emerald-500' speed={90}>
            To support your wellness journey, we’re offering discount on some medications checkout now.
            </Marquee>
        </div>
    );
};

export default Home;