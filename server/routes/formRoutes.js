import express from 'express';

const router = express.Router();

import handlers from '../controller/empRegLogin.js';
import validateReg from '../middleware/validateRegistration.js';
import personalDetailsHandler from '../controller/personalDetails.js';
import { verifyToken } from '../middleware/authenticateLogin.js';
import {fetchPersonalDetails, fetchEducation, fetchFamily, fetchWork, fetchFinalData } from '../controller/fetchDetails.js'
import educationDetailsHandler from '../controller/educationDetails.js';
import workExperienceHandler from '../controller/workExperiences.js';

const  {registrationHandler, loginHandler} = handlers;

// router.get('/welcome', (req, res) => {
//   res.status(200).json({ message: 'Welcome! Your route is working.' });
// });

router.post('/register',validateReg, registrationHandler);

router.post('/login', loginHandler)

router.post('/personal',verifyToken, personalDetailsHandler)

router.post('/education', verifyToken, educationDetailsHandler)

router.post('/work', verifyToken, workExperienceHandler)

router.get('/personalDetails',verifyToken, fetchPersonalDetails)

router.get('/educationDetails',verifyToken, fetchEducation)

router.get('/familyDetails',verifyToken, fetchFamily)

router.get('/workDetails',verifyToken, fetchWork)

router.get('/user/form-data', verifyToken, fetchFinalData)

export default router;
