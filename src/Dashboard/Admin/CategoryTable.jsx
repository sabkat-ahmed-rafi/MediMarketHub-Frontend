import React, { useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
  } from "@nextui-org/react";
  import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
  } from "@nextui-org/react";
  import { useForm } from "react-hook-form";
  import toast from "react-hot-toast";
  import { ImSpinner2 } from "react-icons/im";
  import uploadImage from "../../Authentication/Utility/uploadImage";
  import { axiosSecure } from "../../Hooks/useAxiosSecure";




const CategoryTable = ({categories, refetch }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);


    const handleUpdate = async (data) => {
        setLoading(true)
    
        const { categoryName, photo} = data;
       
        try{
    
            const image = await uploadImage(photo[0])
            const updatedData = {categoryName, image}
            const {data} = await axiosSecure.put('/category', updatedData)
    
            if(data.modifiedCount) {
              toast.success("Category Updated Successfully");
              refetch();
              reset();
              setLoading(false)
            }
    
        }catch(err){
            console.log(err.message)
            toast.error(err.message)
            setLoading(false)
        }
    
       }
    
       const handleDelete = async (_id) => {
    
        setLoading(true)
        try{
          const {data} = await axiosSecure.delete(`/category/${_id}`)
          if(data.deletedCount) {
            toast.success("Category Deleted Successfully")
            refetch()
            setLoading(false)
          }
        }catch(err){
          console.log(err.message)
          toast.error(err.message)
          setLoading(false)
        }
       }
    


    return (
        <>
            <div className='shadow-lg shadow-green-500 rounded-[12px]'>
                <Table 
        color={'success'}
        selectionMode="single" 
        defaultSelectedKeys={["2"]} 
        aria-label="User Added category collection table"
      >
        <TableHeader>
          <TableColumn>Photo</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Update</TableColumn>
          <TableColumn>Delete</TableColumn>

        </TableHeader>
        <TableBody>
          {
            categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell className="font-semibold w-[10%]"><img className=" rounded-lg" src={category.image} alt="" /></TableCell>
                <TableCell className="font-semibold">{category.categoryName}</TableCell>
                <TableCell className="font-semibold"><Button
                onPress={onOpen}
                 className="bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold"
                 variant="shadow"
                >
                Update
                </Button>
                {/* update Modal  */}
                <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="max-w-[600px]">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Update This Category
                  </ModalHeader>
                  <ModalBody>
                    <section>
                      <form
                        onSubmit={handleSubmit(handleUpdate)}
                        className="space-y-4"
                      >
                        <section className="flex justify-between space-x-4">
                          <div className="w-[50%]">
                            <Input
                              {...register("categoryName", { required: true })}
                              type="text"
                              variant={"bordered"}
                              label="Category Name"
                              placeholder="Enter category name"
                            />
                            {errors.categoryName && (
                              <span className="text-red-600 p-2">
                                This field is required
                              </span>
                            )}
                          </div>
                        </section>
                        <div>
                          <input
                            {...register("photo", { required: true })}
                            type="file"
                            className="file-input file-input-bordered file-input-sm w-full max-w-xs file:bg-emerald-600 file:border-none file:shadow-lg file:shadow-green-500"
                          />
                          {errors.photo && (
                            <span className="text-red-600 p-2">
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className="flex justify-end space-x-4">
                          <Button
                            variant="shadow"
                            className="font-bold"
                            color="danger"
                            onPress={() => {
                              onClose();
                              reset();
                            }}
                          >
                            Close
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold"
                            variant="shadow"
                            color="primary"
                          >
                            {loading ? (
                              <ImSpinner2
                                size={20}
                                color="white"
                                className="animate-spin mx-auto"
                              />
                            ) : (
                              "Update"
                            )}
                          </Button>
                        </div>
                      </form>
                    </section>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
                </TableCell>
                <TableCell className="font-semibold"><Button
                color="danger"
                 className="text-white font-semibold"
                 variant="shadow"
                 onClick={() => handleDelete(category._id)}
                >
                Delete
                </Button></TableCell>

              </TableRow>
            ))
          }
        </TableBody>
                </Table>
        </div>
        </>
    );
};

export default CategoryTable;