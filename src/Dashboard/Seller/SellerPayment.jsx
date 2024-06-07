import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Header from '../../Components/Header';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';


const SellerPayment = () => {

    const {user} = useAuth()

    const {data = []} = useQuery({
      queryKey: ['sellerPaymentHistory', user?.email],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/purchase/seller/${user?.email}`)
        return data
      }
    })

    console.log(data)


    return (
        <>
        <Helmet>
        <title>Payment History || MediMarketHub</title>
      </Helmet>
           <section>
                <Header title={`${user?.displayName}'s Payment History`} description={"Here you can see all the purchase history. You can also see total payment, total pending and total paid."} />
            <Table 
        color={"success"}
        selectionMode="single" 
        defaultSelectedKeys={["2"]} 
        aria-label="Example static collection table"
      >
        <TableHeader>
        <TableColumn>Buyer Email</TableColumn>
        <TableColumn>Status</TableColumn>
          <TableColumn>Total Item</TableColumn>
          <TableColumn>Total Amount</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody>
          {
            data.map(item => <TableRow key={item._id}>
              <TableCell>{item.buyerEmail}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.purchaseInfo.length}</TableCell>
              <TableCell>${item.totalAmount}</TableCell>
              <TableCell>{format(new Date(item.date), "dd/MM/yyyy")}</TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
            </section> 
        </>
    );
};

export default SellerPayment;