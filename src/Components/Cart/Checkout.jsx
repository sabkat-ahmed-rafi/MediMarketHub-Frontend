import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { AiFillMedicineBox } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { axiosSecure } from "../../Hooks/useAxiosSecure";




const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {

    const {user} = useAuth()
    const [clientSecret, setClientSecret] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    const {data: purchaseInfo = []} = useQuery({
        queryKey: ['purchaseInfo', user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/cart/${user?.email}`)
            return data
        }
    })
    
    useEffect(() => {
        const initialTotalAmount = purchaseInfo.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(initialTotalAmount);
        }, [purchaseInfo]);


        useEffect(() => {
            if (totalAmount > 0) {
                const fetchClientSecret = async () => {
                    const { data } = await axiosSecure.post("/create-payment-intent", { amount: totalAmount });
                    setClientSecret(data.clientSecret);
                };
                fetchClientSecret();
            }
        }, [totalAmount]);

  return (
    <>
      <section>
        <div className="min-h-screen bg-base-200 bg-gradient-to-br from-teal-500 to-emerald-700 flex justify-center items-center">
            <div className="card w-full max-w-2xl p-20 shadow-2xl bg-slate-100 space-y-3">
        <Link className="btn btn-ghost hover:bg-slate-100 font-bold text-4xl "><AiFillMedicineBox className='text-emerald-500 text-4xl ' />
        MediMarketHub</Link>
                <Elements stripe={stripePromise}>
                  <CheckoutForm totalAmount={totalAmount} clientSecret={clientSecret} purchaseInfo={purchaseInfo} />
                </Elements>
            </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
