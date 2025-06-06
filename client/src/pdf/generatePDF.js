// import jsPDF from "jspdf";
// import "jspdf-autotable"; // ✅ correct import
// import { normalizeUserData } from "../utils";

// const generatePDF = (formData) => {
//   const normalize = normalizeUserData(formData)
//   const doc = new jsPDF();

//   doc.setFontSize(18);
//   doc.text("Employee Registration Application", 14, 22);

//   const rows = [];

//   Object.entries(normalize).forEach(([section, data]) => {
//     rows.push([
//       {
//         content: section.toUpperCase(),
//         colSpan: 2,
//         styles: { halign: "left", fillColor: [230, 230, 230] },
//       },
//     ]);

//     if (typeof data === "object" && data !== null) {
//       Object.entries(data).forEach(([key, value]) => {
//         rows.push([
//           key.replace(/([A-Z])/g, " $1"),
//           String(value ?? ""),
//         ]);
//       });
//     } else {
//       rows.push([section, String(data ?? "")]);
//     }
//   });

//   doc.autoTable({
//     startY: 30,
//     head: [["Field", "Value"]],
//     body: rows,
//     theme: "grid",
//     styles: { fontSize: 10 },
//     headStyles: { fillColor: [22, 160, 133] },
//   });

//   doc.save("employee_form_data.pdf");
// };



// export {
//     generatePDF,
// }