import mongoose from 'mongoose';

const addressDetailsSchema = new mongoose.Schema({
  
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },

  permanent: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    pincode: Number,
    postOffice: String,
    policeStation: String,
  },
  local: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    pincode: Number,
    postOffice: String,
    policeStation: String,
  },
  correspondence: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    state: String,
    pincode: String,
    postOffice: String,
    policeStation: String,
  },
});

const AddressDetails = mongoose.model('addressDetails', addressDetailsSchema);
export default AddressDetails;
