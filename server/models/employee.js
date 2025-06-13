import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  sapId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
});

employeeSchema.pre("save",
  async function (next) {
    try {
      if (this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    } catch (error) {
      return next(error);
    }
})

employeeSchema.methods.checkpw = function(password, cb){
  bcrypt.compare(password, this.password, (err, result)=>{
    return cb(err, result);
  })
}

export default mongoose.model('Employee', employeeSchema);
