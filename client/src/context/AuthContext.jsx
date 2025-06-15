import { createContext, use, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [empData, setEmpData] = useState(()=>{
    const stored = sessionStorage.getItem("empData");
    return stored? JSON.parse(stored): "";
  })

  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setSessionExpired(false);
    console.log("Session Expired:",sessionExpired)
  };
  // console.log("🚀 ~ login ~ token:", token)

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("empData");
    setToken(null);
    setUser(null);
    setEmpData("");
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


  const fetchData =(result) =>{
    setEmpData(result);
    sessionStorage.setItem("empData", JSON.stringify(result));
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{token,user, login, logout, isAuthenticated, fetchData, empData, sessionExpired, setSessionExpired, handleSessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
