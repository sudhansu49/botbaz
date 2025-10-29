// Campaign model schema
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
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
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sending', 'completed', 'failed'],
    default: 'draft'
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }],
  sentCount: {
    type: Number,
    default: 0
  },
  deliveredCount: {
    type: Number,
    default: 0
  },
  readCount: {
    type: Number,
    default: 0
  },
  repliedCount: {
    type: Number,
    default: 0
  },
  scheduledAt: {
    type: Date
  },
  sentAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Campaign', campaignSchema);