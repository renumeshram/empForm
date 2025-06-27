import FamilyDetails from "../models/family.js";

const familyDetailsHandler = async(req , res) =>{
    try{
        const employeeId = req.user.id;
        const familyMembers = req.body;

        if (!employeeId) {
            return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
        }

        const savedFamilyDetails = await FamilyDetails.findOneAndUpdate(
            {employeeId},
            {...{familyMembers, employeeId} },

            {new: true, upsert: true}
        )
        console.log("🚀 ~ familyDetailsHandler ~ savedFamilyDetails:", savedFamilyDetails)

        res.status(200).json({
            success: true,
            savedFamilyDetails,
            msg: "Got Family data",
            statusCode: 200
        })
    }catch(error){
        console.log("🚀 ~ familyDetailsHandler ~ error:", error)
        
        res.status(500).json({ message: "Internal server error" });
    }
}

export default familyDetailsHandler;