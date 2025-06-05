import { useAuth } from "../context/AuthContext.jsx";
import { useEmployeeData } from "../context/EmployeeDataContext.jsx";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login, fetchData } = useAuth();
  const navigate = useNavigate();

  const {
    updateEducationData,
    updatePersonalData,
    updateFamilyData,
    updateAddressData,
    updateWorkData,
  } = useEmployeeData();

  const [formData, setFormData] = useState({
    sapId: "",
    password: "",
  });

  // const [result, setResult] =useState(null);
  // const [error, setError] = useState("")
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/login`, formData);
      const { token, user } = res.data;
      console.log("🚀 ~ handleSubmit ~ token:", token);
      console.log("🚀 ~ handleSubmit ~ res.data:", res.data)
      console.log("🚀 ~ handleSubmit ~ user:", user);

      login(token, user);
      if (token) {
        toast.success(res?.data?.msg || "Login successful!");
        toast.success("Getting employee's data...");

        const [personal, education,work, family, address ] = await Promise.all([
          axios.get(`${apiUrl}/personalDetails`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${apiUrl}/educationDetails`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          // axios.get(`${apiUrl}/familyDetails`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }),
          // axios.get(`${apiUrl}/addressDetails`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }),
          axios.get(`${apiUrl}/workDetails`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        console.log(work)

        updatePersonalData(personal.data);
        updateEducationData(education.data);
        updateWorkData(work.data);
        navigate("/form");
        // updateFamilyData(family.data);
        // updateAddressData(address.data);


        // load existing employee's data
        // const result = await axios.get(`${apiUrl}/personalDetails`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // // console.log("🚀 ~ handleSubmit ~ result:", result)
        // // fetchData(result?.data);
        // const personalData = result?.data;

        // const eduResult = await axios.get(`${apiUrl}/educationDetails`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // const educationData = eduResult?.data;

        // const combineData = {...personalData, educationData}

        // fetchData(combineData);
        toast.success("Fetched Data!");
      }
      

      // const successMsg = res?.data?.msg || "Login successful!"
      // setResult(successMsg);
      // You can save user info or token here, e.g. localStorage
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error(error?.response?.data?.msg || "Login failed.");
      // const errorMsg = error?.response?.data?.msg || "Login failed."
      // setError(errorMsg);
    }
  };

  return (
    <div className="flex border rounded-2xl flex-col justify-center items-center text-white">
      <div className="m-5">
        <h2 className="text-3xl">Login</h2>
      </div>
      <div className="mt-2 ">
        <form onSubmit={handleSubmit}>
          <label className="text-xl">SAP ID</label>
          <input
            type="text"
            name="sapId"
            placeholder="Enter SAP ID"
            value={formData.sapId}
            onChange={handleChange}
            required
            className="p-2 ml-8 mb-5 border rounded-md"
          />
          <br />

          <label className="text-xl">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border rounded-md ml-2 mb-5"
          />
          <br />

          <button
            type="submit"
            className="m-2 border border-black rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-white cursor-pointer ml-2 "
          >
            Login
          </button>

          <span className="ml-23 hover:text-blue-500">
            <Link to={"/register"}>Register Yourself</Link>
          </span>
        </form>
      </div>
      {/* {error && <p >{error}</p>} */}
    </div>
  );
};

export default Login;
