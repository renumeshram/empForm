import React from "react";

const EducationEntry = ({ index, register, watch, errors }) => {
  const educationType = watch(`education[${index}].educationType`);

  return (
    <div className="education-entry space-y-2">
      <label>Education Type</label>
      <select {...register(`education[${index}].educationType`)}>
        <option value="">Select</option>
        <option value="10TH">10th Class</option>
        <option value="12TH">12th Class</option>
        <option value="GRAD">Graduation / Diploma / ITI</option>
        <option value="POSTGRAD">Post-graduation / PhD</option>
        <option value="CERTIFICATE">Course Certificate / Others</option>
      </select>

      <input
        placeholder="Institute Name"
        {...register(`education[${index}].instituteName`)}
      />
      <select {...register(`education[${index}].certificateType`)}>
        <option value="">Certificate Type</option>
        <option value="REGULAR">Regular</option>
        <option value="CORRESPONDANCE">Correspondance</option>
      </select>

      <input
        type="number"
        placeholder="Duration (years)"
        {...register(`education[${index}].duration`)}
      />

      <input
        placeholder="Final Grade"
        {...register(`education[${index}].grade`)}
      />

      <label>Medium of Education</label>
      <label>
        <input
          type="radio"
          value="ENGLISH"
          {...register(`education[${index}].medium`)}
        />{" "}
        English
      </label>
      <label>
        <input
          type="radio"
          value="HINDI"
          {...register(`education[${index}].medium`)}
        />{" "}
        Hindi
      </label>

      <label>Hindi Subject Studied as:</label>
      <select {...register(`education[${index}].hindiSubjectLevel`)}>
        <option value="">Select</option>
        <option value="FIRST">1st Language</option>
        <option value="SECOND">2nd Language</option>
        <option value="THIRD">3rd Language</option>
        <option value="NONE">None</option>
      </select>

      {(educationType === "GRAD" || educationType === "POSTGRAD" || educationType === "CERTIFICATE") && (
        <>
          <input
            placeholder="Course Details"
            {...register(`education[${index}].courseDetails`)}
          />
          <input
            placeholder="Specialization"
            {...register(`education[${index}].specialization`)}
          />
        </>
      )}

      <label>Course Starting Date</label>
      <input
        type="date"
        {...register(`education[${index}].startDate`)}
      />
      <label>Passing Date</label>
      <input
        type="date"
        {...register(`education[${index}].passingDate`)}
      />
    </div>
  );
};

export default EducationEntry;
