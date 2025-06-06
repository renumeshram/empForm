import React, { useEffect, useState } from "react";
import StepTabs from "./StepTabs";
import PersonalDetailsForm from "./forms/PersonalDetails";
import EducationDetailsForm from "./forms/education/EducationDetailsForm";
import FamilyDetailsForm from "./forms/Family/FamilyDetailsForm";
import AddressForm from "./forms/address/AddressForm";
import WorkExperienceForm from "./forms/work/WorkExperience";
import ReviewForm from "./forms/ReviewForm"; // ✅ Import ReviewForm
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// import { saveSectionData } from "../services/formApi";

const MultiStepForm = () => {
  const [currentStep, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const lastStepIndex = 5; // ✅ Review step added
  const {token} = useAuth();


  const handleSubmit = async(finalData) => {
    console.log("✅ Final form submission:", finalData);

    // await saveSectionData(stepName, stepData);

   setIsSubmitted(true); // ✅ Finish

    // setIsSubmitted(true);
  };

  const handleNext = (stepName, stepData) => {
    setFormData((prev) => ({ ...prev, [stepName]: stepData }));

    if(currentStep === lastStepIndex){
      handleSubmit({...formData, [stepName]: stepData});
    }else{
      setStep((prev)=> prev + 1)
    }
  };

  const handleDownloadForm = () => {
    // TODO: Implement actual form download
    setFormData({});
    setStep(0);
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-xl bg-white">
      <Navbar />
      {!isSubmitted ? (
        <>
          <StepTabs currentStep={currentStep} setStep={setStep} />

          {currentStep === 0 && (
            <PersonalDetailsForm onNext={(data) => handleNext("personalDetails", data)} />
          )}
          {currentStep === 1 && (
            <EducationDetailsForm onNext={(data) => handleNext("educationDetails", data)} />
          )}
          {currentStep === 2 && (
            <FamilyDetailsForm onNext={(data) => handleNext("familyDetails", data)} />
          )}
          {currentStep === 3 && (
            <AddressForm onNext={(data) => handleNext("addressDetails", data)} />
          )}
          {currentStep === 4 && (
            <WorkExperienceForm onNext={(data) => handleNext("workExperience", data)} />
          )}
          {currentStep === 5 && (
            <ReviewForm
              data={formData}
              onBack={() => window.history.back()}
              onSubmit={() => handleSubmit(formData)}
              token = {token}
            />
          )}
        </>
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-600">🎉 Thank you!</h2>
          <p>Your form has been submitted successfully.</p>
          <button
            onClick={handleDownloadForm}
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Download Form
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
