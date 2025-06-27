import mongoose from 'mongoose';

const familyMembersSchema = new mongoose.Schema({
  relationship: {
    type: String,
    enum: [
      'Spouse',
      'Son',
      'Daughter',
      'Father',
      'Sister',
      'Brother',
      'Father-in-law',
      'Mother',
      'Mother-in-law'
    ],
    required: true
  },
  title: { type: String }, // Shri, Smt., Mt., Ms.
  name: { type: String, required: true },
  surname: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  bloodGroup: { type: String },
  dob: { type: Date, required: true },
  cityOfBirth: { type: String },

  // Conditional fields
  gender: { type: String, enum: ['Male', 'Female'] }, // For children
  isWorking: { type: Boolean, default: false }, // For spouse
  // employmentDetails: {
  //   type: String,
  companyName: {type: String},
  companyType: {type: String},
    // designation: String,
    // contact: String,
  // }, // Optional, only if spouse is working
})

const familyDetailsSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  familyMembers: [familyMembersSchema],
});

const FamilyDetails = mongoose.model('familyDetails', familyDetailsSchema);
export default FamilyDetails;