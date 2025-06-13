import {Navigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


const PrivateRoute = ({children}) =>{
    const {isAuthenticated } = useAuth();

    // if(adminRequired){
    //     const adminToken = localStorage.getItem('adminToken');
    //     const adminUser = localStorage.getItem('adminUser');
    //     if(!adminToken || !adminUser){
    //         return <Navigate to="/admin/login" replace />;
    //     }

    //     return children;
        
    // }


    return isAuthenticated? children : <Navigate to="/" />;
}

export default PrivateRoute;