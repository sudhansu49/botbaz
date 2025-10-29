const express = require('express');
const router = express.Router();
const { 
  getCampaigns, 
  getCampaignById, 
  createCampaign, 
  updateCampaign, 
  deleteCampaign 
} = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getCampaigns)
  .post(protect, createCampaign);

router.route('/:id')
  .get(protect, getCampaignById)
  .put(protect, updateCampaign)
  .delete(protect, deleteCampaign);

module.exports = router;