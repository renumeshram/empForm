// client/src/services/axiosInstance.js
import axios from "axios";
// import { useAuth } from "../context/AuthContext"; // You may need to implement this utility

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


// Do NOT use hooks here! Interceptor should be set up in a React component (e.g., App.jsx) where you have access to context.

export default api;