import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import api from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    sapId: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { logout, token } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.sapId === "" ||
      formData.currentPassword === "" ||
      formData.newPassword === "" ||
      formData.confirmNewPassword === ""
    ) {
      toast.error("All fields are required!");
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const response = await api.put(
        `/changePassword`,
        {
          sapId: formData.sapId,
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Password changed successfully!");
      toast.success("Please Login again");
      logout(); // Clear the token and user data
      setFormData({
        sapId: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }); // Reset form data
      navigate("/"); // Redirect to login or home page after successful change
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 justify-center items-center">
    <div className="flex border rounded-2xl flex-col justify-center items-center text-white">
      <div className="m-5">
        <h2 className="text-3xl">Change Password</h2>
      </div>
      <div className="mt-2">
        <form onSubmit={handleSubmit}>
          <label>SAP ID</label>
          <input
            type="text"
            name="sapId"
            placeholder="Enter SAP ID"
            value={formData.sapId}
            onChange={handleChange}
            required
            className="p-2 ml-25.5 mb-5 border rounded-md"
          />
          <br />
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            placeholder="Enter Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="p-2 ml-7 mb-5 border rounded-md"
          />
          <br />
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="p-2 ml-13 mb-5 border rounded-md"
          />
          <br />
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
            className="p-2 ml-8 mb-5 border rounded-md"
          />
          <br />
          <button
            type="submit"
            className="bg-blue-600 text-white mb-5 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;
// This component allows users to change their password.
