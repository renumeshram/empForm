import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const familyTypes = [
  "Spouse",
  "Child",
  "Father",
  "Father-in-law",
  "Mother",
  "Mother-in-law",
];

const titlesByType = {
  Spouse: ["Shri", "Smt."],
  Child: ["Mt.", "Ms."],
  Father: ["Shri"],
  "Father-in-law": ["Shri"],
  Mother: ["Smt."],
  "Mother-in-law": ["Smt."],
};

const FamilyDetailsForm = ({ onNext, defaultValues = [] }) => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      familyMembers: defaultValues.length ? defaultValues : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  const onSubmit = (data) => {
    onNext(data.familyMembers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-bold">Family Details</h2>

      <button
        type="button"
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={() =>
          append({
            type: "",
            title: "",
            name: "",
            surname: "",
            aadhar: "",
            bloodGroup: "",
            dob: "",
            cityOfBirth: "",
            status: "",
            employmentDetails: "",
            gender: "",
          })
        }
      >
        + Add Family Member
      </button>

      {fields.map((member, index) => {
        const type = watch(`familyMembers[${index}].type`);
        const titles = titlesByType[type] || [];

        return (
          <div key={member.id} className="border p-4 rounded shadow bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Family Member Type</label>
                <select {...register(`familyMembers[${index}].type`)}>
                  <option value="">Select</option>
                  {familyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Title</label>
                <select {...register(`familyMembers[${index}].title`)}>
                  <option value="">Select</option>
                  {titles.map((title) => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>

              <input
                placeholder="Name"
                {...register(`familyMembers[${index}].name`)}
              />
              <input
                placeholder="Surname"
                {...register(`familyMembers[${index}].surname`)}
              />
              <input
                placeholder="Aadhar Number"
                {...register(`familyMembers[${index}].aadharNumber`)}
              />
              <input
                placeholder="Blood Group"
                {...register(`familyMembers[${index}].bloodGroup`)}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                {...register(`familyMembers[${index}].dob`)}
              />
              <input
                placeholder="City of Birth"
                {...register(`familyMembers[${index}].cityOfBirth`)}
              />

              {/* Conditional Fields */}
              {type === "Spouse" && (
                <>
                  <div>
                    <label>Spouse Status</label>
                    <select {...register(`familyMembers[${index}].employmentStatus`)}>
                      <option value="">Select</option>
                      <option value="Working">Working</option>
                      <option value="Not-Working">Not-Working</option>
                    </select>
                  </div>

                  {watch(`familyMembers[${index}].employmentStatus`) === "Working" && (
                    <input
                      placeholder="Spouse Employment Details"
                      {...register(`familyMembers[${index}].employmentDetails`)}
                    />
                  )}
                </>
              )}

              {type === "Child" && (
                <div>
                  <label>Gender</label>
                  <select {...register(`familyMembers[${index}].gender`)}>
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
