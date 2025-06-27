import React, { useEffect, useState } from "react";
import api from "../../services/axiosInstance.js"; // Import your axios instance
import {
  formatValue,
  shouldHideField,
  formatKey,
} from "../../utils/formatters";
import { useAuth } from "../../context/AuthContext";

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
  return personalFieldLabels[key] || formatKey(key);
}

// Render values (primitive, object, array) - unchanged for primitives and objects
const renderValue = (value) => {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        {value.map((item, idx) => (
          <div
            key={idx}
            className="p-2 border rounded bg-gray-50 dark:bg-gray-800"
          >
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

// Section component for rendering object data in ordered keys
const Section = ({
  title,
  data,
  fieldOrder = [],
  keyFormatter = formatKey,
}) => {
  const isSorted = fieldOrder.length > 0;
let formattedData;
  const sortedMap = [];
  if (isSorted) {
    personalFields.forEach((field) => {
      if(data && data["personalDetails"] && data["personalDetails"][0] && data["personalDetails"][0][field] !== undefined){

        sortedMap.push([field, data["personalDetails"][0][field]]);
      }

    });
    console.log("🚀 ~ formattedData ~ sortedMap:", sortedMap);

    formattedData = sortedMap.map(([key, value]) => {
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
    });
  } else {
    formattedData =Object.keys(data || {}).map(
      (key) => {
        // console.log("key:", key);
        const value = data?.[key];
        // console.log("value:", value);
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
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
      <h3 className="text-xl font-semibold text-blue-700 border-b pb-2">
        {title}
      </h3>
      <div className="space-y-3">{formattedData}</div>
    </div>
  );
};

// New ArraySection component for array of objects with key ordering
const ArraySection = ({
  title,
  data,
  fieldOrder = [],
  keyFormatter = changeDisplayMain,
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
        <h3 className="text-xl font-semibold text-blue-700 border-b pb-2">
          {title}
        </h3>
        <p className="text-gray-500 italic">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
      <h3 className="text-xl font-semibold text-blue-700 border-b pb-2">
        {title}
      </h3>
      {data.map((item, idx) => (
        <div
          key={idx}
          className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
        >
          {fieldOrder.length > 0
            ? fieldOrder.map((key) => {
                const value = item?.[key];
                if (value === undefined || shouldHideField(key)) return null;
                return (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b pb-2 last:border-b-0"
                  >
                    <div className="sm:w-48 font-medium text-gray-700">
                      {keyFormatter(key)}
                    </div>
                    <div className="text-gray-900 flex-1">
                      {renderValue(value)}
                    </div>
                  </div>
                );
              })
            : // fallback to default order if no fieldOrder
              Object.entries(item).map(([key, value]) => {
                if (shouldHideField(key) || value === undefined) return null;
                return (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b pb-2 last:border-b-0"
                  >
                    <div className="sm:w-48 font-medium text-gray-700">
                      {keyFormatter(key)}
                    </div>
                    <div className="text-gray-900 flex-1">
                      {renderValue(value)}
                    </div>
                  </div>
                );
              })}
        </div>
      ))}
    </div>
  );
};

const ReviewForm = ({ onBack, onSubmit, token, onDataReady }) => {
  const [userData, setUserData] = useState(null);
  const { sessionExpired } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api(`/user/form-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
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
  console.log("personalDetails1:", userData.personalDetails);
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {sessionExpired && (
        <div className="text-red-500 mb-2 text-center">
          Session expired. Please log in again.
        </div>
      )}
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Preview Application
      </h2>

      <div className="space-y-8">
        {/* Render personal details array with ordered keys */}
        <ArraySection
          title="Personal Details"
          data={
            Array.isArray(userData.personalDetails?.personalDetails)
              ? userData.personalDetails.personalDetails
              : []
          }
          fieldOrder={personalFields}
          keyFormatter={changeDisplayMain}
        />

        {/* Other sections with normal object data */}
        <Section
          title="Pers Details new"
          data={userData.personalDetails}
          fieldOrder={personalFields}
        />
         <Section title="Education Details" data={userData.educationDetails} />
        <Section title="Family Details" data={userData.familyDetails} />
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
