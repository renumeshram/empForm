import React, { useState, useEffect } from "react";
import AddressDetails from "./Address";

const AddressForm = ({ onNext, defaultValues = {} }) => {
  const [localAddress, setLocalAddress] = useState({});
  const [permanentAddress, setPermanentAddress] = useState({});
  const [sameAsLocal, setSameAsLocal] = useState(false);

  useEffect(() => {
    if (defaultValues.local) {
      setLocalAddress(defaultValues.local);
    }
    if (defaultValues.permanent) {
      setPermanentAddress(defaultValues.permanent);
    }
  }, [defaultValues]);

  // Sync permanent with local if checkbox is selected
  useEffect(() => {
    if (sameAsLocal) {
      setPermanentAddress(localAddress);
    }
  }, [sameAsLocal, localAddress]);

  const handleSubmit = () => {
    const combined = {
      local: localAddress,
      permanent: permanentAddress,
    };
    console.log("Address Data:", combined);
    onNext(combined);
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsLocal(checked);
    if (!checked) {
      setPermanentAddress({});
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Local Address (Kirandul)</h2>
      <AddressDetails onChange={setLocalAddress} values={localAddress} />

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

      <h2 className="text-xl font-bold">Permanent Address</h2>
      <AddressDetails
        onChange={setPermanentAddress}
        values={permanentAddress}
        disabled={sameAsLocal} // Disable inputs if checkbox is selected
      />

      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default AddressForm;
