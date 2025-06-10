import Employee from '../models/employee.js';
import bcrypt from 'bcrypt';

export const changePassword = async (req, res) => {
    const { sapId, oldPassword, newPassword } = req.body;
    const token = req.user.id;

    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Unauthorized access'
        });
    }

    try {
        const employee = await Employee.findOne({ sapId }).select('+password');

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, employee.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Your Old password is incorrect' });
        }

        employee.password = newPassword;
        await employee.save();

        console.log("Password changed successfully for employee:", sapId);
        // Optionally, you can log out the user or invalidate the session here  
        
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Password changed successfully',
        });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error'
        });
    }
}