import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Header from '../../Components/Header';
import useAuth from '../../Hooks/useAuth';


const SellerPayment = () => {

    const {user} = useAuth()


    return (
        <>
           <section>
                <Header title={`${user?.displayName}'s Payment History`} description={"Here you can see all the purchase history. You can also see total payment, total pending and total paid."} />
            <Table 
        color={"success"}
        selectionMode="single" 
        defaultSelectedKeys={["2"]} 
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>

        </TableBody>
      </Table>
            </section> 
        </>
    );
};

export default SellerPayment;