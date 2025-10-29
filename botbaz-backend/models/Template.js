// Template model schema
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['MARKETING', 'UTILITY', 'AUTHENTICATION'],
    required: true
  },
  language: {
    type: String,
    default: 'en'
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  variables: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Template', templateSchema);