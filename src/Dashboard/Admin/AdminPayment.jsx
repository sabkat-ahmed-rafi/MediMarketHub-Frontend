import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import Header from '../../Components/Header';
import useAuth from '../../Hooks/useAuth';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';

const AdminPayment = () => {

  const {user} = useAuth()
  const {data = [], refetch} = useQuery({
    queryKey: ['userPaymentHistory', user?.email],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/purchase`)
      return data
    }
  })

  const handleAcceptPayment = async (transactionId) => {
    console.log(transactionId)
    try{
      const {data} = await axiosSecure.patch(`/acceptPayment/${transactionId}`,{status: 'paid'})
    refetch()
    return data
    }catch(err){
      console.log(err.message)
    }
  }


  

    return (
        <>
        <Helmet>
        <title>Manage Payments || MediMarketHub</title>
      </Helmet>
            <section>
                <Header title={"Manage Payments"} description={"Here you can see all the purchase history. You can also see total payment, total pending and total paid."} />
            <Table 
        color={"success"}
        selectionMode="single" 
        defaultSelectedKeys={["2"]} 
        aria-label="Example static collection table"
      >
        <TableHeader>
        <TableColumn>Seller Email</TableColumn>
        <TableColumn>Buyer Email</TableColumn>
        <TableColumn>Status</TableColumn>
          <TableColumn>Total Item</TableColumn>
          <TableColumn>Total Amount</TableColumn>
          <TableColumn>Date</TableColumn>
        <TableColumn>Accept Payment</TableColumn>
        </TableHeader>
        <TableBody>
        {
            data.map(item => <TableRow key={item._id}>
              <TableCell>{item.sellerEmail}</TableCell>
              <TableCell>{item.buyerEmail}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.purchaseInfo.length}</TableCell>
              <TableCell>${item.totalAmount}</TableCell>
              <TableCell>{format(new Date(item.date), "dd/MM/yyyy")}</TableCell>
              <TableCell><Button onClick={() => handleAcceptPayment(item.transactionId)} disabled={item.status == "paid"} className='bg-gradient-to-br to-teal-400 from-emerald-600 font-bold text-white'>{item.status == 'pending'? "Accept Payment": "Accepted"}</Button></TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
            </section>
        </>
    );
};

export default AdminPayment;