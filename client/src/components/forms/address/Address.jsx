import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

const AddressDetails = ({ 
  addressType,
  control,
  errors ={}, 
  disabled = false 
  }) => {
  const fieldNames = [
    "addressLine1",
    "addressLine2", 
    "city",
    "district",
    "state",
    "pincode",
    "postOffice",
    "policeStation",
  ]

  const getFieldName = (field) => `${addressType}.${field}`;

  const getPlaceholder = (field) =>{
    const placeholders = {
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      city: "City",
      district: "District", 
      state: "State",
      pincode: "Pincode",
      postOffice: "Post Office",
      policeStation: "Police Station"
    }
    return placeholders[field] || field;
  };

  // const watchedFields = watch();
  // const prevDataRef = useRef({});

  // // ✅ Sync external values into form inputs
  // useEffect(() => {
  //   if (values && Object.keys(values).length > 0) {
  //     Object.entries(values).forEach(([key, val]) => {
  //       setValue(key, val);
  //     });
  //   }
  // }, [values, setValue]);

  // // 🔁 Notify parent when any field changes
  // useEffect(() => {
  //   const prevData = prevDataRef.current;
  //   const hasChanged = Object.keys(watchedFields).some(
  //     key => watchedFields[key] !== prevData[key]
  //   );

  //   if (hasChanged) {
  //     prevDataRef.current = watchedFields;
  //     onChange(watchedFields);
  //   }
  // }, [watchedFields, onChange]);

   return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fieldNames.map((fieldName) => (
        <div key={fieldName} className="flex flex-col">
          <Controller
            name={getFieldName(fieldName)}
            control={control}
            defaultValue=""
            rules={{
              required: fieldName === "addressLine1" || fieldName === "city" || fieldName === "state" || fieldName === "pincode" 
                ? `${getPlaceholder(fieldName)} is required` 
                : false
            }}
            render={({ field }) => (
              <input
                {...field}
                placeholder={getPlaceholder(fieldName)}
                className={`border p-2 rounded ${
                  errors[fieldName] ? "border-red-500" : "border-gray-300"
                } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
                disabled={disabled}
              />
            )}
          />
          {errors[fieldName] && (
            <span className="text-red-500 text-sm mt-1">
              {errors[fieldName].message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
export default AddressDetails;

//         </div>
//       )
//       <input {...register("addressLine1")} placeholder="Address Line 1" className="border p-2" disabled={disabled} />
//       <input {...register("addressLine2")} placeholder="Address Line 2" className="border p-2" disabled={disabled} />
//       <input {...register("city")} placeholder="City" className="border p-2" disabled={disabled} />
//       <input {...register("district")} placeholder="District" className="border p-2" disabled={disabled} />
//       <input {...register("state")} placeholder="State" className="border p-2" disabled={disabled} />
//       <input {...register("pincode")} placeholder="Pincode" className="border p-2" disabled={disabled} />
//       <input {...register("postOffice")} placeholder="Post Office" className="border p-2" disabled={disabled} />
//       <input {...register("policeStation")} placeholder="Police Station" className="border p-2" disabled={disabled} />
//     </form>
//   );
// };

// export default AddressDetails;
