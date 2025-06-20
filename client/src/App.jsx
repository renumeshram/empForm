import React from "react";
import MultiStepForm from "./components/MultiStepForm";
import Register from "./components/Register";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";
import api from "./services/axiosInstance";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { handleSessionExpired } = useAuth();
  React.useEffect(() => {
  const interceptor = api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if (handleSessionExpired) handleSessionExpired();
      }
      return Promise.reject(error);
    }
  );
  return () => api.interceptors.response.eject(interceptor);
}, [handleSessionExpired]);

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <MultiStepForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/changePassword"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
        path="/admin/login"
        element= {<AdminLogin/>}
        />
      

      <Route
        path="/admin/dashboard"
        element= {
          <PrivateRoute adminRequired ={ true}>
            <AdminDashboard/>
          </PrivateRoute>
        }
        />
      </Routes>
      <Footer 
        companyName="NMDC Limited Kirandul Complex"
        developerName="C & IT Department"
        version="2.1.0"
        // customLinks={[
        //   { label: 'Privacy', url: '/privacy', external: false },
        //   { label: 'Support', url: '/support', external: false }
        // ]}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
