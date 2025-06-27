import Employee from '../models/employee.js'
import PersonalDetails from '../models/personalDetails.js'
import EducationDetails from '../models/education.js'
import FamilyDetails from '../models/family.js'
import AddressDetails from '../models/address.js'
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
const fetchAddress = async(req, res)=>{
    try{
        const employeeId = req.user.id
        console.log("🚀 ~ fetchAddress ~ employeeId:", employeeId)

        const addressData = await AddressDetails.findOne({ employeeId})
        console.log("🚀 ~ fetchAddress ~ addressData:", addressData)

        return res.status(200).json({
            aData: addressData,
            success: true,
            msg: "Address data successfully fetched from DB"
        })
    }catch(error){
        console.log("🚀 ~ fetchAddress ~ error:", error)

        res.status(500).json({
            success: false,
            msg: "Error in fetching address data",
        })
        
    }
}
const fetchWork = async(req, res)=>{
    try{

        const employeeId = req.user.id
        console.log("🚀 ~ fetchWork ~ employeeId:", employeeId)
        
    
        const workData = await WorkExperience.findOne({ employeeId });
        // const employeeData = await Employee.findOne({_id: employeeId });
        console.log("🚀 ~ fetchWork ~ workData:", workData)
        
    
        return res.status(200).json({
            wData: workData,
            success: true,
            msg: "Work experience Data successfully fetched from DB",
        });
    }catch(error){
        console.log("🚀 ~ fetchWork ~ error:", error)
        
        res.status(500).json({
            success: false,
            msg: "Error in fetching data"
        })
    }
}

const fetchFinalData = async(req, res)=>{
    try{

        const employeeId = req.user.id
        console.log("🚀 ~ fetchFinalData ~ employeeId:", employeeId)

        const personalDetails = await PersonalDetails.findOne({ employeeId}).populate("employeeId", "-_id -__v").select("-_id -__v");
        const educationDetails = await EducationDetails.findOne({employeeId});
        const workExperience = await WorkExperience.findOne({employeeId});
        const familyDetails = await FamilyDetails.findOne({employeeId});
        const addressDetails = await AddressDetails.findOne({employeeId});


        const {employeeId:id,...perDetails} = personalDetails.toObject()

        res.status(200).json({
            personalDetails:{"personalDetails":[{...perDetails,email:id.email, sapid:id.sapId}]},
            educationDetails,
            workExperience,
            familyDetails,
            addressDetails
        })
    }catch(error){
        console.log("🚀 ~ fetchFinalData ~ error:", error)
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            statusCode: 500,
        })
    }



}
export {
    fetchPersonalDetails,
    fetchEducation,
    fetchFamily,
    fetchAddress,
    fetchWork,
    fetchFinalData,
}