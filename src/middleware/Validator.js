// middleware/validation.js
const { body } = require('express-validator');

exports.validateEnquiryForm = [
  body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('middle  Name').trim().isLength({ min: 2 }).withMessage('Middle name must be at least 2 characters'),
  body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('phoneNumber').matches(/^[0-9]{10}$/).withMessage('Invalid phone number format'),
  body('currentStd').notEmpty().withMessage('Current standard is required'),
  body('previousMarks').notEmpty().withMessage('Previous marks are required'),
  body('schoolName').trim().notEmpty().withMessage('School name is required'),
  body('branch').isIn(['Paldi Branch', 'Makarba Branch']).withMessage('Invalid branch selection'),
  body('subjects').isArray().withMessage('Subjects must be an array')
    .custom((subjects) => {
      const validSubjects = ['Mathematics', 'Science', 'Social Studies', 'English', 'Gujarati', 'Hindi', 'Sanskrit'];
      return subjects.every(subject => validSubjects.includes(subject));
    }).withMessage('Invalid subject selection'),
  body('address').trim().notEmpty().withMessage('Address is required')
];