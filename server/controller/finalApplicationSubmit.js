// import Employee from '../models/employee.js';

// const finalApplicationSubmit = async (req, res) => {
//     try{
//         const employeeId = req.user.id;
//         const {status} = req.body;

//         const employee = await Employee.findById(employeeId);
//         if (!employee) {
//             return res.status(404).json({ 
//                 success: false,
//                 statusCode: 404,
//                 message: 'Employee not found' 
//             });
//         }

//         employee.isSubmitted = status;
//         await employee.save();
//         console.log(`Final application submitted for employee: ${employeeId}`);
//         return res.status(200).json({
//             success: true,
//             statusCode: 200,
//             message: 'Final application submitted successfully',
//             employee
//         });
//     }catch(error){
//         console.error('Error submitting final application:', error);
//         return res.status(500).json({
//             success: false,
//             statusCode: 500,
//             message: 'Internal server error'
//         });
//     }
// }