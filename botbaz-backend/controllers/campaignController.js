const Campaign = require('../models/Campaign');

// Get all campaigns for user
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.user.id });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to view this campaign
    if (campaign.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create campaign
const createCampaign = async (req, res) => {
  try {
    const { name, templateId, recipients, scheduledAt } = req.body;
    
    const campaign = new Campaign({
      name,
      userId: req.user.id,
      templateId,
      recipients,
      scheduledAt
    });
    
    const createdCampaign = await campaign.save();
    res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to update this campaign
    if (campaign.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { name, templateId, recipients, scheduledAt, status } = req.body;
    
    campaign.name = name || campaign.name;
    campaign.templateId = templateId || campaign.templateId;
    campaign.recipients = recipients || campaign.recipients;
    campaign.scheduledAt = scheduledAt || campaign.scheduledAt;
    campaign.status = status || campaign.status;
    
    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to delete this campaign
    if (campaign.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await campaign.remove();
    res.json({ message: 'Campaign removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
};