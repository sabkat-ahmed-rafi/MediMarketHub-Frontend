import React, { useEffect, useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import Header from '../Header';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Cart = () => {

    const {user} = useAuth()
    const {data = [], refetch} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/cart/${user?.email}`)
            return data
        }
    })

    const [totalAmount, setTotalAmount] = useState(0)
    const [initialAmount, setInitialAmount] = useState(0)
    
    useEffect(() => {
        const initialTotalAmount = data.reduce((sum, item) => sum + item.price, 0);
        setInitialAmount(initialTotalAmount)
        setTotalAmount(initialTotalAmount);
        }, [data]);

    const handleIncrease = async (item) => {
        try{
            const {data} = await axiosSecure.patch(`/cart/quantity-increase`, item)
            refetch()
        }catch(error){
            console.log(error.message)
        }
    }

    const handleDecrease = async (item) => {
        // if(totalAmount == initialAmount) return
        // setTotalAmount(totalAmount - item.price)
        try{
            const {data} = await axiosSecure.patch(`/cart/quantity-decrease`, item)
            refetch()
        }catch(error){
            console.log(error.message)
        }
    }

    const handleDeleteOne = async (_id) => {
        console.log(_id)
        try{
            const {data} = await axiosSecure.delete(`/cart/${_id}`)
            console.log(data)
            refetch()
        }catch(error){
            console.log(error.message)
        }
    }

    const handleDeleteAll = async () => {
        console.log('delete all')
        try{
            const {data} = await axiosSecure.delete(`/cartClear/${user?.email}`)
            refetch()
        }catch(error){
            console.log(error.message)
        }
    }



    return (
        <>
        <Helmet>
        <title>Cart || MediMarketHub</title>
      </Helmet>
        <Header title={totalAmount <= 0 ? 'Emply Cart': 'Cart'} />
        
        <section className='flex justify-end space-x-7 mr-[50px] mb-8'>
        {
            totalAmount > 0 && <section className='ml-[50px] mt-[px]'><Button 
            onClick={handleDeleteAll}
            className={'font-bold text-white bg-gradient-to-br to-red-400 from-red-600'}>Clear Cart</Button></section>
        }
            <div className='text-2xl font-bold'>
                Total Amount:  ${totalAmount}
            </div>
            {
                totalAmount > 0 && <div>
                <Link to={'/checkout'}><Button className={'font-bold text-white bg-gradient-to-br to-teal-400 from-emerald-600'}>Checkout</Button></Link>
                </div>
            }
        </section>
            <section className='mb-[100px] mx-[50px] shadow-lg shadow-green-500 rounded-[12px] '>
            <Table 
        color={'success'}
        selectionMode="single" 
        defaultSelectedKeys={["2"]} 
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Photo</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Company</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Increase</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Decrease</TableColumn>
          <TableColumn>Remove</TableColumn>
        </TableHeader>
        <TableBody>
          {
            data.map(item => <TableRow key={item._id}>
                 <TableCell className="font-bold w-[7%]"><img className=" rounded-lg" src={item.image} alt="" /></TableCell>
                <TableCell className='font-bold'>{item.name}</TableCell>
                <TableCell className='font-bold'>{item.company}</TableCell>
                <TableCell className='font-bold'>${item.price}</TableCell>
                <TableCell><Button onClick={() => handleIncrease(item)} isIconOnly className={'font-bold text-white text-lg bg-gradient-to-br to-teal-500 from-emerald-600'}><FiPlus  /></Button></TableCell>
                <TableCell className='font-bold'>{item.quantity}</TableCell>
                <TableCell><Button onClick={() => handleDecrease(item)} isIconOnly className={'font-bold text-white text-lg bg-gradient-to-br to-teal-500 from-emerald-600'}><FiMinus  /></Button></TableCell>
                <TableCell><Button onClick={() => handleDeleteOne(item._id)} className={'font-bold text-white bg-gradient-to-br to-red-400 from-red-600'}>Remove</Button></TableCell>
              </TableRow>)
          }
        </TableBody>
      </Table>
            </section>
        </>
    );
};

export default Cart;