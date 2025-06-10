const validateReg = (req, res, next)=>{
    const { email, sapId, password, cpassword } = req.body;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!?*&])[a-zA-Z\d@#$%!?*&]{8,}$/

    if ([email, sapId, password, cpassword].some((field) => field?.trim() === "")) {
        return res.status(400).json("All fields are required...")
    }

    if (!passwordRegex.test(password)) return res.status(400).json("Password must be of minimum 8 charcter and contain digits, lowercase, uppercase and special characters");

    next()
}

const validateChangePassword = (req, res, next) => {
    const { sapId, oldPassword, newPassword } = req.body;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!?*&])[a-zA-Z\d@#$%!?*&]{8,}$/

    if ([sapId, oldPassword, newPassword].some((field) => field?.trim() === "")) {
        return res.status(400).json("All fields are required...");
    }

    if(!passwordRegex.test(newPassword)) {
        return res.status(400).json("New Password must be of minimum 8 characters and contain digits, lowercase, uppercase and special characters");
    }

    next();
}

export {
    validateReg,
    validateChangePassword,
} 