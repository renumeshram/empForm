import WorkExperience from "../models/workExperience.js"

const workExperienceHandler = async (req, res) => {
    try{

        const employeeId = req.user.id;
        const experiences = req.body;
    
    
        if (!employeeId) {
            return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
        }
    
        // console.log("Request we are getting", req.body)
    
        const savedWorkExperiences = await WorkExperience.findOneAndUpdate(
            { employeeId },
            { ...{ experiences, employeeId } },
    
            { new: true, upsert: true }
        )
    
        res.status(200).json({
            success: true,
            savedWorkExperiences,
            msg: "Got Work data",
            statusCode: 200
        })
    }catch(error){
        console.log("🚀 ~ workExperienceHandler ~ error:", error)
        
        res.status(500).json({ message: "Internal server error" });
    }


}

export default workExperienceHandler;