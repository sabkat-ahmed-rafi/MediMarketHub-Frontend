import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../Hooks/useAxiosSecure';

const Slider = () => {

    const {data = []} = useQuery({
        queryKey:['sliders'],
        queryFn: async () => {
          const {data} = await axiosSecure.get('/slider')
          console.log(data)
          return data
        }
    })

    return (
        <>
            <section>
            <Swiper
        spaceBetween={80}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper  w-[800px] h-[450px] mb-[56px]"
      >
        {
            data.map(item => <SwiperSlide key={item._id}><img className=' w-[55%] mx-auto' src={item.image} alt="" /></SwiperSlide>)
        }
      </Swiper>
            </section>
        </>
    );
};

export default Slider;