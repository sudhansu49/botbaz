const express = require('express');
const router = express.Router();
const AIService = require('../services/aiService');
const { protect } = require('../middleware/authMiddleware');

// Initialize AI service
const aiService = new AIService();

// Generate reply suggestions
router.post('/reply-suggestions', protect, async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    const suggestions = await aiService.generateReplySuggestions(message, context);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Analyze sentiment
router.post('/sentiment', protect, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    const sentiment = await aiService.analyzeSentiment(message);
    res.json({ sentiment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Score lead
router.post('/lead-score', protect, async (req, res) => {
  try {
    const { message, contactInfo } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    const score = await aiService.scoreLead(message, contactInfo);
    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate template
router.post('/generate-template', protect, async (req, res) => {
  try {
    const { message, category } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    const template = await aiService.generateTemplate(message, category);
    res.json({ template });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Translate message
router.post('/translate', protect, async (req, res) => {
  try {
    const { message, targetLanguage } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
    
    const translated = await aiService.translateMessage(message, targetLanguage);
    res.json({ translated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;