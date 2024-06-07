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
    
  return (
    <>
      <section className="sticky top-0 min-h-screen bg-green-100 border-r-green-600  shadow-lg shadow-green-700 rounded-tr-3xl rounded-br-3xl bg-gradient-to-br from-teal-400 to-emerald-600 text-white">
        <div className="flex flex-col items-center">
          <Link to={"/"} className=" mt-6 flex justify-center space-x-2 font-bold md:text-2xl lg:text-3xl">
            <AiFillMedicineBox className="text-white lg:text-4xl" />
            <span>MediMarketHub</span>
          </Link>
        </div>
        <div className="flex flex-col items-center pt-4">
            {/* Admin Role Menu Items  */}
            {role === 'admin' && <nav>
                <div className="lg:border-t py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><FaHome /><span>Admin Home</span></Link>
                </div>
                <div className="lg:border-t py-6">
                    <Link to={'/dashboard/manageUser'} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><FaUsersLine /><span>Manage Users</span></Link>
                </div>
                <div className="lg:border-t py-6">
                    <Link to={"/dashboard/manageCategory"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><BiSolidCategory /><span>Manage Category</span></Link>
                </div>
                <div className="lg:border-t py-6">
                    <Link to={"/dashboard/adminPayment"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><FaMoneyCheckAlt /><span>Payment management</span></Link>
                </div>
                <div className="lg:border-t  py-6">
                    <Link to={"/dashboard/salesReport"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><BiSolidReport /><span>Sales Report</span></Link>
                </div>
                <div className="lg:border-t py-6">
                    <Link to={"/dashboard/manageAds"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><RiAdvertisementFill /><span>Manage banner Advertise</span></Link>
                </div>
                </nav>}
            {/* Seller Role Menu Items  */}
            {role === 'seller' && <nav>
                <div className="lg:border-t  py-6">
                    <Link className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><FaHome /><span>Seller Home</span></Link>
                </div>
                <div className="lg:border-t  py-6">
                    <Link to={'/dashboard/manageMedicine'} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><GiMedicines /><span>Manage Medicines</span></Link>
                </div>
                <div className="lg:border-t  py-6">
                    <Link to={"/dashboard/sellerPayment"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black "><FaMoneyCheckAlt /><span>Payment History</span></Link>
                </div>
                <div className="lg:border-t py-6">
                    <Link to={"/dashboard/askAdvertisement"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black"><RiAdvertisementFill /><span>Ask For Advertisement</span></Link>
                </div>
                </nav>}
            {/* User Role Menu Items  */}
            {role === 'user' && <nav>
                <div className="lg:border-t py-6">
                    <Link to={"/dashboard/userPayment"} className="lg:text-xl sm:text-sm flex items-center font-semibold font-serif space-x-7 border-white hover:text-black"><FaMoneyCheckAlt /><span>Payment history</span></Link>
                </div>
                </nav>}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
