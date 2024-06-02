import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../Hooks/useAuth';
import uploadImage from "../Utility/uploadImage";
import axios from "axios";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";


const SignUp = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate()

  const {createUser, updateUserProfile, loginWithGoogle, loading, setLoading, saveUser} = useAuth()

  const onSubmit = async (data) => {
    
    const {name , email, image, role, password} = data;

   try{
    setLoading(true)
    const photo = await uploadImage(image[0])

     // creating user 
     const {user} = await createUser(email, password)
     saveUser(email, role)
     await updateUserProfile(name, photo)
     navigate('/')
     toast.success("Signup Successfully")
    setLoading(false)
   }catch(err){
    console.log(err.message)
    toast.error(err.message)
    setLoading(false)
   }
  };

  // Log in with google 
  const handleGoogleLogIn = async () => {
     try{
      const {user} = await loginWithGoogle()
      saveUser(user.email, 'user')
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
      <section className=" flex justify-center items-center space-x-3">
        <h1 className="lg:text-4xl font-extrabold text-2xl text-pretty">
          Create an account
        </h1>
        <AiFillMedicineBox className="text-green-600 text-4xl" />
      </section>
      <section className="flex flex-col justify-center items-center pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
          <div className="w-[400px] pb-2">
            <Input
              {...register("name", { required: true })}
              name="name"
              size="lg"
              type="text"
              label="User Name"
              labelPlacement={"outside"}
            />
            {errors.name?.type === "required" && (
        <p className="text-red-500">Name is required</p>
      )}
          </div>
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
          <div className="pt-3">
            <select
            defaultValue={'user'}
              {...register("role", { required: true })}
              className="select select-bordered w-full max-w-xs "
              
            >
              <option disabled>
                Select Role
              </option>
              <option value={'seller'}>seller</option>
              <option value={'user'}>user</option>
            </select>
            {errors.userRole?.type === "required" && (
        <p className="text-red-500">User Role is required</p>
      )}
          </div>
          <div className="w-[400px] py-6">
            <input
              {...register("image", { required: true })}
              name="image"
              type="file"
              className="bg-[#EEEEEF] p-2 py-2 rounded-xl before:p-4 file:font-light"
            />
                 {errors.image?.type === "required" && (
       <p className="text-red-500">Image is required</p>
      )}
          </div>
          <div>
            <button className="btn w-full text-white font-bold bg-gradient-to-br from-green-500 to-emerald-600">
              {loading? <ImSpinner3 className="animate-spin mx-auto text-white size-6" /> : "Sign Up"}
            </button>
          </div>
        </form>        
            <div className="text-center pt-3">
                <button onClick={handleGoogleLogIn} className="btn w-[400px] font-bold  "><FcGoogle className="text-2xl" />
 Google</button>
            </div>
          <div className="pt-3 italic text-center">
            <p>
              Already Have an Account? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
      </section>
    </>
  );
};

export default SignUp;
