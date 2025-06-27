import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";

const experienceSchema = new mongoose.Schema({
  companyName: String,
  city: String,
  designation: String,
  greenfield: String,
  grossSalary: Number,
  industry: String,
  numberOfMonths: Number,
  numberOfYears: Number,
  reasonForLeaving: String,
  relievingDate: String,
  scaleOnLeaving: String,
  startDate: String,
  wId: {
    type: String,   // ✅ correct
    required: true,
  }
  // unique ID for each experience
});

const workExperienceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  experiences: [experienceSchema],
});

const WorkExperience = mongoose.model('workExperience', workExperienceSchema);
export default WorkExperience;
