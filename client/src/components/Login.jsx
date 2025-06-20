import { useAuth } from "../context/AuthContext.jsx";
import { useEmployeeData } from "../context/EmployeeDataContext.jsx";
import React, { useRef, useState } from "react";
// import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/axiosInstance.js"; // Import your axios instance
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!?*&])[a-zA-Z\d@#$%!?*&]{8,}$/;
const schema = yup.object().shape({
  // email: yup
  //   .string()
  //   .required("Email is required")
  //   .matches(
  //     /^[a-zA-Z0-9._%+-]+@nmdc\.co\.in$/,
  //     "Email ID must be a valid NMDC mail Id."
  //   ),
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
  // cpassword: yup
  //   .string()
  //   .required("Confirm password is required")
  //   .oneOf([yup.ref("password")], "Passwords must match"),
});

const Login = () => {
  const { login, fetchData, sessionExpired, setSessionExpired } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema)
  })

  const {
    updateEducationData,
    updatePersonalData,
    updateFamilyData,
    updateAddressData,
    updateWorkData,
  } = useEmployeeData();

  // const [formData, setFormData] = useState({
  //   sapId: "",
  //   password: "",
  // });

  // const [result, setResult] =useState(null);
  // const [error, setError] = useState("")
  // const apiUrl = import.meta.env.VITE_API_URL;


  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const onSubmit = async (data) => {
    // console.log("🚀 ~ onSubmit ~ data:", data)
    
    try {
      const res = await api.post(`/login`, data);
      const { token, user } = res.data;
      console.log("🚀 ~ onSubmit ~ token:", token);
      console.log("🚀 ~ onSubmit ~ res.data:", res.data);
      console.log("🚀 ~ onSubmit ~ user:", user);

      login(token, user);
      if (token) {
        toast.success(res?.data?.msg || "Login successful!");
        toast.success("Getting employee's data...");

        const [personal, education, work, family, address] = await Promise.all([
          api.get(`/personalDetails`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get(`/educationDetails`, {
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
          api.get(`/workDetails`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        console.log(work);

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
        // // console.log("🚀 ~ onSubmit ~ result:", result)
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
      console.log("🚀 ~ onSubmit ~ error:", error);
      toast.error(error?.response?.data?.msg || "Login failed.");
      // const errorMsg = error?.response?.data?.msg || "Login failed."
      // setError(errorMsg);
    }
  };

  const hasShownToast = useRef(false);

  React.useEffect(() => {
    // Reset sessionExpired when the user starts typing or loads the login page
    const reason = location.state?.reason;

    if (!hasShownToast.current && reason) {
      if (reason === "NO_TOKEN") {
        toast.warn("Please login to continue.", {
          toastId: "no token-warning",
        });
      }

      if (reason === "ACCESS_DENIED") {
        toast.error("Unauthorized Access...", {
          toastId: "access-denied",
        });
      }

      // if(reason === "TOKEN_EXPIRED"){
      //   toast.error("Your session expired. Please login again.", {toastId: "token-expired-error"});
      // }
    }

    hasShownToast.current = true; //Prevent future toasts

    if (sessionExpired) {
      setSessionExpired(false);
    }

    if (reason) window.history.replaceState({}, document.title);
    // eslint-disable-next-line
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-900 py-20 justify-center items-center">
      <div className="flex border rounded-2xl flex-col justify-center items-center text-white">
        {sessionExpired && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            Session Expired. Please login again.
          </div>
        )}
        <div className="m-5">
          <h2 className="text-3xl">Login</h2>
        </div>
        <div className="mt-2 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-xl">SAP ID</label>
            <input
              type="number"
              min={10000000}
              placeholder="Enter SAP ID"
              {...register("sapId")}
              className="p-2 ml-8 mb-5 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.sapId?.message}</p>
            <br />

            <label className="text-xl">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password")}
              className="p-2 border rounded-md ml-2 mb-5"
            />
            <p className="text-red-500 text-sm w-80">{errors.password?.message}</p>
            <br />
            
            <button
              type="submit"
              className="m-2 border border-black rounded-md bg-blue-500 hover:bg-blue-600 px-3 py-2 text-white cursor-pointer ml-2"
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
    </div>
  );
};

export default Login;
