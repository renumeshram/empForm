import mongoose from 'mongoose';
import { v4 as uuidv4} from 'uuid';

const completeEducationSchema = new mongoose.Schema({
  eId : {
    type: String,
    default: uuidv4(),
  }, //unique identifier
  educationType: String,
  instituteName: String,
  certificateType: String,
  duration: String,
  grade: String,
  medium: String,
  hindiSubjectLevel: String,
  startDate: Date,
  passingDate: Date,
  courseDetails: String,
  specialization: String,
})

const educationDetailsSchema = new mongoose.Schema({
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    education: {
        type: [completeEducationSchema],
        default: [],
    }
})

const EducationDetails = mongoose.model('educationDetails', educationDetailsSchema);
export default EducationDetails;