import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const industryOptions = [
  "Autonomous Bodies",
  "Central govt.",
  "Indian Armed Forces",
  "NGO",
  "Private",
  "PSU central",
  "PSU state",
  "State govt",
];

const WorkExperienceForm = ({ onNext }) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      employers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employers",
  });

  const onSubmit = (data) => {
    onNext(data.employers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="font-semibold text-lg mb-2">
        Add your previous employer details (up to 5)
      </p>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded p-4 mb-4 space-y-3">
          <h4 className="font-semibold text-md mb-2">Employer {index + 1}</h4>

          <input
            {...register(`employers.${index}.employerName`, { required: true })}
            placeholder="Employer's Name"
            className="input"
          />
          <input
            {...register(`employers.${index}.city`, { required: true })}
            placeholder="City"
            className="input"
          />
          <label className="block">
            Start Date
            <input
              type="date"
              {...register(`employers.${index}.startDate`, { required: true })}
              className="input"
            />
          </label>
          <label className="block">
            Relieving Date
            <input
              type="date"
              {...register(`employers.${index}.relievingDate`, { required: true })}
              className="input"
            />
          </label>
          <select
            {...register(`employers.${index}.industry`, { required: true })}
            className="input"
          >
            <option value="">Select Industry</option>
            {industryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <input
            {...register(`employers.${index}.designation`, { required: true })}
            placeholder="Designation"
            className="input"
          />
          <input
            {...register(`employers.${index}.scaleOnLeaving`)}
            placeholder="Scale on Leaving"
            className="input"
          />
          <input
            {...register(`employers.${index}.reasonForLeaving`)}
            placeholder="Reason for Leaving"
            className="input"
          />
          <input
            type="number"
            {...register(`employers.${index}.grossSalary`)}
            placeholder="Gross Salary"
            className="input"
          />
          <input
            {...register(`employers.${index}.greenfield`)}
            placeholder="Greenfield"
            className="input"
          />
          <input
            type="number"
            {...register(`employers.${index}.numberOfMonths`)}
            placeholder="Number of Months"
            className="input"
          />
          <input
            type="number"
            {...register(`employers.${index}.numberOfYears`)}
            placeholder="Number of Years"
            className="input"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 underline"
          >
            Remove Employer
          </button>
        </div>
      ))}

      {fields.length < 5 && (
        <button
          type="button"
          onClick={() => append({})}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Employer
        </button>
      )}

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
      >
        Next
      </button>
    </form>
  );
};

export default WorkExperienceForm;
