import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // ✅ Added missing import
import AddressDetails from "./Address";
import { useAuth } from "../../../context/AuthContext";
import { useEmployeeData } from "../../../context/EmployeeDataContext";
import { saveSectionData } from "../../../services/formApi";

const AddressForm = ({ onNext, defaultValues = {} }) => {
  const { sessionExpired, token } = useAuth();
  const { addressData, updateAddressData, updateChangeInAddressData } = useEmployeeData();
  
  const [sameAsLocal, setSameAsLocal] = useState(false);
  const [hasCorrespondenceAddress, setHasCorrespondenceAddress] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      local: addressData?.aData?.local || {
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        postOffice: "",
        policeStation: "",
      },
      permanent: addressData?.aData?.permanent || {
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        postOffice: "",
        policeStation: "",
      },
      correspondence: addressData?.aData?.correspondence || {
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        postOffice: "",
        policeStation: "",
      },
    }
  });

  const localAddress = watch("local");
  const permanentAddress = watch("permanent");
  const correspondenceAddress = watch("correspondence");

  useEffect(() => {
    if (addressData && addressData.aData) {
      reset({
        local: addressData.aData.local || {},
        permanent: addressData.aData.permanent || {},
        correspondence: addressData.aData.correspondence || {},
      });

      // ✅ Fixed: Added null check for addressData.correspondence
      if (addressData.aData.correspondence && Object.keys(addressData.aData.correspondence).length > 0) {
        setHasCorrespondenceAddress(true);
      }

      // ✅ Fixed: Added null check for addressData properties
      if (addressData.aData.local && addressData.aData.permanent) {
        const isEqual = JSON.stringify(addressData.aData.local) === JSON.stringify(addressData.aData.permanent);
        setSameAsLocal(isEqual);
      }
    }
  }, [addressData, reset]);

  // Sync permanent with local if checkbox is selected
  useEffect(() => {
    if (sameAsLocal && localAddress) {
      setValue("permanent", localAddress);
    }
  }, [sameAsLocal, localAddress, setValue]);

  const onSubmit = async (data) => {
    try {
      const addressPayload = {
        local: data.local,
        permanent: data.permanent,
      };

      if (hasCorrespondenceAddress && data.correspondence) {
        addressPayload.correspondence = data.correspondence;
      }

      // Update each address type in context
      // updateAddressData(addressPayload);
      if(addressPayload.local){
        updateChangeInAddressData("local", addressPayload.local)

      }
      if(addressPayload.permanent){
        updateChangeInAddressData("permanent", addressPayload.permanent) 
      }
      if(addressPayload.correspondence){
        updateChangeInAddressData("correspondence", addressPayload.correspondence)
        
      }

      // Save to backend
      const success = await saveSectionData("addressDetails", addressPayload, token);

      if (success) {
        console.log("Address data saved successfully", addressPayload);
        onNext(addressPayload);
      } else {
        console.error("Failed to save address data");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  // ✅ Fixed: Corrected the logic for handleCheckboxChange
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsLocal(checked);
    
    if (checked && localAddress) {
      // If checked, copy local address to permanent
      setValue("permanent", localAddress);
    } else if (!checked) {
      // If unchecked, clear permanent address
      setValue("permanent", {
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        postOffice: "",
        policeStation: "",
      });
    }
  };

  const handleCorrespondenceToggle = (e) => {
    const checked = e.target.checked;
    setHasCorrespondenceAddress(checked);

    if (!checked) {
      // Clear all correspondence-related state when toggled off
      setValue("correspondence", {
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        postOffice: "",
        policeStation: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto p-4 bg-white rounded shadow">
      {sessionExpired && (
        <div className="text-red-500 mb-2">
          Session expired. Please log in again.
        </div>
      )}

      {/* Local Address Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Local Address (Kirandul)</h2>
        <AddressDetails
          addressType="local"
          control={control}
          errors={errors.local}
        />
      </div>

      {/* Permanent Address Section */}
      <div className="flex items-center space-x-2 mt-6">
        <input
          type="checkbox"
          id="sameAsLocal"
          checked={sameAsLocal}
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="sameAsLocal" className="text-gray-700 font-medium">
          Same as Local Address
        </label>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Permanent Address</h2>
        <AddressDetails
          addressType="permanent"
          control={control}
          disabled={sameAsLocal}
          errors={errors.permanent}
        />
      </div>

      {/* Correspondence Address Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="hasCorrespondenceAddress"
            checked={hasCorrespondenceAddress}
            onChange={handleCorrespondenceToggle}
            className="form-checkbox h-5 w-5 text-green-600"
          />
          <label htmlFor="hasCorrespondenceAddress" className="text-gray-700 font-medium">
            I have a different correspondence address
          </label>
        </div>

        {hasCorrespondenceAddress && (
          <div>
            <h2 className="text-xl font-bold mb-4">Correspondence Address</h2>
            <AddressDetails
              addressType="correspondence"
              control={control}
              errors={errors.correspondence}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Next
      </button>
    </form>
  );
};

export default AddressForm;