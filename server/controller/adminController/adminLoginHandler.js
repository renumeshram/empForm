import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const adminLoginHandler = async (req, res)=>{
    try{
        const {userId, password} = req.body;

        if(userId !== 'Admin'|| password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({
                success: false,
                msg: "Invalid admin credentials", 
                statusCode: 401,
            })
        }

        const adminToken = jwt.sign(
            { id: 'admin', role: 'admin'},
            process.env.ADMIN_JWT_SECRET,
            { expiresIn: '1hr'}
        )

        res.status(200).json({
            success: true,
            token: adminToken,
            user: userId,
            msg: "Admin login successful",
            statusCode: 200,
        })
    }catch(error){
        console.log("🚀 ~ adminLoginHandler ~ error:", error)
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            statusCode: 500,
        })
        
    }
}

export {
    adminLoginHandler,
}