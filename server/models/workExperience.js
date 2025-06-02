import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  companyName: String,
  role: String,
  startDate: Date,
  endDate: Date,
  responsibilities: String,
});

const workExperienceSchema = new mongoose.Schema({
  sapId: { type: String, required: true, unique: true },
  experiences: [experienceSchema],
});

const WorkExperience = mongoose.model('workExperience', workExperienceSchema);
export default WorkExperience;
