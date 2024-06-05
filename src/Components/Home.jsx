import React from 'react';
import CategoryCard from './CategoryCard';
import Slider from './Slider';
import DiscountProduct from './DiscountProduct';

const Home = () => {
    


    return (
        <div>
            <Slider />
            <CategoryCard/>
            <DiscountProduct />
        </div>
    );
};

export default Home;