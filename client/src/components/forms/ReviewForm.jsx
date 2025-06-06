import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { normalizeUserData } from "../../utils";


const shouldHideField = (key) => {
  const lowerKey = key.toLowerCase();

  // Always show these IDs
  const allowList = ["sapid",  "adhaarid"];

  return (
    key === "_id" ||
    key === "__v" ||
    lowerKey === "employeeid" ||
    lowerKey === "entry" ||
    (lowerKey.endsWith("id") && !allowList.includes(lowerKey))
  );
};





// Format values smartly
const formatValue = (value) => {
  if(typeof value === "boolean"){
    return value? "Yes" : "No";
  }

  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return String(value);
};

// Render each value intelligently
const renderValue = (value) => {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        {value.map((item, idx) => (
          <div key={idx} className="p-2 border rounded bg-gray-50">
            <div className="font-semibold mb-1 text-gray-700">
              {/* Entry {idx + 1} */}
            </div>
            {typeof item === "object" && item !== null ? (
              <ul className="list-none ml-2 space-y-1">
                {Object.entries(item).map(
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

// Single Section
const Section = ({ title, data, fieldOrder = [] }) => (
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
);

// Review Form
const ReviewForm = ({ onBack, onSubmit, token }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios(`${apiUrl}/user/form-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // 🧠 Preprocess the data before storing
      const normalized = normalizeUserData(response.data);
        console.log("🚀 ~ fetchUserData ~ normalized:", normalized)
        setUserData(normalized); // ✅ Set fetched data
      } catch (error) {
        console.error("Failed to load review data:", error.message);
      }
    };

    fetchUserData(); // ✅ Load on mount
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
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Preview Application
      </h2>

      <div className="space-y-6">
        <Section title="Personal Details" data={userData.personalDetails}
        fieldOrder={[
          "title",
          "firstName",
          "lastName",
          "sapId",
          "gender",
          "dateOfBirth",
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
          "personWithDisability",
          "motherTongue",
          "hindiKnowledge",
          "canReadHindi",
          "canWriteHindi",
          "canSpeakHindi",

        ]}
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
