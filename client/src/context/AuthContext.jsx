import { createContext, use, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  
  const storedUser = sessionStorage.getItem("user");
  let initialUser = null;
  if (storedUser && storedUser !== "undefined" && storedUser !== "null" && storedUser !== "") {
    try {
      initialUser = JSON.parse(storedUser);
    } catch (e) {
      initialUser = null;
    }
  }
  const [user, setUser] = useState(initialUser);
 
  // const [empData, setEmpData] = useState(()=>{
  //   const stored = sessionStorage.getItem("empData");
  //   return stored? JSON.parse(stored): "";
  // })

  const [sessionExpired, setSessionExpired] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  const login = (token, user) => {
    localStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setSessionExpired(false);
    console.log("Session Expired:",sessionExpired)
  };
  // console.log("🚀 ~ login ~ token:", token)

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // sessionStorage.removeItem("empData");
    setToken(null);
    setUser(null);
    // setEmpData("");
    if(!sessionExpired){
      setLoggedOut(true);
      import('react-toastify').then(({ toast }) => {
          toast.success('Successfully logged out.', {toastId: "logout-success"});
        });
    }
  };

  const handleSessionExpired = () => {
    setSessionExpired(true);
    logout();
    // Show toast notification for session expiry
    if (typeof window !== 'undefined') {
      // Dynamically import to avoid circular dependency
      import('react-toastify').then(({ toast }) => {
        toast.error('Session expired. Please login again.');
      });
    }
    navigate("/", { replace: true , state:{ reason: "TOKEN_EXPIRED" } });
  };


  // const fetchData =(result) =>{
  //   setEmpData(result);
  //   sessionStorage.setItem("empData", JSON.stringify(result));
  // }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{token,user, login, logout,loggedOut, isAuthenticated,
    //  fetchData, empData, sessionExpired, 
     setSessionExpired, handleSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
