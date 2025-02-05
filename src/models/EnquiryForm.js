const mongoose = require('mongoose')
const schema = mongoose.Schema;

const studentEnquirySchema = new schema({
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters']
    },
    // middleName: {
    //   type: String,
    //   required: [true, 'Middle name is required'],
    //   trim: true,
    //   minlength: [2, 'Middle name must be at least 2 characters']
    // },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    currentStd: {
      type: String,
      required: [true, 'Current standard is required']
    },
    previousMarks: {
      type: String,
      required: [true, 'Previous marks are required']
    },
    schoolName: {
      type: String,
      required: [true, 'School name is required'],
      trim: true
    },
    branch: {
      type: String,
      required: [true, 'Branch selection is required'],
      enum: {
        values: ['Paldi Branch', 'Makarba Branch'],
        message: '{VALUE} is not a valid branch'
      }
    },
    subjects: [{
      type: String,
      enum: {
        values: ['Mathematics', 'Science', 'Social Studies', 'English', 'Gujarati', 'Hindi', 'Sanskrit'],
        message: '{VALUE} is not a valid subject'
      }
    }],
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    enquiryDate: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('StudentEnquiry', studentEnquirySchema);