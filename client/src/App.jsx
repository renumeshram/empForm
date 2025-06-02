import React from "react";
import MultiStepForm from "./components/MultiStepForm";
import Register from "./components/register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 py-20 justify-center items-center">
      <Routes>

      <Route path="/" element={ <Login />} />
      <Route path="/register" element={ <Register />} />
      <Route
        path="/form"
        element={
          <PrivateRoute>
            <MultiStepForm />
          </PrivateRoute>
        }
      />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
