import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Select, SelectItem}
from "@nextui-org/react";
import { FaEye } from 'react-icons/fa';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Header from '../Header';
import { CiSearch } from 'react-icons/ci';
import {Pagination} from "@nextui-org/react";

const Shop = () => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [key, setKey] = useState(Date.now());
  const {user} = useAuth()
  const sortValue = ['ascending', 'descending'] 
  const [itemPerPage, setItemPerPage] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)

    const handleOpenModal = (item) => {
        setSelectedItem(item);
    };

    const {data = []} = useQuery({
        queryKey: ['allMedicine',search, sort, currentPage, itemPerPage],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/medicine?search=${search}&sort=${sort}&page=${currentPage}&limit=${itemPerPage}`)
            console.log(data)
            return data
        }
    })

    const {data: totalMedicineCount = { result: 0 } } = useQuery({
      queryKey: ['totalMedicineCount'],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/medicine/count`)
        console.log(data)
        return data
      }
    })

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

    console.log(search)
    console.log(sort)

    const handleReset = () => {
      setSearch('')
      setSort('')
      setKey(Date.now());
    }

    return (
        <>
        <Header title={'All Medicines'} description={"Here you can find all the medicines. You can also check details information of a specific medicine by clicking the eye icon. You can also add a medicine to the cart by clicking add to cart."}></Header>
        <section className='relative left-[100px] max-w-[700px] grid grid-cols-4 space-x-10 pb-[20px]'>
        <div>
        <Input
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
        aria-lebel={'search-lebel'}
          type="text"
          placeholder="Search"
          labelPlacement="outside"
          startContent={
            <CiSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        </div>
        <div>
        <Select
        key={key}
        value={sort}
        onChange={(e) => setSort(e.target.value)}
              placeholder="sort by price"
              labelPlacement="outside"
              aria-label={'none'}
              className="max-w-xs"
            >
              {sortValue.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
        </div>
        <div>
          <Button onClick={handleReset} className='bg-gradient-to-br to-teal-500 from-emerald-500 font-semibold text-white' >Reset</Button>
        </div>
        </section>
            <section className='px-[100px] pb-20'>
            <Table 
            className='shadow-lg shadow-green-500 rounded-[12px]'
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
                    <img className='w-[60%]' src={selectedItem?.image} alt="" />
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
            <section className='max-w-full flex justify-center items-center'>
            <Pagination
            color='success'
            className='font-semibold text-white'
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
            total={Math.ceil(totalMedicineCount.result/itemPerPage)} 
            initialPage={1} />
            </section>
        </>
    );
};

export default Shop;