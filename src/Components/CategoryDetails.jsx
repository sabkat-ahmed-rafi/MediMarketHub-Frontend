import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosSecure } from '../Hooks/useAxiosSecure';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button}
from "@nextui-org/react";
import { FaEye } from 'react-icons/fa';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { format } from 'date-fns';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import Header from './Header';
import { Helmet } from 'react-helmet-async';


const CategoryDetails = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedItem, setSelectedItem] = useState(null);
    const {user} = useAuth()


    const params = useParams()
    const encodedCategory = encodeURIComponent(params.category)

    const {data = []} = useQuery({
        queryKey: ['singleCategory', params.category],
        enabled:!!params.category,
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/category/${encodedCategory}`)
            console.log(data)
            return data
        }
    })

    const handleOpenModal = (item) => {
        setSelectedItem(item);
    };


    const handleAddToCart = async (item) => {

        const {name , genericName, description, price, percentage, category, company, massUnit, image, postedOn, seller, sellerName, sellerPhoto} = item;

        const cartInfo = {
            name , genericName, description, price, percentage, category, company, massUnit, image, postedOn, seller, sellerName, sellerPhoto, quantity: 1, buyerEmail: user?.email, buyerName: user?.displayName, buyerPhoto: user?.photoURL, paymentStatus: "pending"
        }

        try{
            const {data} = await axiosSecure.post('/cart', cartInfo)
            if(data.insertedId) {
                toast.success(`${name} Added to Cart Successfully`);
            }
        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }

    }

    return (
        <>
        <Helmet>
        <title>Category Details || MediMarketHub</title>
      </Helmet>
        <Header title={'Category Details'} description={"Here you can find all the category based medicine infortmation. You can also see detailed information about specific category. Click the eye button to see all details."}></Header>
            <section className='px-[100px]'>
            <Table 
        defaultSelectedKeys={["2"]} 
        aria-label="category specific collection table"
      >
        <TableHeader>
          <TableColumn>Photo</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Company</TableColumn>
          <TableColumn>Discount</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Posted On</TableColumn>
          <TableColumn>Details</TableColumn>
          <TableColumn>Add to Cart</TableColumn>
        </TableHeader>
        <TableBody>
          {
            data.map(item => <TableRow key={item._id}>
            <TableCell className="font-semibold w-[10%]"><img className=" rounded-lg" src={item.image} alt="" /></TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.company}</TableCell>
            <TableCell>{item.percentage}%</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell>{format(new Date(item.postedOn), "dd/MM/yyyy")}</TableCell>
            <TableCell><FaEye className='cursor-pointer' onClick={() => {
                onOpen()
                handleOpenModal(item)
            }} size={20} ></FaEye>
            {/* Detail Modal is here */}
            <Modal backdrop='blur' size='3xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl">Details About {selectedItem?.name}</ModalHeader>
              <ModalBody>
              <section className='flex items-center'>
                <div>
                    <img className='w-[60%] rounded-md' src={selectedItem?.image} alt="" />
                </div>
                <div>
                    <p className='font-semibold text-xl'>{selectedItem?.genericName}</p>
                    <p className='font-semibold'>{selectedItem?.description}</p>
                    <p className='font-semibold'>Price: {selectedItem?.price}</p>
                    <p className='font-semibold'>Company: {selectedItem?.company}</p>
                    <p className='font-semibold'>Category: {selectedItem?.category}</p>
                    <p className='font-semibold'>Mas Unit: {selectedItem?.massUnit}</p>
                    <p className='font-semibold'>Discount: {selectedItem?.percentage}%</p>
                    <p className='font-semibold'>Posted on: {format(new Date(selectedItem?.postedOn), "dd/MM/yyyy")}</p>
                </div>
              </section>
              <section className='font-semibold flex items-center justify-evenly w-full'>
                <p>Posted By:</p>
                <p>{selectedItem.sellerName}</p>
                <p>{selectedItem.seller}</p>
                <img src={selectedItem.sellerPhoto} className='w-[7%] rounded-full' alt="" />
              </section>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold"
                            variant="shadow" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            </TableCell>
            <TableCell><Button
                          onClick={() => handleAddToCart(item)}
                           className='bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold' variant="shadow"  >
                            Add to Cart
                </Button>
                          </TableCell>
          </TableRow>)
          }
        </TableBody>
      </Table>
            </section>
        </>
    );
};

export default CategoryDetails;