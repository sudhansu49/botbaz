const express = require('express');
const router = express.Router();
const AnalyticsService = require('../services/analyticsService');
const { protect } = require('../middleware/authMiddleware');

// Initialize analytics service
const analyticsService = new AnalyticsService();

// Record message event
router.post('/events', protect, async (req, res) => {
  try {
    const { eventType, data } = req.body;
    
    if (!eventType) {
      return res.status(400).json({ message: 'Event type is required' });
    }
    
    const event = await analyticsService.recordMessageEvent(eventType, { ...data, userId: req.user.id });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get campaign performance metrics
router.get('/campaigns/:campaignId/performance', protect, async (req, res) => {
  try {
    const { timeframe } = req.query;
    const metrics = await analyticsService.getCampaignPerformance(req.params.campaignId, timeframe);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user engagement metrics
router.get('/engagement', protect, async (req, res) => {
  try {
    const { timeframe } = req.query;
    const metrics = await analyticsService.getUserEngagement(req.user.id, timeframe);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get chatbot performance metrics
router.get('/chatbots/:flowId/performance', protect, async (req, res) => {
  try {
    const { timeframe } = req.query;
    const metrics = await analyticsService.getChatbotPerformance(req.params.flowId, timeframe);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team performance metrics
router.get('/team/performance', protect, async (req, res) => {
  try {
    const { timeframe } = req.query;
    const metrics = await analyticsService.getTeamPerformance(req.user.id, timeframe);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard metrics
router.get('/dashboard', protect, async (req, res) => {
  try {
    const metrics = await analyticsService.getDashboardMetrics(req.user.id);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get comparative analytics
router.get('/compare/:compareUserId', protect, async (req, res) => {
  try {
    const metrics = await analyticsService.getComparativeAnalytics(req.user.id, req.params.compareUserId);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;