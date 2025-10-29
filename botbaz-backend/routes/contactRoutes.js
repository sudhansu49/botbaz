const express = require('express');
const router = express.Router();
const { 
  getContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getContacts)
  .post(protect, createContact);

router.route('/:id')
  .get(protect, getContactById)
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;