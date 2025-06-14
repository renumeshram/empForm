import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    sapId: "",
    password: "",
    cpassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      // setMessage("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/register`, formData);
      // setMessage(res.data.msg || "Registration successful!");
      navigate("/");
      toast.success(res.data.msg || "Registration successful!");
      toast.success("Please Login to continue"); 
      console.log("Registration Success:"); 
    } catch (error) {
      // setMessage(error.response?.data || "Registration failed.");
      toast.error(error.response?.data || "Registration failed.");
      console.error("Registration error:", error); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 justify-center items-center">
    <div className="flex flex-col justify-center items-center text-white border rounded-2xl">
      <div className="m-5">
        <h2 className="text-3xl">Register</h2>
      </div>

      <div className="mt-2 ">
        <form onSubmit={handleSubmit}>
          <label className="text-xl">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 ml-36 mb-5 border rounded-md"
          />
          <br />
          <label className="text-xl">SAP ID</label>
          <input
            type="text"
            name="sapId"
            placeholder="SAP ID"
            value={formData.sapId}
            onChange={handleChange}
            required
            className="p-2 ml-33 mb-5 border rounded-md"
          />
          <br />

          <label className="text-xl">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 ml-27 mb-5 border rounded-md"
          />
          <br />

          <label className="text-xl">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            value={formData.cpassword}
            onChange={handleChange}
            required
            className="p-2 ml-8 mb-5 border rounded-md"
          />
          <br />

          <button
            type="submit"
            className="m-2 border border-black rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-white cursor-pointer ml-2 "
          >
            Register
          </button>

          <span className="ml-25 cursor-pointer hover:text-blue-500">

          <Link to={"/"}>Already Registered???</Link>
          </span>
        </form>
      </div>
      {/* {message && <p>{message}</p>} */}
    </div>

    </div>
  );
};

export default Register;
