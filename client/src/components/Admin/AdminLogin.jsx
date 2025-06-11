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
        localStorage.setItem("adminUser", JSON, stringify(data.user));

        toast.success("Admin login successful!");

        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        toast.error(data?.msg || "Admin loin failed");
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-600 mt-2">Access Admin Dashboard</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User ID
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter Admin User ID"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Admin Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
          >
            {isLoading ? "Logging in..." : "Login as Admin"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleBackToEmployee}
            className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm underline"
          >
            Back to Employee Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
