import React, { useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import Header from '../../Components/Header';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea, Select, SelectItem} from "@nextui-org/react";
import { useForm } from "react-hook-form"
import useAuth from '../../Hooks/useAuth';
import { axiosSecure } from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import uploadImage from '../../Authentication/Utility/uploadImage';
import { ImSpinner2 } from 'react-icons/im';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useCategory from '../../Hooks/useCategory';


const ManageMedicine = () => {

    const {register, handleSubmit, formState: { errors }, reset} = useForm()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const {categories: allCategories} = useCategory()
    const categories = allCategories.map(category => category.categoryName)

    const companies = [ "Pharma Inc.", "MedLife", "HealthCorp", "Wellness Ltd." ]
    const itemMassUnit = ['Mg', 'ML']

    const {user} = useAuth()

    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {

      setLoading(data)

      const {name, genericName, description, price, percentage, category, company, massUnit, photo } = data;

      const image = await uploadImage(photo[0])

      const discount = parseInt(percentage)

      const medicineInfo = {
         name,
         genericName, 
         description, 
         price, 
         percentage: discount, 
         category, 
         company, 
         massUnit, 
         image,
         postedOn: Date.now(),
         seller: user?.email,
         sellerName: user?.displayName,
         sellerPhoto: user?.photoURL,
         isAdvertised: 'No'
         }

         console.log(medicineInfo)

         try{
          const {data} = await axiosSecure.post('/medicine', medicineInfo)
          console.log(data)
          if(data.insertedId) { 
            refetch()
            toast.success('Medicine Added successfully')
            reset()
            setLoading(false)
          }
         }catch(err){
          console.log(err.message)
          toast.error(err.message)
          setLoading(false)
        }

    }

    const {data:medicines = [], refetch} = useQuery({
      queryKey:['medicines'],
      queryFn: async () => {
        const {data} = await axiosSecure.get('/medicine')
        return data
      }
    })


    return (
        <>
        
        <Header title={"Manage Medicine"} description={'Welcome to the Manage Medicines section of your seller dashboard. This comprehensive feature allows you to efficiently manage your entire inventory of medicines. Here, you can add new medicines and keep track of stock levels and expiry dates'} />
            <section className='pb-12'>
                <div className='pb-4'>
                <Button onPress={onOpen} className='bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold' variant="shadow">Add Medicine</Button> 
                {/* now i have to implement the modal here  */}
                <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent  className='max-w-[600px]'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add a Medicine</ModalHeader>
              <ModalBody>
                <section>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <section className="flex justify-between space-x-4">
                        <div className='w-[50%]'>
                        <Input {...register("name", { required: true })} type="text" variant={"bordered"} label="Medicine Name" placeholder="Enter medicine name" />
                        {errors.name && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                        <div className='w-[50%]'>
                        <Input {...register("genericName", { required: true })}  type="text" variant={'bordered'} label="Medicine Generic Name" placeholder="Enter generic name" />
                        {errors.genericName && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                        </section>
                        <div>
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
                        </div>
                       <section className="flex justify-between space-x-4">
                       <div className='w-[50%]'> 
                        <Input  {...register("price", { required: true })} type="number" variant={"bordered"} label="Per Unit Price" placeholder="Enter price" />
                        {errors.price && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                        <div className='w-[50%]'>
                        <Input {...register("percentage", { required: true })} type="number" defaultValue={0} variant={"bordered"} label="Discount Percentage" placeholder="Enter percentage" />
                        {errors.percentage && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                       </section>
                       <section className='grid grid-cols-3 space-x-3'>
                       <div>
                        <Select 
                        {...register("category", { required: true })}
                           variant={'bordered'}
                           label="Category" 
                           className="max-w-xs" 
                         >
                           {categories.map((category) => (
                             <SelectItem key={category}>
                               {category}
                             </SelectItem>
                           ))}
                        </Select>
                        {errors.category && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                        <div>
                        <Select 
                        {...register("company", { required: true })}
                           variant={'bordered'}
                           label="Company" 
                           className="max-w-xs" 
                         >
                           {companies.map((company) => (
                             <SelectItem key={company}>
                               {company}
                             </SelectItem>
                           ))}
                        </Select>
                        {errors.company && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                        <div>
                        <Select 
                        {...register("massUnit", { required: true })}
                           variant={'bordered'}
                           label="Mass Unit" 
                           className="max-w-xs" 
                         >
                           {itemMassUnit.map((item) => (
                             <SelectItem key={item}>
                               {item}
                             </SelectItem>
                           ))}
                        </Select>
                        {errors.massUnit && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                       </section>
                       <div>
                        <input {...register("photo", { required: true })} type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs file:bg-emerald-600 file:border-none file:shadow-lg file:shadow-green-500" />
                        {errors.photo && <span className='text-red-600 p-2'>This field is required</span>}
                        </div>
                        <div className='flex justify-end space-x-4'>
                        <Button variant='shadow' className='font-bold' color="danger" onPress={() => {onClose()
                          reset()
                        }}>
                  Close
                </Button>
                <Button type='submit' className='bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold' variant="shadow" color="primary" >
                {loading ? <ImSpinner2 size={20} color='white' className='animate-spin mx-auto' /> : "Add"}
                </Button>
                        </div>
                    </form>
                </section>
              </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
                </Modal>
                </div>
                <div className='shadow-lg shadow-green-500 rounded-[12px]'>
                <Table 
        color={'success'}
        selectionMode="single" 
        defaultSelectedKeys={["2"]} 
        aria-label="User Added medicine collection table"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Generic Name</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Company</TableColumn>
          <TableColumn>Discount</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Posted On</TableColumn>
        </TableHeader>
        <TableBody>
          {
            medicines.map((medicine) => (
              <TableRow key={medicine._id}>
                <TableCell className="font-semibold">{medicine.name}</TableCell>
                <TableCell className="font-semibold">{medicine.genericName}</TableCell>
                <TableCell className="font-semibold">{medicine.category}</TableCell>
                <TableCell className="font-semibold">{medicine.company}</TableCell>
                <TableCell className="font-semibold">{medicine.percentage}%</TableCell>
                <TableCell className="font-semibold">${medicine.price}</TableCell>
                <TableCell className="font-semibold">{format(new Date(medicine.postedOn), "dd/MM/yyyy")}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
                </div>
            </section>
        </>
    );
};

export default ManageMedicine;