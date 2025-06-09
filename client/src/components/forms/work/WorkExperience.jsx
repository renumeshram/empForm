import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import EmployerForm from "./EmployerForm";
import { saveSectionData } from "../../../services/formApi";
import { useAuth } from "../../../context/AuthContext";
import { useEmployeeData } from "../../../context/EmployeeDataContext";
import { v4 as uuidv4} from "uuid";

const WorkExperienceForm = ({ onNext }) => {
  const {token, sessionExpired} = useAuth()

  const {workData, updateWorkData } =useEmployeeData();

  const methods = useForm({
    defaultValues: {
      experiences: workData?.wData?.experiences || [],
    },
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const onSubmit = async(data) => {

    try{

      // const payload = {
      //   experiences: data.experiences
      // }

      updateWorkData({wData: {experiences: data.experiences}});
  
      const success =  await saveSectionData("workExperience", data.experiences, token);
  
      if(success){
        onNext(data.experiences);
        
      }
    }catch(error){
      console.error("Error in saving experiences", error)
    }



  };

  return (
    <FormProvider {...methods}>
      {sessionExpired && (
        <div className="text-red-500 mb-2">
          Session expired. Please log in again.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="font-semibold text-lg mb-2">
          Add your previous employer details (up to 5)
        </p>

        {fields.length === 0 && (
          <p className="mb-4 text-gray-600">No experience added yet.</p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="border rounded p-4 mb-4 space-y-3">
            <EmployerForm index={index} onRemove={remove} />
          </div>
        ))}

        {fields.length < 5 && (
          <button
            type="button"
            onClick={() => append({
              companyName: "",
                city: "",
                designation: "",
                greenfield: "",
                grossSalary: "",
                industry: "",
                numberOfMonths: "",
                numberOfYears: "",
                reasonForLeaving: "",
                relievingDate: "",
                scaleOnLeaving: "",
                startDate: "",
                wId : uuidv4(),
            })}
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
    </FormProvider>
  );
};

export default WorkExperienceForm;
