import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { GiTakeMyMoney, GiMoneyStack  } from "react-icons/gi";

const SellerHome = () => {

    const {user} = useAuth()

    return (
        <>
            <section className='flex justify-center pt-10'>
            <div className="stats shadow-lg shadow-green-700 rounded-[12px] bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold">
  
  <div className="stat ">
    <div className="stat-figure text-5xl text-white">
    <GiTakeMyMoney />
    </div>
    <div className="stat-title text-white font-bold">Total Revenue</div>
    <div className="stat-value  text-white">{25.6}$</div>
    <div className="stat-desc text-white">21% more than last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-5xl text-white">
    <GiMoneyStack />
    </div>
    <div className="stat-title text-white font-bold">Total Paid</div>
    <div className="stat-value text-white">{2.6}$</div>
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
    <div className="stat-value text-white">{2.6}$</div>
    <div className="stat-desc text-white">21% more than last month</div>
  </div>
  
</div>
            </section>
        </>
    );
};

export default SellerHome;