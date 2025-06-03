import Employee from '../models/employee.js'
import PersonalDetails from '../models/personalDetails.js'
import EducationDetails from '../models/education.js'
import FamilyDetails from '../models/family.js'
import WorkExperience from '../models/workExperience.js'


const fetchPersonalDetails = async (req, res) => {
    try {
        const employeeId = req.user.id
        console.log("🚀 ~ fetchPersonalDetails ~ employeeId:", employeeId)
        const personalData = await PersonalDetails.findOne({ employeeId });
        const employeeData = await Employee.findOne({ _id: employeeId });

        console.log("🚀 ~ fetchPersonalDetails ~ employeeData:", employeeData)
        console.log("🚀 ~ fetchPersonalDetails ~ personalData:", personalData)
        return res.status(200).json({
            pData: personalData,
            emp: employeeData,
            success: true,
            msg: "Personal Data successfully fetched from DB",
        });
    } catch (error) {
        console.log("🚀 ~ fetchPersonalDetails ~ error:", error)
        res.status(500).json({
            success: false,
            msg: "Error in fetching data"
        })

    }
}

const fetchEducation = async (req, res) => {
    try{

        const employeeId = req.user.id
        console.log("🚀 ~ fetchPersonalDetails ~ employeeId:", employeeId)
    
        const eduData = await EducationDetails.findOne({ employeeId });
        // const employeeData = await Employee.findOne({_id: employeeId });
        console.log("🚀 ~ fetchEducation ~ eduData:", eduData)
    
        return res.status(200).json({
            eData: eduData,
            success: true,
            msg: "Education Data successfully fetched from DB",
        });
    }catch(error){
        console.log("🚀 ~ fetchEducation ~ error:", error)
        res.status(500).json({
            success: false,
            msg: "Error in fetching data"
        })
    }
}

const fetchFamily = async(req, res)=>{
    try{

        const employeeId = req.user.id
        console.log("🚀 ~ fetchPersonalDetails ~ employeeId:", employeeId)
    
        const familyData = await FamilyDetails.findOne({employeeId});
    
        console.log("🚀 ~ fetchFamily ~ familyData:", familyData)
    
        return res.status(200).json({
            famData: familyData,
            success: true,
            msg: "Family Data successfully fetched from DB",
        });
    }catch(error){
        console.log("🚀 ~ fetchFamily ~ error:", error)
        res.status(500).json({
            success: false,
            msg: "Error in fetching data"
        })
    }
    

}
const fetchAddress = ()=>{

}
const fetchWork = ()=>{

}
export {
    fetchPersonalDetails,
    fetchEducation,
    fetchFamily,
    fetchAddress,
    fetchWork,
}