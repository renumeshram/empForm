import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { EmployeeDataProvider } from "./context/EmployeeDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EmployeeDataProvider>
          <App />
        </EmployeeDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
