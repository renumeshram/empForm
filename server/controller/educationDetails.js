import EducationDetails from '../models/education.js'

// const educationDetailsHandler = async(req, res)=>{
//     try{
//         const eduDetails = req.body;

//         const employeeId = req.user.id;

//         if (!employeeId) {
//             return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
//         }

//         // console.log(req.body)
//         console.log("Received Edu details", eduDetails);
//         // console.log(req.body.education)

//         const savedEduDetails = await EducationDetails.findOneAndUpdate(
//             {employeeId},
//             {...eduDetails, employeeId},

//             {new: true, upsert: true},
//         )

//         res.status(200).json({
//             success: true,
//             savedEduDetails,
//             msg: "Got data",
//             statusCode: 200
//         })
//     }catch(error){
//         console.log("🚀 ~ educationDetailsHandler ~ error:", error)

//         res.status(500).json({ message: "Internal server error" });

//     }
// }

// export default educationDetailsHandler

const educationDetailsHandler = async (req, res) => {
  try {
    const { updated = [], deleted = [] } = req.body;
    const employeeId = req.user.id;

    if (!employeeId) {
      return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
    }

    // Remove deleted entries
    if (deleted.length > 0) {
      await EducationDetails.updateOne(
        { employeeId },
        { $pull: { education: { eId: { $in: deleted } } } }
      );
    }

    // Upsert logic
    const existingDoc = await EducationDetails.findOne({ employeeId }) || new EducationDetails({ employeeId, education: [] });

    // Replace or insert updated entries
    updated.forEach((newItem) => {
      const index = existingDoc.education.findIndex(e => e.eId === newItem.eId);
      if (index !== -1) {
        existingDoc.education[index] = newItem; // replace existing
      } else {
        existingDoc.education.push(newItem); // add new
      }
    });

    const savedDoc = await existingDoc.save();

    res.status(200).json({
      success: true,
      updated: updated.map(i => i.eId),
      deleted,
      saved: savedDoc,
      msg: "Education details updated",
    });
  } catch (error) {
    console.error("🚀 ~ educationDetailsHandler ~ error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default educationDetailsHandler