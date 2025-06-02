import React from "react";

const ReviewForm = ({ data, onBack, onSubmit }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center text-blue-700">Review Your Details</h2>

      <div className="space-y-3 bg-gray-50 p-4 rounded shadow">
        <h3 className="font-semibold text-lg">Personal Details</h3>
        <pre className="text-sm text-gray-800">{JSON.stringify(data.personalDetails, null, 2)}</pre>

        <h3 className="font-semibold text-lg">Education Details</h3>
        <pre className="text-sm text-gray-800">{JSON.stringify(data.educationDetails, null, 2)}</pre>

        <h3 className="font-semibold text-lg">Family Details</h3>
        <pre className="text-sm text-gray-800">{JSON.stringify(data.familyDetails, null, 2)}</pre>

        <h3 className="font-semibold text-lg">Address Details</h3>
        <pre className="text-sm text-gray-800">{JSON.stringify(data.addressDetails, null, 2)}</pre>

        <h3 className="font-semibold text-lg">Work Experience</h3>
        <pre className="text-sm text-gray-800">{JSON.stringify(data.workExperience, null, 2)}</pre>
      </div>

      <div className="flex justify-between">
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
