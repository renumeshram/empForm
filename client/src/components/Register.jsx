import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";

const apiUrl = import.meta.env.VITE_API_URL

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!?*&])[a-zA-Z\d@#$%!?*&]{8,}$/;
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@nmdc\.co\.in$/,
      "Email ID must be a valid NMDC mail Id."
    ),
  sapId: yup
    .string()
    .required("SAP ID is required")
    .matches(/^[0-9]{8}$/, "Provide a valid SAP ID"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must be of minimum length 8 and contain digits, lowercase, uppercase and special characters"
    ),
  cpassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema)
  })
  // const [formData, setFormData] = useState({
  //   email: "",
  //   sapId: "",
  //   password: "",
  //   cpassword: "",
  // });
  // const [message, setMessage] = useState("");

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    if (data.password !== data.cpassword) {
      // setMessage("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/register`, data);
      // setMessage(res.data.msg || "Registration successful!");
      navigate("/");
      toast.success(res.data.msg || "Registration successful!");
      toast.success("Please Login to continue"); 
      console.log("Registration Success:"); 
    } catch (error) {
      // setMessage(error.response?.data || "Registration failed.");
      toast.error(error.response?.data?.msg || "Registration failed.");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-xl">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="p-2 ml-36 mb-5 border rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
          <br />

          <label className="text-xl">SAP ID</label>
          <input
            type="number"
            placeholder="SAP ID"
            {...register("sapId")}
            className="p-2 ml-33 mb-5 border rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.sapId?.message}</p>
          <br />

          <label className="text-xl">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="p-2 ml-27 mb-5 border rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
          <br />

          <label className="text-xl">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("cpassword")}
            className="p-2 ml-8 mb-5 border rounded-md"
          />
          <p className="text-red-500 text-sm">{errors.cpassword?.message}</p>
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
