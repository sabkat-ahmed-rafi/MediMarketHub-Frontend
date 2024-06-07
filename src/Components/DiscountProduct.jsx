import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { axiosSecure } from '../Hooks/useAxiosSecure';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import Header from './Header';

const DiscountProduct = () => {

    const {data = [], isLoading} = useQuery({
        queryKey:['discountProducts'],
        queryFn: async () => {
            const {data} = await axiosSecure.get('/discountMedicine')    
            return data
        }
    })

    console.log(data.length)


    return (
        <>
        <Header title={"Discount Products"} description={"Here you can see all the discounted products. This section is dragable."} />
            <section className='mb-20'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper w-[500px]"
      >
        {
            data.map(item => <SwiperSlide key={item._id}><img className='' src={item.image} alt="" /></SwiperSlide>
        )
        }
      </Swiper>
            </section>
        </>
    );
};

export default DiscountProduct;