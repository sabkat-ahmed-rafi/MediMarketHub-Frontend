import { Navigate, useLocation } from 'react-router-dom'
import { ImSpinner2 } from "react-icons/im";
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <ImSpinner2 size={30} color='green' className='flex flex-col justify-center items-center animate-spin' />
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
