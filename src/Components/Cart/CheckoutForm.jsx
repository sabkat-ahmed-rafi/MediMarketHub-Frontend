import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkout.css";
import { Button } from "@nextui-org/react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import { ImSpinner3 } from "react-icons/im";

const CheckoutForm = ({ totalAmount, clientSecret, purchaseInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate()

  const sellerEmail = purchaseInfo.find(item => item.seller)

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setProcessing(false)
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
        setProcessing(false)
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false)
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });


      if (confirmError) {
        console.log("[error]", confirmError);
        setCardError(confirmError.message);
        setProcessing(false)
        return;
      } 


      if(paymentIntent.status === 'succeeded') {
        const paymentInfo = {
            transactionId: paymentIntent.id,
            sellerEmail: sellerEmail?.seller,
            buyerEmail: user?.email,
            status: 'pending',
            totalAmount,
            date: new Date(),
            purchaseInfo
        }
        console.log(paymentInfo)
        setProcessing(false)

        try{
            const {data} = await axiosSecure.post('/purchase', paymentInfo)
            if(data.insertedId) {
                console.log(data)
                navigate(`/invoice/${paymentIntent.id}`)
            }
        }catch(error){
            console.log(error.message)
        }

      }



  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          {cardError && <p className="text-red-500 pb-2">{cardError}</p>}
          <Button
            className="bg-gradient-to-br to-teal-400 from-emerald-600 text-white font-bold"
            type="submit"
            disabled={!stripe || clientSecret == "" || processing}
          >
            { processing ? <ImSpinner3 className="animate-spin mx-auto text-white size-6" /> : `Pay ${totalAmount}`}
          </Button>
        </form>
      </section>
    </>
  );
};

export default CheckoutForm;
