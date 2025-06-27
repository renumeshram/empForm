import express from 'express';

const router = express.Router();

import handlers from '../controller/empRegLogin.js';
import  { validateReg, validateChangePassword, validateLogin } from '../middleware/validateRegistration.js';
import personalDetailsHandler from '../controller/personalDetails.js';
import { verifyToken } from '../middleware/authenticateLogin.js';
import {fetchPersonalDetails, fetchEducation, fetchFamily, fetchWork, fetchFinalData, fetchAddress } from '../controller/fetchDetails.js'
import educationDetailsHandler from '../controller/educationDetails.js';
import workExperienceHandler from '../controller/workExperiences.js';
import { changePassword } from '../controller/changePassword.js';
import familyDetailsHandler from '../controller/familyDetails.js';
import addressDetailsHandler from '../controller/addressDetails.js';


const  {registrationHandler, loginHandler} = handlers;

// router.get('/welcome', (req, res) => {
//   res.status(200).json({ message: 'Welcome! Your route is working.' });
// });

router.post('/register',validateReg, registrationHandler);

router.post('/login', validateLogin,loginHandler)

router.post('/personal',verifyToken, personalDetailsHandler)

router.post('/education', verifyToken, educationDetailsHandler)

router.post('/family', verifyToken, familyDetailsHandler)

router.post('/address', verifyToken, addressDetailsHandler)

router.post('/work', verifyToken, workExperienceHandler)

router.put('/changePassword', verifyToken,validateChangePassword, changePassword)

router.get('/personalDetails',verifyToken, fetchPersonalDetails)

router.get('/educationDetails',verifyToken, fetchEducation)

router.get('/familyDetails',verifyToken, fetchFamily)

router.get('/addressDetails', verifyToken, fetchAddress)

router.get('/workDetails',verifyToken, fetchWork)

router.get('/user/form-data', verifyToken, fetchFinalData)

//admin routes

export default router;
