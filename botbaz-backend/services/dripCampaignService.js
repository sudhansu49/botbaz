// Drip Campaign Service for BotBaz
class DripCampaignService {
  constructor() {
    this.campaigns = new Map();
    this.subscribers = new Map();
  }

  // Create drip campaign
  async createDripCampaign(name, userId, settings = {}) {
    const campaignId = `drip_${Date.now()}`;
    
    const campaign = {
      id: campaignId,
      name,
      userId,
      status: 'draft',
      steps: [],
      subscribers: [],
      settings: {
        triggerEvent: settings.triggerEvent || 'contact_added',
        sendDelay: settings.sendDelay || 0,
        ...settings
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  // Add step to drip campaign
  async addStepToCampaign(campaignId, stepData) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    const step = {
      id: `step_${Date.now()}`,
      ...stepData,
      position: campaign.steps.length + 1,
      createdAt: new Date()
    };
    
    campaign.steps.push(step);
    campaign.updatedAt = new Date();
    
    return campaign;
  }

  // Subscribe contact to drip campaign
  async subscribeContact(campaignId, contactId, triggerData = {}) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    const subscriptionId = `sub_${contactId}_${Date.now()}`;
    
    const subscription = {
      id: subscriptionId,
      campaignId,
      contactId,
      status: 'active',
      currentStep: 0,
      nextStepAt: this.calculateNextStepTime(campaign, 0),
      triggerData,
      enrolledAt: new Date(),
      lastActivityAt: new Date()
    };
    
    this.subscribers.set(subscriptionId, subscription);
    
    if (!campaign.subscribers.includes(subscriptionId)) {
      campaign.subscribers.push(subscriptionId);
    }
    
    campaign.updatedAt = new Date();
    
    return subscription;
  }

  // Calculate next step time
  calculateNextStepTime(campaign, stepIndex) {
    if (stepIndex >= campaign.steps.length) {
      return null;
    }
    
    const step = campaign.steps[stepIndex];
    const delay = step.delay || 0;
    
    return new Date(Date.now() + (delay * 60 * 1000)); // delay in minutes
  }

  // Process drip campaigns (to be called by scheduler)
  async processDripCampaigns() {
    const now = new Date();
    const activeSubscriptions = Array.from(this.subscribers.values())
      .filter(sub => sub.status === 'active');
    
    for (const subscription of activeSubscriptions) {
      const campaign = this.campaigns.get(subscription.campaignId);
      if (!campaign || campaign.status !== 'active') {
        continue;
      }
      
      // Check if it's time to send the next step
      if (subscription.nextStepAt && subscription.nextStepAt <= now) {
        await this.sendNextStep(subscription, campaign);
      }
    }
  }

  // Send next step in drip campaign
  async sendNextStep(subscription, campaign) {
    if (subscription.currentStep >= campaign.steps.length) {
      // Campaign completed for this subscriber
      subscription.status = 'completed';
      subscription.lastActivityAt = new Date();
      return;
    }
    
    const step = campaign.steps[subscription.currentStep];
    
    // Send the message (this would integrate with WhatsApp service)
    console.log(`Sending drip campaign step ${step.position} to contact ${subscription.contactId}`);
    console.log(`Message: ${step.message}`);
    
    // Update subscription
    subscription.currentStep++;
    subscription.nextStepAt = this.calculateNextStepTime(campaign, subscription.currentStep);
    subscription.lastActivityAt = new Date();
    
    // If this was the last step, mark as completed
    if (subscription.currentStep >= campaign.steps.length) {
      subscription.status = 'completed';
    }
  }

  // Update campaign status
  async updateCampaignStatus(campaignId, status) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    campaign.status = status;
    campaign.updatedAt = new Date();
    
    return campaign;
  }

  // Get campaign by ID
  async getCampaign(campaignId) {
    return this.campaigns.get(campaignId);
  }

  // Get all campaigns for user
  async getUserCampaigns(userId) {
    return Array.from(this.campaigns.values())
      .filter(campaign => campaign.userId === userId);
  }

  // Get campaign statistics
  async getCampaignStats(campaignId) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    const subscriptions = campaign.subscribers
      .map(id => this.subscribers.get(id))
      .filter(Boolean);
    
    return {
      totalSubscribers: subscriptions.length,
      activeSubscribers: subscriptions.filter(s => s.status === 'active').length,
      completedSubscribers: subscriptions.filter(s => s.status === 'completed').length,
      steps: campaign.steps.length,
      createdAt: campaign.createdAt
    };
  }

  // Unsubscribe contact from campaign
  async unsubscribeContact(subscriptionId) {
    const subscription = this.subscribers.get(subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    subscription.status = 'unsubscribed';
    subscription.lastActivityAt = new Date();
    
    return subscription;
  }

  // Get subscriber progress
  async getSubscriberProgress(subscriptionId) {
    const subscription = this.subscribers.get(subscriptionId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    const campaign = this.campaigns.get(subscription.campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    return {
      subscription,
      campaign,
      progress: {
        currentStep: subscription.currentStep,
        totalSteps: campaign.steps.length,
        completionPercentage: campaign.steps.length > 0 
          ? Math.round((subscription.currentStep / campaign.steps.length) * 100)
          : 0
      }
    };
  }
}

module.exports = DripCampaignService;