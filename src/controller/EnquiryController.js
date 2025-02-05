// controllers/enquiryController.js
const { validationResult } = require('express-validator');
const StudentEnquiry = require('../models/EnquiryForm');

// Get all enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await StudentEnquiry.find();
    res.status(201).json({
      data: enquiries,
      message:"Succesfully got every entry"
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching enquiries' });
  }
};

// Get single enquiry by ID
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await StudentEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching enquiry' });
  }
};

// Create new enquiry
const createEnquiryForm = async (req, res) => {
  const newEnquiry = {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    phoneNumber:req.body.phoneNumber,
    currentStd: req.body.currentStd,
    previousMarks :req.body.previousMarks,
    schoolName : req.body.schoolName,
    branch : req.body.branch,
    subjects: req.body.subjects,
    address: req.body.address
  };

  const insertedquery = await StudentEnquiry.create(newEnquiry);
  if(insertedquery){
    res.status(200).json({
      data :insertedquery,
      message: "data inserted successfully"
    })
  }else{
    res.status(404).json({
      message: "data not inserted successfully"
    })
  }
};

// Update enquiry
const updateEnquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedEnquiry = await StudentEnquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json(updatedEnquiry);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error updating enquiry' });
  }
};

// Delete enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const deletedEnquiry = await StudentEnquiry.findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting enquiry' });
  }
};

module.exports = {
    createEnquiryForm,
    getAllEnquiries,
    getEnquiryById,
    updateEnquiry,
    deleteEnquiry
}