import {Navigate, useLocation} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


const PrivateRoute = ({children}) =>{
    const {isAuthenticated, sessionExpired, loggedOut } = useAuth();
    const location = useLocation();

    // if(adminRequired){
    //     const adminToken = localStorage.getItem('adminToken');
    //     const adminUser = localStorage.getItem('adminUser');
    //     if(!adminToken || !adminUser){
    //         return <Navigate to="/admin/login" replace />;
    //     }

    //     return children;
        
    // }


    return isAuthenticated || sessionExpired  || loggedOut ?( children) : (
    <Navigate
     to="/" 
     replace
     state={{ from: location, reason: "NO_TOKEN" }}
     
    />
);
}

export default PrivateRoute;