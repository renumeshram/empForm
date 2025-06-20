const languageOptions = [
  "ASSAMESE",
  "BENGALI",
  "BODO",
  "DOGRI",
  "ENGLISH",
  "GUJARATI",
  "HINDI",
  "KANNADA",
  "KASHMIRI",
  "KONKANI",
  "MAITHILI",
  "MALAYALAM",
  "MARATHI",
  "NEPALI",
  "ODIYA",
  "PUNJABI",
  "SANSKRIT",
  "SANTALI",
  "SINDHI",
  "TAMIL",
  "TELUGU",
  "URDU",
  "OTHER"
];

const states = [
  { name: "Andaman and Nicobar Islands", code: "AN" },
  { name: "Andhra Pradesh", code: "AP" },
  { name: "Andhra Pradesh (New)", code: "AD" },
  { name: "Arunachal Pradesh", code: "AR" },
  { name: "Assam", code: "AS" },
  { name: "Bihar", code: "BH" },
  { name: "Chandigarh", code: "CH" },
  { name: "Chattisgarh", code: "CT" },
  { name: "Dadra and Nagar Haveli", code: "DN" },
  { name: "Daman and Diu", code: "DD" },
  { name: "Delhi", code: "DL" },
  { name: "Goa", code: "GA" },
  { name: "Gujarat", code: "GJ" },
  { name: "Haryana", code: "HR" },
  { name: "Himachal Pradesh", code: "HP" },
  { name: "Jammu and Kashmir", code: "JK" },
  { name: "Jharkhand", code: "JH" },
  { name: "Karnataka", code: "KA" },
  { name: "Kerala", code: "KL" },
  { name: "Lakshadweep Islands", code: "LD" },
  { name: "Madhya Pradesh", code: "MP" },
  { name: "Maharashtra", code: "MH" },
  { name: "Manipur", code: "MN" },
  { name: "Meghalaya", code: "ME" },
  { name: "Mizoram", code: "MI" },
  { name: "Nagaland", code: "NL" },
  { name: "Odisha", code: "OR" },
  { name: "Pondicherry", code: "PY" },
  { name: "Punjab", code: "PB" },
  { name: "Rajasthan", code: "RJ" },
  { name: "Sikkim", code: "SK" },
  { name: "Tamil Nadu", code: "TN" },
  { name: "Telangana", code: "TS" },
  { name: "Tripura", code: "TR" },
  { name: "Uttar Pradesh", code: "UP" },
  { name: "Uttarakhand", code: "UT" },
  { name: "West Bengal", code: "WB" },
];

const education = [
  { key: "10TH", label: "10th Class" },
  { key: "12TH", label: "12th Class" },
  { key: "GRAD", label: "Graduation / Diploma / ITI" },
  { key: "POSTGRAD", label: "Post-graduation / PhD" },
  { key: "CERTIFICATE", label: "Course Certificate / Others" },
];

const familyMemberTypes = [
  "Spouse",
  "Child",
  "Father",
  "Father-in-law",
  "Mother",
  "Mother-in-law",
];

const titlesByType = {
  Spouse: ["Shri", "Smt."],
  Child: ["Mt.", "Ms."],
  Father: ["Shri"],
  "Father-in-law": ["Shri"],
  Mother: ["Smt."],
  "Mother-in-law": ["Smt."],
};

const industries = [
  "Autonomous Bodies",
  "Central govt.",
  "Indian Armed Forces",
  "NGO",
  "Private",
  "PSU central",
  "PSU state",
  "State govt",
];

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export { 
  languageOptions,
  states,
  education,
  familyMemberTypes,
  titlesByType,
  industries,
  bloodGroups,
}