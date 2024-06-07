import React from 'react';
import {Button} from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import Header from '../../Components/Header';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const ManageAds = () => {


    const {data = [], refetch} = useQuery({
        queryKey: ['allAdvertisements'],
        queryFn: async () => {
            const {data} = await axiosSecure.get('/advertisement')
            return data
        }
    })

    

    const handleAds = async (item) => {
        try{
            const {data} = await axiosSecure.post("/slider", item)
            refetch()
            if(data.insertedId){
                toast.success("Added for Advertising")
            }
            if(data.deletedCount > 0) {
                toast.success("Removed from Advertising")
            }
        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }
    }

    
    return (
        <>
        <Helmet>
        <title>Manage Ads || MediMarketHub</title>
      </Helmet>
        <Header title={"Manage Advertisements"} description={"Here you can manage advertisements for website. selected items will show on the slider ads section"}></Header>
            <section className='grid grid-cols-2 gap-7 pb-16'>
            {
                data.map(item => <div key={item._id} className="card w-96 bg-base-100 shadow-lg shadow-green-500 rounded-[12px]">
                <figure className="px-10 pt-10">
                  <img src={item.image} alt="Shoes" className="rounded-xl w-[60%]" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.name}</h2>
                  <p>{item.description}</p>
                  <p className='font-semibold'>Advertisement: {item.isAdvertised}</p>
                  <div className="card-actions">
                  <Button
                 onClick={() => handleAds(item)}
                 className={`bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold ${item.isAdvertised === 'Yes' && 'from-red-600 to-red-400'} `}
                 variant="shadow"
                >
                {item.isAdvertised === 'Yes' ? "Remove From Advertise": "Add to Advertise"}
                </Button>
                  </div>
                </div>
              </div> )
            }
            </section>
        </>
    );
};

export default ManageAds;

