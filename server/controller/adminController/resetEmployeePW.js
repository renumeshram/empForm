import Employee from "../../models/employee";

const resetEmployeePasswordHandler = async(req , res)=>{
    try{
        const { sapId, password} = req.body;

        if(!sapId || !password){
            return res.status(400).json({
                success: false,
                msg: "Employee ID and new password are required",
                statusCode: 400
            });
        }

        const employee = await Employee.findOne({ sapId}).select('+password');

        if(!employee){
             return res.status(404).json({
                success: false,
                msg: "Employee not found",
                statusCode: 404
            });
        }

        //update password
        employee.password = password;
        await employee.save();

        console.log(`Password reset for employee: ${sapId}`);

        res.status(200).json({
            success: true,
            msg: `Password reset successfully for employee ${empId}`,
            statusCode: 200
        });
    }catch(error){
        console.log("🚀 ~ resetEmployeePasswordHandler ~ error:", error)
        
        res.status(500).json({
            success: false,
            msg: 'Internal server error',
            statusCode: 500
        });
    }
}

//reset all employees password

const resetAllEmployeePasswordHandler = async(req, res)=>{
    try{
        const { password} =req.body;

    

    if (!password) {
            return res.status(400).json({
                success: false,
                msg: "New password is required",
                statusCode: 400
            });
        }

        //password validation

        // if (password.length < 6) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: "Password must be at least 6 characters long",
        //         statusCode: 400
        //     });
        // }


        //get all employees
        const employees = await Employee.find({});

        if(employees.length === 0){
            return res.status(404).json({
                success: false,
                msg: "No employees found",
                statusCode: 404,
            })
        }

        //update all passwords
        const updatePromises = employees.map(employee =>{
            employee.password = password;
            return employee.save();

        });

        await Promise.all(updatePromises);

        console.log(`Password reset for ${employees.length} employees`);

        res.status(200).json({
            success: true,
            msg: `Password reset successfully for ${employees.length} employees`,
            statusCode: 200,
            affectedEmployees: employees.length
        });

    }catch (error) {
        console.log("🚀 ~ resetAllPasswordsHandler ~ error:", error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error',
            statusCode: 500
        });
    }
}

export {
    resetEmployeePasswordHandler,
    resetAllEmployeePasswordHandler,
}