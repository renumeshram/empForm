import {createContext, useContext, useState } from "react";

const EmployeeDataContext = createContext();

export const EmployeeDataProvider =({children}) =>{
    // const [employeeData, setEmployeeData] = useState(() =>{
    //     const stored = sessionStorage.getItem("employeeData");
    //     return stored? JSON.parse(stored) : null;
    // })
    const [personalData, setPersonalData] = useState(() =>{
        const stored = sessionStorage.getItem("personalData");
        return stored? JSON.parse(stored) : null;
    });

    const [educationData, setEducationData] = useState(() =>{
        const stored = sessionStorage.getItem("educationData");
        return stored? JSON.parse(stored) : null;
    });

    const [familyData, setFamilyData] = useState(() =>{
        const stored = sessionStorage.getItem("familyData");
        return stored? JSON.parse(stored) : null;
    });

    const [addressData, setAddressData] = useState(() =>{
        const stored = sessionStorage.getItem("addressData");
        return stored? JSON.parse(stored) : null;
    });

    const [workData, setWorkData] = useState(() =>{
        const stored = sessionStorage.getItem("workData");
        return stored? JSON.parse(stored) : null;
    });

//     const updateEmployeeData = (data) => {
//     sessionStorage.setItem("employeeData", JSON.stringify(data));
//     setEmployeeData(data);
//   };

    const updatePersonalData = (data) => {
        setPersonalData(data);
    sessionStorage.setItem("personalData", JSON.stringify(data));
  };

    const updateEducationData =(data) =>{
        sessionStorage.setItem("educationData", JSON.stringify(data));
        setEducationData(data);
    }


  const updateFamilyData = (data) => {
    sessionStorage.setItem("familyData", JSON.stringify(data));
    setFamilyData(data);
  };

  const updateAddressData = (data) => {
    sessionStorage.setItem("addressData", JSON.stringify(data));
    setAddressData(data);
  };

  const updateWorkData = (data) => {
    sessionStorage.setItem("workData", JSON.stringify(data));
    setWorkData(data);
  };

  const updateChangeInPersonalData = (newValues) => {
  setPersonalData((prev) => {
    const updated = {
      ...prev,
      pData: {
        ...prev.pData,
        ...newValues, // override only changed fields
      },
    };
    sessionStorage.setItem("personalData", JSON.stringify(updated));
    return updated;
  });
};



  return (
    <EmployeeDataContext.Provider
      value={{
        // employeeData,
        // updateEmployeeData,
        educationData,
        updateEducationData,
        personalData,
        updatePersonalData,
        familyData,
        updateFamilyData,
        addressData,
        updateAddressData,
        workData,
        updateWorkData,
        updateChangeInPersonalData,
      }}
    >
        {children}
    </EmployeeDataContext.Provider>
  )

}

export const useEmployeeData =()=> useContext(EmployeeDataContext);