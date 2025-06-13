import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/admin/login", {
        userId: formData.userId,
        password: formData.password,
      });

      const { data } = response;

      if (data && data.token) {
        //store admin token and user info
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));

        toast.success("Admin login successful!");

        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        toast.error(data?.msg || "Admin login failed");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error(error?.response?.data?.msg || "Admin login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmployee = () => {
    // Navigate back to main login page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 justify-center items-center">
    <div className="flex border rounded-2xl flex-col justify-center items-center text-white">
      <div className="m-5">
        <h2 className="text-3xl">Admin Login</h2>
        <p className="mt-2 text-green-500">Access the Admin Dashboard</p>
      </div>
      <div className="mt-2 ">
        <form onSubmit={handleSubmit}>
          <label className="text-xl">User ID</label>
          <input
            type="text"
            name="userId"
            placeholder="Enter your user ID"
            value={formData.userId}
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
            className="m-2 border border-black rounded-md bg-green-500 hover:bg-green-600 w-full py-2 text-white cursor-pointer ml-2"
          >
            Login
          </button>

          {/* <span className=" hover:text-blue-500"> */}
            <button onClick={handleBackToEmployee} className=" hover: text-blue-500 w-full mt-5 cursor-pointer">Back to Employee Login</button>
          {/* </span> */}
        </form>
      </div>
      {/* {error && <p >{error}</p>} */}
    </div>
    </div>
  );
};

export default AdminLogin;
