const express = require('express');
const router = express.Router();
const { validateEnquiryForm } = require('../middleware/Validator');
const enquiryController = require('../controller/EnquiryController');

// Get all enquiries
router.get('/getdata', enquiryController.getAllEnquiries);

// Get single enquiry
router.get('/getdata/:id', enquiryController.getEnquiryById);

// Create new enquiry
router.post('/adddata', enquiryController.createEnquiryForm);

// Update enquiry
router.put('/editdata/:id', enquiryController.updateEnquiry);

// Delete enquiry
router.delete('/deletedata/:id', enquiryController.deleteEnquiry);

module.exports = router;