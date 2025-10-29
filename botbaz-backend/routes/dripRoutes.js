const express = require('express');
const router = express.Router();
const DripCampaignService = require('../services/dripCampaignService');
const { protect } = require('../middleware/authMiddleware');

// Initialize drip campaign service
const dripCampaignService = new DripCampaignService();

// Create drip campaign
router.post('/', protect, async (req, res) => {
  try {
    const { name, settings } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Campaign name is required' });
    }
    
    const campaign = await dripCampaignService.createDripCampaign(name, req.user.id, settings);
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all campaigns for user
router.get('/', protect, async (req, res) => {
  try {
    const campaigns = await dripCampaignService.getUserCampaigns(req.user.id);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get campaign by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const campaign = await dripCampaignService.getCampaign(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to view this campaign
    if (campaign.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update campaign status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    const campaign = await dripCampaignService.getCampaign(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to update this campaign
    if (campaign.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedCampaign = await dripCampaignService.updateCampaignStatus(req.params.id, status);
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add step to campaign
router.post('/:id/steps', protect, async (req, res) => {
  try {
    const campaign = await dripCampaignService.getCampaign(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to update this campaign
    if (campaign.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedCampaign = await dripCampaignService.addStepToCampaign(req.params.id, req.body);
    res.status(201).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Subscribe contact to campaign
router.post('/:id/subscribe', protect, async (req, res) => {
  try {
    const { contactId, triggerData } = req.body;
    
    if (!contactId) {
      return res.status(400).json({ message: 'Contact ID is required' });
    }
    
    const campaign = await dripCampaignService.getCampaign(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to subscribe to this campaign
    if (campaign.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const subscription = await dripCampaignService.subscribeContact(req.params.id, contactId, triggerData);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unsubscribe contact from campaign
router.post('/:id/unsubscribe', protect, async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    
    if (!subscriptionId) {
      return res.status(400).json({ message: 'Subscription ID is required' });
    }
    
    const subscription = await dripCampaignService.unsubscribeContact(subscriptionId);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get campaign statistics
router.get('/:id/stats', protect, async (req, res) => {
  try {
    const campaign = await dripCampaignService.getCampaign(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to view this campaign
    if (campaign.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const stats = await dripCampaignService.getCampaignStats(req.params.id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get subscriber progress
router.get('/subscriber/:subscriptionId/progress', protect, async (req, res) => {
  try {
    const progress = await dripCampaignService.getSubscriberProgress(req.params.subscriptionId);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;