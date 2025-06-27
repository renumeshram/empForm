import AddressDetails from '../models/address.js';

const addressDetailsHandler = async(req, res)=>{
    try{
        const employeeId = req.user.id
        const {local, permanent, correspondence} = req.body;
        console.log("🚀 ~ addressDetailsHandler ~ address:", local, permanent, correspondence)

        if(!employeeId){
            return res.status(401).json({
                message: "Unauthorized: Employee ID missing"
            });
        }

        const savedAddressDetails = await AddressDetails.findOneAndUpdate(
            {employeeId},
            {...{local, permanent, correspondence, employeeId}},

            {new: true, upsert: true}
        )
        console.log("🚀 ~ addressDetailsHandler ~ savedAddressDetails:", savedAddressDetails)

        res.status(200).json({
            success: true,
            savedAddressDetails,
            msg: "Got Address data",
            statusCode: 200
        })
    }catch(error){
        console.log("🚀 ~ addressDetailsHandler ~ error:", error)

        res.status(500).json({
            message: "Internal server error"
        })
        
    }   
}

export default addressDetailsHandler;