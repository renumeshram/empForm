import Employee from '../../models/employee.js';

const changeEmployeeApplicationStatus = async (req, res) => {
    const { sapId} = req.params;
    const { isSubmitted } = req.body;
    try{
        // Find the employee by SAP ID
        const employee = await Employee.findOne({sapId}).select('-password -__v _id');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Update the employee's application status
        employee.isSubmitted = isSubmitted;
        await employee.save();

        console.log(`Application status for employee with SAP ID ${sapId} updated to ${isSubmitted}`);
        return res.status(200).json({
            success: true,
            message: 'Application status updated successfully', 
            employee
        });
    }catch (error){
        console.error('Error updating application status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

export default changeEmployeeApplicationStatus;