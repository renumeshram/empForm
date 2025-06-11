import Employee from '../../models/employee';

const viewEmployeeDataHandler = async(req , res) =>{
    try{
        const { sapId } = req.params;

        if(!sapId){
               return res.status(400).json({
                success: false,
                msg: "Employee ID is required",
                statusCode: 400
            }); 
        }

        //find employee
        const employee = await Employee.findOne({sapId});

        if (!employee) {
            return res.status(404).json({
                success: false,
                msg: "Employee not found",
                statusCode: 404
            });
        }

        // You might need to fetch additional data from other collections
        // based on your database structure for personal, education, family, etc.
        // For now, returning employee data
        
        res.status(200).json({
            success: true,
            msg: "Employee data retrieved successfully",
            statusCode: 200,
            data: employee
        });
    } catch (error) {
        console.log("🚀 ~ viewEmployeeDataHandler ~ error:", error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error',
            statusCode: 500
        });
    }
    
}

// View All Employees Data (Tabular)
const viewAllEmployeesHandler = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get all employees sorted by sapId, excluding password
        const employees = await Employee.find({})
            .select('-password')
            .sort({ sapId: 1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const totalEmployees = await Employee.countDocuments({});
        const totalPages = Math.ceil(totalEmployees / limit);

        res.status(200).json({
            success: true,
            msg: "All employees data retrieved successfully",
            statusCode: 200,
            data: {
                employees,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalEmployees,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        });

    }catch (error) {
        console.log("🚀 ~ viewAllEmployeesHandler ~ error:", error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error',
            statusCode: 500
        });
    }
};


export {
    viewEmployeeDataHandler,
    viewAllEmployeesHandler
};