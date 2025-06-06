

const normalizeUserData = (data) => {
  const personal = data.personalDetails || {};
  const employee = personal.employeeId || {};

  return {
    ...data,
    personalDetails: {
      ...personal,
      sapId: employee.sapId,
      email: employee.email,

      dateOfBirth: personal.dob,
      personWithDisability: personal.pwd,
      canReadHindi: personal.langHindiRead,
      canWriteHindi: personal.langHindiWrite,
      canSpeakHindi: personal.langHindiSpeak,

      // Optionally remove the nested object if not needed:
      employeeId: undefined,
      pwd: undefined,
      langHindiRead: undefined,
      langHindiWrite: undefined,
      langHindiSpeak: undefined,
    }
  };
};



export {
    normalizeUserData,
}