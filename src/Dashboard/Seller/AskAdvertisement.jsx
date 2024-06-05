import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Textarea}
from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import Header from '../../Components/Header';
import { useForm } from "react-hook-form"
import uploadImage from '../../Authentication/Utility/uploadImage';


const AskAdvertisement = () => {

    const {user} = useAuth()

    const {register, handleSubmit, formState: { errors }, reset} = useForm()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedItem, setSelectedItem] = useState(null);

    const {data = [], refetch} = useQuery({
        queryKey: ['userBasedMedicine', user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/medicine/${user.email}`)
            return data
        }
    })

    const handleOpenModal = (item) => {
        setSelectedItem(item);
    };


    const onSubmit = async (data) => {
        console.log(selectedItem)
        console.log(data)
        const {description, photo} = data;

        const {name, sellerPhoto, seller, isAdvertised } = selectedItem;

        try{
            const image = await uploadImage(photo[0])
            const advertisementInfo = {name, sellerPhoto, seller, description, image, isAdvertised}
            const {data} = await axiosSecure.post('/advertisement', advertisementInfo)
            if(data.insertedId) {
                toast.success("Request Sent Successfully");
                onOpenChange(false)
                refetch()
            }
        }catch(err){
            console.log(err.message)
            toast.error(err.message)
        }
        
        reset()
    }

    return (
        <>
        <Header title={"Manage Advertisements"} description={"Here you can manage your advertisements. You can also send request for advertisement. And you can also see all the information for your advertised products."}></Header>
            <section className=' pb-20'>
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
          <TableColumn>Is Advertised</TableColumn>
          <TableColumn>Request for Advertisement</TableColumn>
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
            <TableCell>{item.isAdvertised}</TableCell>
            <TableCell><Button
            disabled={item.isAdvertised === 'Yes'}
            onClick={() => {
                onOpen()
                handleOpenModal(item)
            }}
                           className={`bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold ${item.isAdvertised === 'Yes' && 'from-red-600 to-red-400'} `}variant="shadow"  >
                           {item.isAdvertised === 'Yes' ? 'Advertising': "Send Request for Advertisement"}
                </Button>
                {/* Request Modal is here */}
            <Modal backdrop='blur' size='xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl">Send Advertisement Request for {selectedItem?.name}</ModalHeader>
              <ModalBody>
              <section className=''>
                <form onSubmit={handleSubmit(onSubmit)} >
               <section className='space-y-4'>
               <Textarea
                        {...register("description", { required: true })}
                          label="Description"
                          variant="bordered"
                          placeholder="Enter your description"
                          disableAnimation
                          disableAutosize
                          classNames={{
                            base: "",
                            input: "resize-y min-h-[40px]",
                          }}
                           />
                           {errors.description && <span className='text-red-600 p-2'>This field is required</span>}
                           <div>
                        <input {...register("photo", { required: true })} type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs file:bg-emerald-600 file:border-none file:shadow-lg file:shadow-green-500" />
                        {errors.photo && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
               </section>
               <section className='flex justify-end space-x-4'>
               <Button className="text-white font-semibold"
                         color='danger'   variant="shadow" onPress={() => {
                            onClose()
                            reset()
                         }}>
                  Close
                </Button>
                <Button type='submit' className="bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold"
                            variant="shadow">
                  Send
                </Button>
               </section>
                </form>
              </section>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
            </Modal>
            </TableCell>
          </TableRow>)
          }
        </TableBody>
            </Table>
            </section>
        </>
    );
};

export default AskAdvertisement;