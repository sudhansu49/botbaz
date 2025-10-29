// Campaign Service
const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const Template = require('../models/Template');
const WhatsAppService = require('./whatsappService');

class CampaignService {
  constructor() {
    this.whatsappService = new WhatsAppService();
  }

  // Send campaign messages
  async sendCampaign(campaignId) {
    try {
      // Get campaign details
      const campaign = await Campaign.findById(campaignId).populate('templateId');
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      // Get recipients
      const contacts = await Contact.find({
        _id: { $in: campaign.recipients }
      });

      // Get template
      const template = await Template.findById(campaign.templateId);
      if (!template) {
        throw new Error('Template not found');
      }

      // Send messages to each contact
      let sentCount = 0;
      let deliveredCount = 0;
      let readCount = 0;
      let repliedCount = 0;

      for (const contact of contacts) {
        try {
          // Send template message
          const result = await this.whatsappService.sendTemplateMessage(
            contact.phone,
            template.name,
            template.language
          );

          if (result.messages && result.messages[0]) {
            sentCount++;
            // Update contact last contacted
            contact.lastContacted = new Date();
            await contact.save();
          }
        } catch (error) {
          console.error(`Error sending message to ${contact.phone}:`, error);
        }
      }

      // Update campaign stats
      campaign.sentCount = sentCount;
      campaign.deliveredCount = deliveredCount;
      campaign.readCount = readCount;
      campaign.repliedCount = repliedCount;
      campaign.status = 'completed';
      campaign.completedAt = new Date();

      await campaign.save();

      return campaign;
    } catch (error) {
      console.error('Error sending campaign:', error);
      throw error;
    }
  }

  // Schedule campaign
  async scheduleCampaign(campaignId, scheduledTime) {
    try {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      campaign.scheduledAt = scheduledTime;
      campaign.status = 'scheduled';

      await campaign.save();

      return campaign;
    } catch (error) {
      console.error('Error scheduling campaign:', error);
      throw error;
    }
  }

  // Get campaign analytics
  async getCampaignAnalytics(campaignId) {
    try {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      const analytics = {
        totalRecipients: campaign.recipients.length,
        sentCount: campaign.sentCount,
        deliveredCount: campaign.deliveredCount,
        readCount: campaign.readCount,
        repliedCount: campaign.repliedCount,
        deliveryRate: campaign.sentCount > 0 ? (campaign.deliveredCount / campaign.sentCount) * 100 : 0,
        readRate: campaign.sentCount > 0 ? (campaign.readCount / campaign.sentCount) * 100 : 0,
        replyRate: campaign.sentCount > 0 ? (campaign.repliedCount / campaign.sentCount) * 100 : 0
      };

      return analytics;
    } catch (error) {
      console.error('Error getting campaign analytics:', error);
      throw error;
    }
  }
}

module.exports = CampaignService;