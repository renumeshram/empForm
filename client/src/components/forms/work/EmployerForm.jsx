import React from "react";
import { useFormContext } from "react-hook-form";

const industries = [
  "Autonomous Bodies",
  "Central govt.",
  "Indian Armed Forces",
  "NGO",
  "Private",
  "PSU central",
  "PSU state",
  "State govt",
];

const EmployerForm = ({ index, onRemove }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="border rounded p-4 mb-4">
      <h4 className="font-semibold mb-3">Employer {index + 1}</h4>

      <input
        {...register(`experiences.${index}.companyName`, { required: "Employer name is required" })}
        placeholder="Employer's Name"
        className="w-full mb-2 p-2 border rounded"
      />
      {errors.experiences?.[index]?.name && (
        <p className="text-red-600 text-sm">{errors.experiences[index].name.message}</p>
      )}

      <input
        {...register(`experiences.${index}.city`)}
        placeholder="City"
        className="w-full mb-2 p-2 border rounded"
      />

      <div className="flex space-x-4 mb-2">
        <div className="flex flex-col">
          <label>Start Date</label>
          <input
            type="date"
            {...register(`experiences.${index}.startDate`)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label>Relieving Date</label>
          <input
            type="date"
            {...register(`experiences.${index}.relievingDate`)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      <select
        {...register(`experiences.${index}.industry`)}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="">Select Industry</option>
        {industries.map((ind, idx) => (
          <option key={idx} value={ind}>
            {ind}
          </option>
        ))}
      </select>

      <input
        {...register(`experiences.${index}.designation`)}
        placeholder="Designation"
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        {...register(`experiences.${index}.scaleOnLeaving`)}
        placeholder="Scale on Leaving"
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        {...register(`experiences.${index}.reasonForLeaving`)}
        placeholder="Reason for Leaving"
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        {...register(`experiences.${index}.grossSalary`)}
        placeholder="Gross Salary"
        type="number"
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        {...register(`experiences.${index}.greenfield`)}
        placeholder="Greenfield"
        className="w-full mb-2 p-2 border rounded"
      />

      <div className="flex space-x-4">
        <input
          {...register(`experiences.${index}.numberOfMonths`)}
          placeholder="Number of Months"
          type="number"
          className="w-1/2 p-2 border rounded"
        />
        <input
          {...register(`experiences.${index}.numberOfYears`)}
          placeholder="Number of Years"
          type="number"
          className="w-1/2 p-2 border rounded"
        />
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="mt-3 px-3 py-1 bg-red-600 text-white rounded"
        >
          Remove Employer
        </button>
      )}
    </div>
  );
};

export default EmployerForm;
