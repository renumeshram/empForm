import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const AddressDetails = ({ onChange, values = {}, disabled = false }) => {
  const { register, watch, setValue } = useForm();

  const watchedFields = watch();
  const prevDataRef = useRef({});

  // ✅ Sync external values into form inputs
  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      Object.entries(values).forEach(([key, val]) => {
        setValue(key, val);
      });
    }
  }, [values, setValue]);

  // 🔁 Notify parent when any field changes
  useEffect(() => {
    const prevData = prevDataRef.current;
    const hasChanged = Object.keys(watchedFields).some(
      key => watchedFields[key] !== prevData[key]
    );

    if (hasChanged) {
      prevDataRef.current = watchedFields;
      onChange(watchedFields);
    }
  }, [watchedFields, onChange]);

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input {...register("addressLine1")} placeholder="Address Line 1" className="border p-2" disabled={disabled} />
      <input {...register("addressLine2")} placeholder="Address Line 2" className="border p-2" disabled={disabled} />
      <input {...register("city")} placeholder="City" className="border p-2" disabled={disabled} />
      <input {...register("district")} placeholder="District" className="border p-2" disabled={disabled} />
      <input {...register("state")} placeholder="State" className="border p-2" disabled={disabled} />
      <input {...register("pincode")} placeholder="Pincode" className="border p-2" disabled={disabled} />
      <input {...register("postOffice")} placeholder="Post Office" className="border p-2" disabled={disabled} />
      <input {...register("policeStation")} placeholder="Police Station" className="border p-2" disabled={disabled} />
    </form>
  );
};

export default AddressDetails;
