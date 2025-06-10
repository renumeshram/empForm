import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({ 
        success: false,
        msg: "Unauthorized access, No token provided",
        statusCode: 401,
    })

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user)
        next();
    
    }catch(error){
        console.log("🚀 ~ verifyToken ~ error:", error)
        res.status(403).json({
            success: false,
            msg: "Token is not valid",
            statusCode: 403,
        })
    }
}