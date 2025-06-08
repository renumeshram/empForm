import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatValue, shouldHideField, formatKey } from "../utils/formatters";
// import { normalizeUserData } from "../utils";

export const generatePDF = (formData) => {
  // const normalizedData = normalizeUserData(formData);
  // console.log("🚀 ~ generatePDF ~ normalizedData:", normalizedData)

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Employee Application", 14, 20);
  doc.setFontSize(12);

  let y = 30;

  const renderSection = (title, data, fieldOrder = [], keyFormatter = formatKey) => {
    if (!data) return;

    doc.setFont(undefined, "bold");
    doc.text(title, 14, y);
    y += 6;
    doc.setFont(undefined, "normal");

    const rows = [];

    // Merge fieldOrder with any extra keys from data
    const extraKeys = Object.keys(data).filter(
      (key) => !fieldOrder.includes(key)
    );
    const keys = fieldOrder.concat(extraKeys);

    keys.forEach((key) => {
      const value = data[key];
      if (value === undefined || shouldHideField(key)) return;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          rows.push([
            { content: `${keyFormatter(key)} [${index + 1}]`, colSpan: 2, styles: { fontStyle: "bold" } },
          ]);

          if (typeof item === "object" && item !== null) {
            Object.entries(item).forEach(([k, v]) => {
              if (!shouldHideField(k)) {
                rows.push([keyFormatter(k), formatValue(v)]);
              }
            });
          } else {
            rows.push([keyFormatter(key), formatValue(item)]);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([k, v]) => {
          if (!shouldHideField(k)) {
            rows.push([keyFormatter(k), formatValue(v)]);
          }
        });
      } else {
        rows.push([keyFormatter(key), formatValue(value)]);
      }
    });

    doc.autoTable({
      head: [["Field", "Value"]],
      body: rows,
      startY: y,
      theme: "grid",
      styles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    y = doc.lastAutoTable.finalY + 10;
  };

  // Section-specific key ordering for consistent layout (like in ReviewForm)
  const personalFields = [
    "title",
    "firstName",
    "lastName",
    "sapId",
    "gender",
    "dateOfBirth",
    "birthplace",
    "state",
    "religion",
    "category",
    "subCategory",
    "idMark1",
    "idMark2",
    "exServiceman",
    "adhaarId",
    "mobile",
    "email",
    "personWithDisability",
    "motherTongue",
    "hindiKnowledge",
    "canReadHindi",
    "canWriteHindi",
    "canSpeakHindi",
  ];

  // Key display mapping
const personalFieldLabels = {
  title: "Title",
  firstName: "First Name",
  lastName: "Last Name",
  sapid: "SAP ID",
  gender: "Gender",
  dob: "Date of Birth",
  birthplace: "Birthplace",
  state: "State",
  religion: "Religion",
  category: "Category",
  subCategory: "Sub Category",
  idMark1: "ID Mark 1",
  idMark2: "ID Mark 2",
  exServiceman: "Ex-Serviceman",
  adhaarId: "Aadhaar ID",
  mobile: "Mobile",
  email: "Email",
  pwd: "Person With Disability",
  motherTongue: "Mother Tongue",
  hindiKnowledge: "Hindi Knowledge",
  langHindiRead: "Can Read Hindi",
  langHindiWrite: "Can Write Hindi",
  langHindiSpeak: "Can Speak Hindi",
};

// Override formatKey for personal details section
function changeDisplayMain(key) {
  return personalFieldLabels[key] || formatKey(key);
}


  renderSection(
  "Personal Details",
  Array.isArray(formData.personalDetails) ? formData.personalDetails[0] : formData.personalDetails,
  personalFields, changeDisplayMain
);
  renderSection("Education Details", formData.educationDetails);
  renderSection("Family Details", formData.familyDetails);
  renderSection("Address Details", formData.addressDetails);
  renderSection("Work Experience", formData.workExperience);

  doc.save("application.pdf");
};
