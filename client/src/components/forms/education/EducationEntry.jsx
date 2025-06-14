import React from "react";
import { education } from "../../../constants";

const EducationEntry = ({ index, register, watch, errors }) => {
  const educationType = watch(`education[${index}].educationType`);

  return (
    <div className="education-entry space-y-2">
      <label>Education Type</label>
      <select {...register(`education[${index}].educationType`)}
      className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      >
        <option value="">Select</option>
        { education.map(type => (
          <option key={type.key} value={type.key}>
            {type.label}
            </option>
        ))}
      </select>
      <br />

      <label>Institute Name</label>
      <input
        placeholder="Institute Name"
        {...register(`education[${index}].instituteName`)}
        className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      />
      <br /> 

      <label>Certificate Type</label>
      <select {...register(`education[${index}].certificateType`)}
      className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      >
        <option value="">Certificate Type</option>
        <option value="REGULAR">Regular</option>
        <option value="CORRESPONDANCE">Correspondance</option>
      </select>
      <br />

      <label>Duration</label>
      <input
        type="number"
        placeholder="Duration (years)"
        {...register(`education[${index}].duration`)}
        className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      />
      <br /> 

      <label>Final Grade</label>
      <input
        placeholder="Final Grade"
        {...register(`education[${index}].grade`)}
        className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      />
      <br /> 

      <label className="mr-10">Medium of Education</label>
      <label>
        <input
          type="radio"
          value="ENGLISH"
          {...register(`education[${index}].medium`)}

        />{" "}
        English
      </label>
      <label className="ml-5">
        <input
          type="radio"
          value="HINDI"
          {...register(`education[${index}].medium`)}
        />{" "}
        Hindi
      </label>
        <br />
      <label className="mt-5">Hindi Subject Studied as:</label>
      <select {...register(`education[${index}].hindiSubjectLevel`)}
      className="mt-5 mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      >
        <option value="">Select</option>
        <option value="FIRST">1st Language</option>
        <option value="SECOND">2nd Language</option>
        <option value="THIRD">3rd Language</option>
        <option value="NONE">None</option>
      </select>

      {(educationType === "GRAD" || educationType === "POSTGRAD" || educationType === "CERTIFICATE") && (
        <>
          <br />
          <label>Course Details</label>
          <input
            placeholder="Course Details"
            {...register(`education[${index}].courseDetails`)}
            className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
          />
          <br />
          <label>Specialization</label>
          <input
            placeholder="Specialization"
            {...register(`education[${index}].specialization`)}
            className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
          />
        </>
      )}
      <br />
      <label>Course Starting Date</label>
      <input
        type="date"
        {...register(`education[${index}].startDate`)}
        className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      />
      <br />
      <label>Passing Date</label>
      <input
        type="date"
        {...register(`education[${index}].passingDate`)}
        className="mb-5 border rounded p-2 border-black focus:outline-none focus:border-blue-500 ml-10"
      />
    </div>
  );
};

export default EducationEntry;
