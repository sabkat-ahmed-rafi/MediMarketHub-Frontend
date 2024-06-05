import React from "react";
import { AiFillMedicineBox } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaUsersLine } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome, FaMoneyCheckAlt } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { GiMedicines } from "react-icons/gi";
import { RiAdvertisementFill } from "react-icons/ri";
import useRole from "../Hooks/useRole";







const Sidebar = () => {

    const [role, loading] = useRole()

    console.log(role)

    
  return (
    <>
      <section className="sticky top-0 min-h-screen bg-green-100 border-r-green-600  shadow-lg shadow-green-700 rounded-tr-3xl rounded-br-3xl">
        <div className="flex flex-col items-center">
          <Link to={"/"} className="btn mt-6 btn-ghost font-bold md:text-2xl lg:text-3xl">
            <AiFillMedicineBox className="text-green-600 lg:text-4xl" />
            MediMarketHub
          </Link>
        </div>
        <div className="flex flex-col items-center pt-4">
            {/* Admin Role Menu Items  */}
            {role === 'admin' && <nav>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7"><FaHome /><span>Admin Home</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link to={'/dashboard/manageUser'} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7"><FaUsersLine /><span>Manage Users</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link to={"/dashboard/manageCategory"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 "><BiSolidCategory /><span>Manage Category</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 "><FaMoneyCheckAlt /><span>Payment management</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 "><BiSolidReport /><span>Sales Report</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link to={"/dashboard/manageAds"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 "><RiAdvertisementFill /><span>Manage banner Advertise</span></Link>
                </div>
                </nav>}
            {/* Seller Role Menu Items  */}
            {role === 'seller' && <nav>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7"><FaHome /><span>Seller Home</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link to={'/dashboard/manageMedicine'} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7"><GiMedicines /><span>Manage Medicines</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 "><FaMoneyCheckAlt /><span>Payment History</span></Link>
                </div>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link to={"/dashboard/askAdvertisement"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 "><RiAdvertisementFill /><span>Ask For Advertisement</span></Link>
                </div>
                </nav>}
            {/* User Role Menu Items  */}
            {role === 'user' && <nav>
                <div className="lg:border-t border-slate-400 py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7"><FaMoneyCheckAlt /><span>Payment history</span></Link>
                </div>
                </nav>}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
