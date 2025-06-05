import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import EmployerForm from "./EmployerForm";

const WorkExperienceForm = ({ onNext }) => {
  const methods = useForm({
    defaultValues: {
      employers: [],
    },
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employers",
  });

  const onSubmit = (data) => {
    onNext(data.employers);
  };

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};

export default WorkExperienceForm;
