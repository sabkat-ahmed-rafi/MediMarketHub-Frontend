import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { GiTakeMyMoney, GiMoneyStack  } from "react-icons/gi";
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../Hooks/useAxiosSecure';


const AdminHome = () => {


    const {user} = useAuth()

    const {data = {} } = useQuery({
      queryKey: ['seller-stat', user?.email],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/admin-total-statistics`)
        return data
      },
      enabled:!!user?.email
    })
    

    return (
        <>
            <section className='flex justify-center pt-10'>
            <div className="stats shadow-lg shadow-green-700 rounded-[12px] bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold">
  
  <div className="stat ">
    <div className="stat-figure text-5xl text-white">
    <GiTakeMyMoney />
    </div>
    <div className="stat-title text-white font-bold">Total Revenue</div>
    <div className="stat-value  text-white">{data.totalAmount}$</div>
    <div className="stat-desc text-white">21% more than last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-5xl text-white">
    <GiMoneyStack />
    </div>
    <div className="stat-title text-white font-bold">Total Paid</div>
    <div className="stat-value text-white">{data.paidAmount}$</div>
    <div className="stat-desc text-white">21% more than last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src={user? user.photoURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
        </div>
      </div>
    </div>
    <div className="stat-title text-white font-bold">Total Pending</div>
    <div className="stat-value text-white">{data.pendingAmount}$</div>
    <div className="stat-desc text-white">21% more than last month</div>
  </div>
  
</div>
            </section>
        </>
    );
};

export default AdminHome;