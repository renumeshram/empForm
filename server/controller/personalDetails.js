import express from 'express'
import mongoose from 'mongoose';

import PersonalDetails from '../models/personalDetails.js';

const personalDetailsHandler = async (req, res) => {

    try {
        // const { title, firstName, lastName, gender, dob, mobile, adhaarId, birthplace, state, religion, category, subCategory, idMark1, idMark2, exServiceman, isDisabled, motherTongue,  otherMotherTongue, hindiKnowledge, langHindiRead, langHindiWrite, langHindiSpeak } = req.body;

        const personalDetails = req.body;

        // const employeeId = req.session.employeeId|| new mongoose.Types.ObjectId('683be24811d60ea20f74d5ac');
        const employeeId = req.user.id;

        if (!employeeId) {
            return res.status(401).json({ message: "Unauthorized: Employee ID missing" });
        }

        console.log(req.body)
        console.log("Received Personal Details:", personalDetails);

        const savedDetails = await PersonalDetails.findOneAndUpdate(
            {employeeId },
            { ...personalDetails, employeeId },

            { new: true, upsert: true }
        );

        res.status(200).json(savedDetails);



    } catch (error) {
        console.log("🚀 ~ personalDetailsHandler ~ error:", error)

        res.status(500).json({ message: "Internal server error" });

    }

}

export default personalDetailsHandler