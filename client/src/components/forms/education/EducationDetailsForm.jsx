import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import EducationEntry from "./EducationEntry";
import { saveSectionData } from "../../../services/formApi";
import { useAuth } from "../../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useEmployeeData } from "../../../context/EmployeeDataContext";
const apiUrl = import.meta.env.VITE_API_URL;

const EducationDetailsForm = ({ onNext, defaultValues = [] }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      education: [],
    },
  });

  const { token, empData, fetchData, sessionExpired } = useAuth();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const { educationData, updateChangeInEducationData } = useEmployeeData();

  useEffect(() => {
    if (educationData?.eData?.education?.length > 0) {
      reset({ education: [] }); // ✅ Clear any stale form state

      educationData.eData.education.forEach((edu) => {
        const formattedEdu ={
          ...edu,
          startDate: edu.startDate? edu.startDate.slice(0, 10) : "",
          passingDate: edu.passingDate? edu.passingDate.slice(0, 10) : "",
        }
        append(formattedEdu); // ✅ Correctly populates FieldArray
      });
    }
  }, [educationData, append, reset]);

  // const onSubmit = async (data) => {
  //   try {
  //     const education = data.education;
  //     const hasSaved = await saveSectionData(
  //       "educationDetails",
  //       { education },
  //       token
  //     );

  //     if (hasSaved) {
  //       onNext(data.education);
  //       console.log("Education Data:", data.education);
  //     } else {
  //       console.error("Failed to save Education details");
  //     }
  //   } catch (error) {
  //     console.error("Error in saving Education details:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (educationData?.eData?.education?.length > 0) {
  //     reset({ education: [] }); // Clear old form state before appending

  //     educationData.eData.education.forEach((edu) => {
  //       append(edu);
  //     });
  //   }
  // }, [educationData, append, reset]);

  const onSubmit = async (data) => {
    try {
      const currentEducation = data.education;
      const originalEducation = educationData?.eData?.education || [];

      // Detect changed or new items
      const changedItems = currentEducation.filter((currentItem) => {
        const originalItem = originalEducation.find(
          (o) => o.eId === currentItem.eId
        );
        return (
          !originalItem ||
          JSON.stringify(currentItem) !== JSON.stringify(originalItem)
        );
      });

      // Detect deleted items
      const deletedItems = originalEducation.filter((originalItem) => {
        return !currentEducation.find((c) => c.eId === originalItem.eId);
      });

      if (changedItems.length === 0 && deletedItems.length === 0) {
        console.log("No changes detected");
        // return;
      } else {
        const payload = {
          updated: changedItems,
          deleted: deletedItems.map((item) => item.eId),
        };

        const hasSaved = await saveSectionData(
          "educationDetails",
          payload,
          token
        );

        if (hasSaved) {
          const change = changedItems.forEach((item) =>
            updateChangeInEducationData(item)
          );
          if (change) {
            console.log("Updated session data.");
          }
          console.log("Updated:", changedItems);
          console.log(
            "Deleted IDs:",
            deletedItems.map((d) => d.eId)
          );
        } else {
          console.error("Failed to save Education details");
          return;
        }
      }
      onNext(currentEducation); // always move to next section
    } catch (error) {
      console.error("Error saving Education details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {sessionExpired && (
        <div className="text-red-500 mb-2">
          Session expired. Please log in again.
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">Education Details</h2>

      {fields.length === 0 && (
        <p className="mb-4 text-gray-600">No education added yet.</p>
      )}

      {fields.map((item, index) => (
        <div
          key={item.id}
          className="border p-4 mb-4 rounded-lg shadow bg-gray-50"
        >
          <EducationEntry
            index={index}
            register={register}
            watch={watch}
            errors={errors}
          />
          <button
            type="button"
            className="bg-red-500 text-white border rounded-md px-2 py-1 mt-2"
            onClick={() => remove(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() =>
          append({
            educationType: "",
            instituteName: "",
            certificateType: "",
            duration: "",
            grade: "",
            medium: "",
            hindiSubjectLevel: "",
            startDate: "",
            passingDate: "",
            courseDetails: "",
            specialization: "",
            eId: uuidv4(),
          })
        }
      >
        + Add Education
      </button>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Next
      </button>
    </form>
  );
};

export default EducationDetailsForm;
