import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { axiosSecure } from '../../Hooks/useAxiosSecure';

const ManageUser = () => {

    const {data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const {data} = await axiosSecure.get('/users')
            return data
        }
    })

    return (
        <div className='p-[4%]'>
            manage user {users.length}
        </div>
    );
};

export default ManageUser;