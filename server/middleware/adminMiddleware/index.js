import jwt from 'jsonwebtoken';

const verifyAdminToken = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Unauthorized access. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        // req.user.adminId = decoded.id; // Assuming the admin ID is stored in the token
        // req.user.role = decoded.role;
        req.user = decoded; // assigning Admin credentials 
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({
            success: false,
            msg: "Forbidden. Invalid token.",
        });
    }

}

const validateAdminLogin = (req, res, next) => {
    const {userId, password} =req.body;

    if([userId,password].some((field)=> field?.trim() === "")){
        return res.status(400).json({
            success: false,
            msg: "All fields are required...",
        });
    }

    next();
}


const validateResetPassword = (req, res, next) =>{
    const {sapId, password} = req.body;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!?*&])[a-zA-Z\d@#$%!?*&]{8,}$/

    if([sapId, password].some((field) => field?.trim()=== "")){
        return res.status(400).json({
            success: false,
            msg: "All fields are required...",
        })
    }

    if(!passwordRegex.test(password)){
        return res.status(400).json({
            success: false,
            msg: "Password must be of minimum 8 charcter and contain digits, lowercase, uppercase and special characters",
        })
    }

    next();
}

const validateResetAllPassword = (req, res, next) =>{
    const { password} = req.body;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!?*&])[a-zA-Z\d@#$%!?*&]{8,}$/
    if(!password|| password.trim() === ""){
        return res.status(400).json({
            success: false,
            msg: "Password is required...",
        })
    }
    // password = password.trim();
    if(!passwordRegex.test(password)){
        return res.status(400).json({
            success: false,
            msg: "Password must be of minimum 8 charcter and contain digits, lowercase, uppercase and special characters",
        })
    }

    next();
}

const adminOnly = (req , res, next)=>{
    if(req.user?.adminId !== 'admin' && req.user?.role !== 'admin'){
        res.status(403).json({
            msg: "Access denied!"
        })
    }

    next();
}

export {
    verifyAdminToken,
    adminOnly,
    validateAdminLogin,
    validateResetPassword, 
    validateResetAllPassword,
}