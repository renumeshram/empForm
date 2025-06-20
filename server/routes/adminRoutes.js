import express from 'express';

const adminRouter = express.Router();

import { adminLoginHandler } from '../controller/adminController/adminLoginHandler.js';
import { viewAllEmployeesHandler, viewEmployeeDataHandler } from '../controller/adminController/viewEmployeeDataHandler.js';
import changeEmployeeApplicationStatus from '../controller/adminController/changeEmployeeApplicationStatus.js';
import { resetAllEmployeePasswordHandler, resetEmployeePasswordHandler } from '../controller/adminController/resetEmployeePW.js';
import { validateAdminLogin, validateResetAllPassword, validateResetPassword, verifyAdminToken, adminOnly } from '../middleware/adminMiddleware/index.js';

adminRouter.post('/login',validateAdminLogin, adminLoginHandler)

adminRouter.get('/view-employee/:sapId',verifyAdminToken, adminOnly, viewEmployeeDataHandler)

adminRouter.get('/get-all-employees',verifyAdminToken, adminOnly, viewAllEmployeesHandler)

adminRouter.patch('/update-application-status/:sapId',verifyAdminToken, adminOnly,changeEmployeeApplicationStatus)

adminRouter.post('/reset-employee-password',verifyAdminToken, adminOnly, validateResetPassword, resetEmployeePasswordHandler)

adminRouter.post('/reset-all-passwords', verifyAdminToken, adminOnly, validateResetAllPassword, resetAllEmployeePasswordHandler)

export default adminRouter;