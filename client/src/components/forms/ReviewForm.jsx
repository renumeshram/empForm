import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../../services/axiosInstance.js"; // Import your axios instance
// const apiUrl = import.meta.env.VITE_API_URL;
// import { normalizeUserData } from "../../utils";
import {
  formatValue,
  shouldHideField,
  formatKey,
} from "../../utils/formatters";
import { useAuth } from "../../context/AuthContext";

// Render values (object, array, primitive)
const renderValue = (value) => {
  console.log("Rendering value:", value);
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        {value.map((item, idx) => (
          <div key={idx} className="p-2 border rounded bg-gray-50">
            {typeof item === "object" && item !== null ? (
              <ul className="list-none ml-2 space-y-1">
                {Object.entries(item).map(
                  ([k, v]) =>
                    !shouldHideField(k) && (
                      <li key={k}>
                        <span className="font-medium capitalize">
                          {changeDisplayMain(k)}:
                        </span>{" "}
                        {formatValue(v)}
                      </li>
                    )
                )}
              </ul>
            ) : (
              formatValue(item)
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <ul className="list-none space-y-1">
        {Object.entries(value).map(
          ([k, v]) =>
            !shouldHideField(k) && (
              <li key={k}>
                <span className="font-medium capitalize">
                  {k.replace(/([A-Z])/g, " $1")}:
                </span>{" "}
                {formatValue(v)}
              </li>
            )
        )}
      </ul>
    );
  }

  return formatValue(value);
};

// Section component for each data block
/* const Section = ({ title, data, fieldOrder = [] }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-2">
    <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
    <table className="w-full text-sm text-left text-gray-800 mt-2">
      <tbody>
        {(fieldOrder.length > 0 ? fieldOrder : Object.keys(data || {})).map(
          (key) => {
            const value = data?.[key];
            if (value === undefined || shouldHideField(key)) return null;

            return (
              <tr key={key} className="align-top border-b">
                <td className="capitalize py-2 pr-4 font-medium whitespace-nowrap">
                  {key.replace(/([A-Z])/g, " $1")}
                </td>
                <td className="py-2">{renderValue(value)}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  </div>
); */

const personalFields = [
  "title",
  "firstName",
  "lastName",
  "sapid",
  "gender",
  "dob",
  "birthplace",
  "state",
  "religion",
  "category",
  "subCategory",
  "idMark1",
  "idMark2",
  "exServiceman",
  "adhaarId",
  "mobile",
  "email",
  "pwd",
  "motherTongue",
  "hindiKnowledge",
  "langHindiRead",
  "langHindiWrite",
  "langHindiSpeak",
];
const personalFieldLabels = {
  title: "Title",
  firstName: "First Name",
  lastName: "Last Name",
  sapid: "SAP ID",
  gender: "Gender",
  dob: "Date of Birth",
  birthplace: "Birthplace",
  state: "State",
  religion: "Religion",
  category: "Category",
  subCategory: "Sub Category",
  idMark1: "ID Mark 1",
  idMark2: "ID Mark 2",
  exServiceman: "Ex-Serviceman",
  adhaarId: "Aadhaar ID",
  mobile: "Mobile",
  email: "Email",
  pwd: "Person With Disability",
  motherTongue: "Mother Tongue",
  hindiKnowledge: "Hindi Knowledge",
  langHindiRead: "Can Read Hindi",
  langHindiWrite: "Can Write Hindi",
  langHindiSpeak: "Can Speak Hindi",
};

function changeDisplayMain(key) {
  console.log("Key for label:", key, "Label:", personalFieldLabels[key]);
  return personalFieldLabels[key] || formatKey(key);
}

const Section = ({
  title,
  data,
  fieldOrder = [],
  keyFormatter = formatKey,
}) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
    <h3 className="text-xl font-semibold text-blue-700 border-b pb-2">
      {title}
    </h3>
    <div className="space-y-3">
      {(fieldOrder.length > 0 ? fieldOrder : Object.keys(data || {})).map(
        (key) => {
          const value = data?.[key];
          if (value === undefined || shouldHideField(key)) return null;

          return (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b pb-2"
            >
              <div className="sm:w-48 font-medium text-gray-700 capitalize">
                {keyFormatter(key)}
              </div>
              <div className="text-gray-900 flex-1">{renderValue(value)}</div>
            </div>
          );
        }
      )}
    </div>
  </div>
);

// Main ReviewForm component
const ReviewForm = ({ onBack, onSubmit, token, onDataReady }) => {
  const [userData, setUserData] = useState(null);
  const {sessionExpired} = useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api(`/user/form-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const normalized = normalizeUserData(response.data);
        // console.log("🚀 ~ fetchUserData ~ normalized:", normalized);

        console.log(response.data);
        setUserData(response.data);
        // Pass the fetched data to parent for submission and PDF
        if (onDataReady) {
          onDataReady(response.data);
        }
      } catch (error) {
        console.error("Failed to load review data:", error.message);
      }
    };

    fetchUserData();
  }, [token]);

  if (!userData) {
    return (
      <p className="text-center text-gray-500 py-10">
        Loading your form data...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {sessionExpired && (
        <div className="text-red-500 mb-2">
          Session expired. Please log in again.
        </div>
      )}
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Preview Application
      </h2>

      <div className="space-y-6">
        {console.log(
          "Personal Details Data:",
          Array.isArray(userData.personalDetails?.personalDetails)
            ? userData.personalDetails
            : null
        )}
        <Section
          title="Personal Details"
          data={
            Array.isArray(userData.personalDetails?.personalDetails)
              ? userData.personalDetails
              : null
          }
          // fieldOrder={personalFields}
          keyFormatter={changeDisplayMain}
        />
        <Section title="Education Details" data={userData.educationDetails} />
        <Section title="Family Details" data={userData.personalDetails} />
        <Section title="Address Details" data={userData.addressDetails} />
        <Section title="Work Experience" data={userData.workExperience} />
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Final Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
