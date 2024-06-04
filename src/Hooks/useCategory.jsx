import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure"

const useCategory = () => {

    const axiosSecure = useAxiosSecure()

    const {data = [], refetch} = useQuery({
        queryKey:['categories'],
        queryFn: async () => {
          const {data} = await axiosSecure.get('/category')
          console.log(data)
          return data
        }
      });
      return {categories: data, refetch}
};

export default useCategory;