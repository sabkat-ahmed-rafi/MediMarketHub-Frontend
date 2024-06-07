import React, { useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import Header from '../../Components/Header';
import useAuth from '../../Hooks/useAuth';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CSVLink, CSVDownload } from "react-csv";
import { Helmet } from 'react-helmet-async';



const SalesReport = () => {

    const {user} = useAuth()
    const {data = [], refetch} = useQuery({
      queryKey: ['userPaymentHistory', user?.email],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/purchase`)
        return data
      }
    })

    const [csvData, setCsvData] = useState([])



const handleGetData = (data) => {

    const {purchaseInfo = [], totalAmount, status, sellerEmail, buyerEmail} = data
    const productNames = purchaseInfo.map(p => p.name)

    const newCsvData = [
        ["Seller Email", "Buyer Email", "Total Amount", "Status", "Total Product", "Products Name"],
        [sellerEmail, buyerEmail, totalAmount, status, purchaseInfo.length, productNames],
      ];

       setCsvData(newCsvData)

}



    return (
        <>
        <Helmet>
        <title>Payment History || MediMarketHub</title>
      </Helmet>
            <section>
                <Header title={"Sales Report"} description={"Here you can see all the purchase history. You can also see total payment, total pending and total paid."} />
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
        <TableColumn>Download Report</TableColumn>
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
              <TableCell>
              <CSVLink onClick={() => handleGetData(item)} className='btn bg-gradient-to-br to-teal-400 from-emerald-600 font-bold text-white' filename={`sale_report_of_${item.sellerEmail}.csv`} data={csvData}>Download Report</CSVLink></TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
            </section>
        </>
    );
};

export default SalesReport;