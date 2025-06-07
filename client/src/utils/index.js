// const normalizeUserData = (data) => {
//   const personal = data.personalDetails?.personalDetails || {};
//   const employee = personal.employeeId || {};
// console.log("calling nor",data)
//   return {
//     ...data,
//    /*  personalDetails: {
//       ...personal,

//       // Flatten employee fields if nested
//       sapId: personal.sapId || employee.sapId || "",
//       email: personal.email || employee.email || "",

//       // Normalize aliased fields
//       dateOfBirth: personal.dateOfBirth || personal.dob || "",
//       personWithDisability: personal.personWithDisability ?? personal.pwd,
//       canReadHindi: personal.canReadHindi ?? personal.langHindiRead,
//       canWriteHindi: personal.canWriteHindi ?? personal.langHindiWrite,
//       canSpeakHindi: personal.canSpeakHindi ?? personal.langHindiSpeak,

//       // Remove backend-only or raw aliases
//       employeeId: undefined,
//       pwd: undefined,
//       dob: undefined,
//       langHindiRead: undefined,
//       langHindiWrite: undefined,
//       langHindiSpeak: undefined,
//     }, */
//   };
// };

// export { normalizeUserData };
