import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/axiosInstance";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("viewById");
  const [isLoading, setIsLoading] = useState(false);
  const [empId, setEmpId] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({
    personal: null,
    education: null,
    family: null,
    address: null,
    workExperience: null
  });

  // Get admin user info from localStorage
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully!");
    navigate("/admin/login");
  };

  // Fetch single employee data by ID
  const fetchEmployeeById = async () => {
    if (!empId.trim()) {
      toast.error("Please enter an Employee ID");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.get(`/admin/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setEmployeeData(response.data);
        toast.success("Employee data fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      toast.error(error.response?.data?.message || "Failed to fetch employee data");
      setEmployeeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all employees data
  const fetchAllEmployees = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.get("/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        // Sort by SAP ID
        const sortedEmployees = response.data.sort((a, b) => {
          return (a.sapId || "").localeCompare(b.sapId || "");
        });
        setAllEmployees(sortedEmployees);
        toast.success(`Fetched ${sortedEmployees.length} employee records`);
      }
    } catch (error) {
      console.error("Error fetching all employees:", error);
      toast.error(error.response?.data?.message || "Failed to fetch employee data");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch detailed employee information from all collections
  const fetchEmployeeDetails = async (employeeId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const sections = ['personal', 'education', 'family', 'address', 'workExperience'];
      
      const detailsPromises = sections.map(async (section) => {
        try {
          const response = await api.get(`/admin/employee/${employeeId}/${section}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { section, data: response.data };
        } catch (error) {
          console.error(`Error fetching ${section}:`, error);
          return { section, data: null };
        }
      });

      const results = await Promise.all(detailsPromises);
      const details = {};
      results.forEach(({ section, data }) => {
        details[section] = data;
      });

      setEmployeeDetails(details);
      toast.success("Employee details fetched successfully!");
    } catch (error) {
      console.error("Error fetching employee details:", error);
      toast.error("Failed to fetch employee details");
    } finally {
      setIsLoading(false);
    }
  };

  // Load all employees when tab switches to "viewAll"
  useEffect(() => {
    if (activeTab === "viewAll") {
      fetchAllEmployees();
    }
  }, [activeTab]);

  // Filter employees based on search term
  const filteredEmployees = allEmployees.filter(emp =>
    (emp.sapId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.empId || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view details button click
  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    fetchEmployeeDetails(employee.empId || employee.sapId);
  };

  // Close details modal
  const closeDetailsModal = () => {
    setSelectedEmployee(null);
    setEmployeeDetails({
      personal: null,
      education: null,
      family: null,
      address: null,
      workExperience: null
    });
  };

  // Employee Preview Component
  const EmployeePreview = ({ data }) => {
    if (!data) return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Employee Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
            <div className="space-y-2">
              <p><span className="font-medium">Employee ID:</span> {data.empId}</p>
              <p><span className="font-medium">SAP ID:</span> {data.sapId}</p>
              <p><span className="font-medium">Name:</span> {data.name}</p>
              <p><span className="font-medium">Email:</span> {data.email}</p>
              <p><span className="font-medium">Phone:</span> {data.phone}</p>
              <p><span className="font-medium">Department:</span> {data.department}</p>
              <p><span className="font-medium">Designation:</span> {data.designation}</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h4>
            <div className="space-y-2">
              <p><span className="font-medium">Date of Birth:</span> {data.dateOfBirth}</p>
              <p><span className="font-medium">Joining Date:</span> {data.joiningDate}</p>
              <p><span className="font-medium">Manager:</span> {data.manager}</p>
              <p><span className="font-medium">Location:</span> {data.location}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  data.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {data.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Form Data (if exists) */}
        {data.formData && (
          <div className="mt-6 space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Form Submissions</h4>
            <div className="bg-gray-50 p-4 rounded">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(data.formData, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>Last Updated: {new Date(data.updatedAt || data.createdAt).toLocaleString()}</p>
        </div>
      </div>
    );
  };

  // Detailed Employee Modal Component
  const EmployeeDetailsModal = ({ employee, details, onClose }) => {
    if (!employee) return null;

    const renderSection = (title, data) => {
      if (!data) {
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
            <p className="text-gray-500">No data available</p>
          </div>
        );
      }

      return (
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            ))
          ) : (
            <div className="space-y-2">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-medium text-gray-600 w-1/3">{key}:</span>
                  <span className="text-gray-900 w-2/3">{
                    typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
                  }</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Employee Details - {employee.name} ({employee.sapId})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Basic Information</h3>
                <div className="space-y-1">
                  <p><span className="font-medium">SAP ID:</span> {employee.sapId}</p>
                  <p><span className="font-medium">Employee ID:</span> {employee.empId}</p>
                  <p><span className="font-medium">Name:</span> {employee.name}</p>
                  <p><span className="font-medium">Email:</span> {employee.email}</p>
                  <p><span className="font-medium">Department:</span> {employee.department}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Status</h3>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {employee.status}
                </span>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 gap-6">
              {renderSection("Personal Details", details.personal)}
              {renderSection("Education", details.education)}
              {renderSection("Family Information", details.family)}
              {renderSection("Address", details.address)}
              {renderSection("Work Experience", details.workExperience)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {adminUser.name || adminUser.userId || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("viewById")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "viewById"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              View Employee by ID
            </button>
            <button
              onClick={() => setActiveTab("viewAll")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "viewAll"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              View All Employees
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "viewById" && (
            <div className="space-y-6">
              {/* Search Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Search Employee by ID
                </h2>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    placeholder="Enter Employee ID or SAP ID"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={fetchEmployeeById}
                    disabled={isLoading}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isLoading ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>

              {/* Employee Preview */}
              {employeeData && <EmployeePreview data={employeeData} />}
            </div>
          )}

          {activeTab === "viewAll" && (
            <div className="space-y-6">
              {/* Search Filter */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    All Employee Records ({filteredEmployees.length})
                  </h2>
                  <button
                    onClick={fetchAllEmployees}
                    disabled={isLoading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by SAP ID, Name, or Employee ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Employee Table */}
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SAP ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEmployees.map((employee, index) => (
                        <tr key={employee._id || index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {employee.sapId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.empId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              employee.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {employee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleViewDetails(employee)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                // Add edit functionality here
                                toast.info("Edit functionality to be implemented");
                              }}
                              className="text-yellow-600 hover:text-yellow-900 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                // Add delete functionality here
                                if (window.confirm("Are you sure you want to delete this employee?")) {
                                  toast.info("Delete functionality to be implemented");
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredEmployees.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No employees found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          details={employeeDetails}
          onClose={closeDetailsModal}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <span className="text-gray-700">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;