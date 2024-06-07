import React, { useState } from 'react';
import { Input } from "@nextui-org/react";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from '../../Hooks/useAuth';
import { ImSpinner3 } from "react-icons/im";
import { Helmet } from 'react-helmet-async';


const Login = () => {

  const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const {loginUser, loginWithGoogle, loading, setLoading, saveUser} = useAuth()

  
    const onSubmit = async (data) => {
      const {email , password} = data;

      try{    
         setLoading(true)
         // creating user 
         const {user} = await loginUser(email, password)
         navigate('/')
         toast.success("Login Successfully")
         setLoading(false)
       }catch(err){
        console.log(err.message)
        toast.error(err.message)
        setLoading(false)
       }

    };

    const handleGoogleLogIn = async () => {
      try{
       const {user} = await loginWithGoogle()
       console.log(user)
       await saveUser(user.email, 'user')
       navigate('/')
       toast.success("Login Successfully")
      }catch(err){
       console.log(err.message)
       toast.error(err.message)
       setLoading(false)

      }
   }

    return (
        <>
        <Helmet>
        <title>Login || MediMarketHub</title>
      </Helmet>
             <section className="pt-[100px] flex justify-center items-center space-x-3">
        <h1 className="lg:text-4xl font-extrabold text-2xl text-pretty">
          Log in
        </h1>
        <AiFillMedicineBox className="text-green-600 text-4xl" />
      </section>
      <section className="flex flex-col justify-center items-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[400px] pb-2">
            <Input
              {...register("email", { required: true })}
              name="email"
              size="lg"
              type="email"
              label="Email"
              labelPlacement={"outside"}
            />
            {errors.email?.type === "required" && (
        <p className="text-red-500">Email is required</p>
      )}
          </div>
          <div className="w-[400px] pb-2">
            <Input
              {...register("password", { required: true })}
              name="password"
              size="lg"
              type={isVisible ? "text" : "password"}
              label="Password"
              labelPlacement={"outside"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            {errors.password?.type === "required" && (
        <p className="text-red-500">Password is required</p>
      )}
          </div>

          <div className='pt-4'>
            <button className="btn w-full text-white font-bold bg-gradient-to-br from-green-500 to-emerald-600">
            {loading? <ImSpinner3 className="animate-spin mx-auto text-white size-6" /> : "Log in"}
            </button>
          </div>
        </form>        
            <div className="text-center pt-4">
                <button onClick={handleGoogleLogIn} className="btn w-[400px] font-bold  "><FcGoogle className="text-2xl" />
 Google</button>
            </div>
          <div className="pt-3 italic text-center">
            <p>
              Haven't an Account? <Link to={"/signUp"}>Sign up</Link>
            </p>
          </div>
      </section>
        </>
    );
};

export default Login;