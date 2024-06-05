import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Header from "../../Components/Header";
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
import { useQuery } from "@tanstack/react-query";
import uploadImage from "../../Authentication/Utility/uploadImage";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import CategoryTable from "./CategoryTable";
import useCategory from "../../Hooks/useCategory";

const ManageCategory = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  const handleAdd = async (data) => {
    const { categoryName, photo } = data;

    try {
      const image = await uploadImage(photo[0]);
      const categoryInfo = {categoryName, image}
      
      const {data} = await axiosSecure.post('/category', categoryInfo);
      
      if(data.insertedId) {
        toast.success("Category Added Successfully");
        reset();
        refetch();
      }
      
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const {categories, refetch} = useCategory()


  return (
    <>
      <Header
        title={"Manage Category"}
        description={
          "Welcome to the Manage Medicines section of your seller dashboard. This comprehensive feature allows you to efficiently manage your entire inventory of medicines. Here, you can add new medicines and keep track of stock levels and expiry dates"
        }
      />
      <section className="pb-12">
        <div className="pb-4">
          <Button
            onPress={onOpen}
            className="bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-semibold"
            variant="shadow"
          >
            Add a Category
          </Button>
          {/* now i have to implement the modal here  */}
          <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="max-w-[600px]">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add a Category
                  </ModalHeader>
                  <ModalBody>
                    <section>
                      <form
                        onSubmit={handleSubmit(handleAdd)}
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
                             Add
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
        </div>
        <CategoryTable categories={categories} refetch={refetch} />
      </section>
    </>
  );
};

export default ManageCategory;
