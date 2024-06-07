import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import Header from "../../Components/Header";
import { Helmet } from "react-helmet-async";

const ManageUser = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [userRole, setUserRole] = useState("");

    const [userEmail, setUserEmail] = useState('')
    
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/users");
            return data;
        },
    });
    
    const handleChangeUser = async () => {

        try{
            const { data } = await axiosSecure.patch(`/user/updateRole`, { role: userRole, userEmail })
        refetch()
        toast.success('Role updated successfully')
        setUserRole("")
        }catch(err){
            toast.error(err.message)
        }
        
    };
    const userRoles = ["admin", "seller", "user"];
    
  return (
    <>
    <Helmet>
        <title>Manage User || MediMarketHub</title>
      </Helmet>
    <Header title={'Manage User'} description={'Welcome to the Manage Users page. Here, you can view, edit, and manage all user accounts within the system. This page allows you to keep track of user roles, update user information, and ensure that each user has the appropriate permissions'} />
      <section className="shadow-lg shadow-green-500 rounded-[12px]">
        <Table
          color={"success"}
          selectionMode="single"
          defaultSelectedKeys={["2"]}
          aria-label="User collection table"
        >
          <TableHeader>
            <TableColumn>Email</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Change Role</TableColumn>
            <TableColumn>Member Since</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-semibold">{user.email}</TableCell>
                <TableCell className="font-semibold">{user.role}</TableCell>
                <TableCell className="font-semibold">
                  <Button
                    onPress={() => {
                      setUserEmail(user.email) 
                      onOpen()}}
                    className="font-semibold text-white bg-gradient-to-br from-teal-400 to-emerald-600 shadow-lg "
                  >
                    Change
                  </Button>
                  {/* Modal for changing role  */}
                  <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Change The Position 
                          </ModalHeader>
                          <ModalBody>
                            <Select
                              labelPlacement={"inside"}
                              label="Select"
                              className="max-w-xs"
                              onChange={(e) => setUserRole(e.target.value)}
                            >
                              {userRoles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </Select>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              className="font-semibold text-white"
                              color="danger"
                              onPress={onClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                                              
                                handleChangeUser()}}
                              className="font-semibold text-white"
                              color="success"
                              onPress={onClose}
                            >
                              Change
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </TableCell>
                <TableCell className="font-semibold">
                  {formatDistanceToNow(new Date(user.timestamp))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default ManageUser;
