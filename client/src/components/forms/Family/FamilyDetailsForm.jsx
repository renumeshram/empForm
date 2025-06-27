import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import {
  familyMemberTypes,
  titlesByType,
  industries,
} from "../../../constants";
import { bloodGroups } from "../../../constants";
import { useEmployeeData } from "../../../context/EmployeeDataContext";
import { saveSectionData } from "../../../services/formApi";

const FamilyDetailsForm = ({ onNext }) => {
  const { token, sessionExpired } = useAuth();

  const { familyData, updateFamilyData } = useEmployeeData();

  // Transform backend data (boolean) to form data (string)
  const transformFamilyDataForForm = (familyMembers) => {
    return (
      familyMembers?.map((member) => ({
        ...member,
        isWorking:
          member.isWorking === true
            ? "Working"
            : member.isWorking === false
            ? "Not-Working"
            : "",
      })) || []
    );
  };

  const transformFamilyDataForBackend = (familyMembers) => {
    return familyMembers.map((member) => ({
      ...member,
      isWorking:
        member.isWorking === "Working"
          ? true
          : member.isWorking === "Not-Working"
          ? false
          : null,
    }));
  };

  const methods = useForm({
    defaultValues: {
      familyMembers: transformFamilyDataForForm(
        familyData?.famData?.familyMembers
      ),
    },
  });

  const { control, handleSubmit, watch, register } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });
  // }

  // defaultValues = [] }) => {
  //   const { register, control, handleSubmit, watch } = useForm({
  //     defaultValues: {
  //       familyMembers: defaultValues.length ? defaultValues : [],
  //     },
  //   });

  //   const { sessionExpired } = useAuth(); // Assuming useAuth is imported from your AuthContext
  //   const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: "familyMembers",
  //   });

  const onSubmit = async (data) => {
    try {
      // Transform the data before sending
      const transformedFamilyMembers = transformFamilyDataForBackend(
        data.familyMembers
      );

      updateFamilyData({
        famData: { familyMembers: transformedFamilyMembers },
      });

      const success = await saveSectionData(
        "familyDetails",
        transformedFamilyMembers,
        token
      );

      if (success) {
        onNext(transformedFamilyMembers);
      }
    } catch (error) {
      console.error("Error in saving family members details", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {sessionExpired && (
        <div className="text-red-500 mb-2">
          Session expired. Please log in again.
        </div>
      )}
      <h2 className="text-xl font-bold">Family Details</h2>

      <button
        type="button"
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={() =>
          append({
            relationship: "",
            title: "",
            name: "",
            surname: "",
            aadharNumber: "",
            bloodGroup: "",
            dob: "",
            cityOfBirth: "",
            isWorking: "",
            companyType: "",
            companyName: "",
            gender: "",
          })
        }
      >
        + Add Family Member
      </button>

      {fields.map((member, index) => {
        const relationship = watch(`familyMembers[${index}].relationship`);
        const titles = titlesByType[relationship] || [];

        return (
          <div
            key={member.id}
            className="border p-4 rounded shadow bg-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Family Member Type</label>
                <select
                  {...register(`familyMembers[${index}].relationship`)}
                  className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-2"
                >
                  <option value="">Select</option>
                  {familyMemberTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Title</label>
                <select
                  {...register(`familyMembers[${index}].title`)}
                  className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-2"
                >
                  <option value="">Select</option>
                  {titles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>

              <label>First Name</label>
              <input
                placeholder="First Name"
                {...register(`familyMembers[${index}].name`)}
                className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
              />
              <label>Surname</label>
              <input
                placeholder="Surname"
                {...register(`familyMembers[${index}].surname`)}
                className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
              />
              <label>Aadhar Number</label>
              <input
                placeholder="Aadhar Number"
                {...register(`familyMembers[${index}].aadharNumber`)}
                className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
              />
              <label>Blood Group</label>
              <select
                {...register(`familyMembers[${index}].bloodGroup`)}
                className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              <label>Date of Birth</label>
              <input
                type="date"
                placeholder="Date of Birth"
                {...register(`familyMembers[${index}].dob`)}
                className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
              />
              <label>City of Birth</label>
              <input
                placeholder="City of Birth"
                {...register(`familyMembers[${index}].cityOfBirth`)}
                className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
              />

              {/* Conditional Fields */}
              {relationship === "Spouse" && (
                <>
                  <div>
                    <label>Spouse Status</label>
                    <select
                      {...register(`familyMembers[${index}].isWorking`)}
                      className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="Working">Working</option>
                      <option value="Not-Working">Not-Working</option>
                    </select>
                  </div>

                  {watch(`familyMembers[${index}].isWorking`) === "Working" && (
                    <div>
                      <label>Organization Type</label>
                      <select
                        {...register(`familyMembers[${index}].companyType`)}
                        className="w-full mb-2 p-2 border rounded"
                      >
                        <option value="">Select Industry</option>
                        {industries.map((ind, idx) => (
                          <option key={idx} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>

                      <label>Organization Name</label>
                      <input
                        placeholder="Organization Name"
                        {...register(`familyMembers[${index}].companyName`)}
                        className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-2"
                      />
                    </div>
                  )}
                </>
              )}

              {relationship === "Child" && (
                <div>
                  <label>Gender</label>
                  <select
                    {...register(`familyMembers[${index}].gender`)}
                    className="mb-2 border rounded p-2 border-black focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              )}
            </div>

            <button
              type="button"
              className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        );
      })}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Next
      </button>
    </form>
  );
};

export default FamilyDetailsForm;
