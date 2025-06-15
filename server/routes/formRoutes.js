import express from 'express';

const router = express.Router();

import handlers from '../controller/empRegLogin.js';
import  { validateReg, validateChangePassword } from '../middleware/validateRegistration.js';
import personalDetailsHandler from '../controller/personalDetails.js';
import { verifyToken } from '../middleware/authenticateLogin.js';
import {fetchPersonalDetails, fetchEducation, fetchFamily, fetchWork, fetchFinalData } from '../controller/fetchDetails.js'
import educationDetailsHandler from '../controller/educationDetails.js';
import workExperienceHandler from '../controller/workExperiences.js';
import { changePassword } from '../controller/changePassword.js';
import { adminLoginHandler } from '../controller/adminController/adminLoginHandler.js';
import { viewAllEmployeesHandler, viewEmployeeDataHandler } from '../controller/adminController/viewEmployeeDataHandler.js';
import changeEmployeeApplicationStatus from '../controller/adminController/changeEmployeeApplicationStatus.js';
import { resetEmployeePasswordHandler } from '../controller/adminController/resetEmployeePW.js';

const  {registrationHandler, loginHandler} = handlers;

// router.get('/welcome', (req, res) => {
//   res.status(200).json({ message: 'Welcome! Your route is working.' });
// });

router.post('/register',validateReg, registrationHandler);

router.post('/login', loginHandler)

router.post('/personal',verifyToken, personalDetailsHandler)

router.post('/education', verifyToken, educationDetailsHandler)

router.post('/work', verifyToken, workExperienceHandler)

router.put('/changePassword', verifyToken,validateChangePassword, changePassword)

router.get('/personalDetails',verifyToken, fetchPersonalDetails)

router.get('/educationDetails',verifyToken, fetchEducation)

router.get('/familyDetails',verifyToken, fetchFamily)

router.get('/workDetails',verifyToken, fetchWork)

router.get('/user/form-data', verifyToken, fetchFinalData)

// router.patch('/user/application-status', verifyToken, changeEmployeeApplicationStatus)

router.post('/admin/login', adminLoginHandler)

router.get('/admin/view-employee/:sapId', viewEmployeeDataHandler)

router.get('/admin/get-all-employees', viewAllEmployeesHandler)

router.patch('/admin/update-application-status/:sapId', changeEmployeeApplicationStatus)

router.post('/admin/reset-employee-password', resetEmployeePasswordHandler)

export default router;
