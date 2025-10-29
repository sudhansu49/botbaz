const express = require('express');
const router = express.Router();
const SmartInboxService = require('../services/smartInboxService');
const { protect } = require('../middleware/authMiddleware');

// Initialize smart inbox service
const smartInboxService = new SmartInboxService();

// Create or update conversation
router.post('/conversations', protect, async (req, res) => {
  try {
    const { contactId, message, metadata } = req.body;
    
    if (!contactId || !message) {
      return res.status(400).json({ message: 'Contact ID and message are required' });
    }
    
    const conversation = await smartInboxService.upsertConversation(contactId, message, metadata);
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get conversations with filters
router.get('/conversations', protect, async (req, res) => {
  try {
    const filters = req.query;
    const conversations = await smartInboxService.getConversations(filters);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get conversation by ID
router.get('/conversations/:id', protect, async (req, res) => {
  try {
    const conversation = await smartInboxService.getConversation(req.params.id);
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign conversation to agent
router.put('/conversations/:id/assign', protect, async (req, res) => {
  try {
    const { agentId } = req.body;
    
    if (!agentId) {
      return res.status(400).json({ message: 'Agent ID is required' });
    }
    
    const conversation = await smartInboxService.assignConversation(req.params.id, agentId);
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tag conversation
router.put('/conversations/:id/tag', protect, async (req, res) => {
  try {
    const { tag } = req.body;
    
    if (!tag) {
      return res.status(400).json({ message: 'Tag is required' });
    }
    
    const conversation = await smartInboxService.tagConversation(req.params.id, tag);
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update conversation status
router.put('/conversations/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    const conversation = await smartInboxService.updateConversationStatus(req.params.id, status);
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search conversations
router.get('/conversations/search/:query', protect, async (req, res) => {
  try {
    const conversations = await smartInboxService.searchConversations(req.params.query);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team inbox summary
router.get('/team-summary', protect, async (req, res) => {
  try {
    const summary = await smartInboxService.getTeamInboxSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get agent stats
router.get('/agents/:id/stats', protect, async (req, res) => {
  try {
    const stats = await smartInboxService.getAgentStats(req.params.id);
    
    if (!stats) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;