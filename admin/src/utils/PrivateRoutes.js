import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "../../src/context/AuthContext"
import { useContext } from 'react';

const PrivateRoutes = () => {

    const { user } = useContext(AuthContext);

return (
    user ? <Outlet/> : <Navigate to='/login'/>
  )
};

export default PrivateRoutes;