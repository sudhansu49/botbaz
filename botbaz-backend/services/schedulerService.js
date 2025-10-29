// Scheduler Service for BotBaz
const cron = require('node-cron');

class SchedulerService {
  constructor() {
    this.jobs = new Map();
    this.dripCampaignService = null;
  }

  // Set drip campaign service reference
  setDripCampaignService(service) {
    this.dripCampaignService = service;
  }

  // Schedule a job
  scheduleJob(name, schedule, task, options = {}) {
    // Validate cron expression
    if (!cron.validate(schedule)) {
      throw new Error('Invalid cron expression');
    }
    
    // Cancel existing job with same name
    if (this.jobs.has(name)) {
      this.jobs.get(name).stop();
    }
    
    // Create new job
    const job = cron.schedule(schedule, task, {
      scheduled: options.scheduled !== false,
      timezone: options.timezone || 'UTC'
    });
    
    this.jobs.set(name, job);
    
    return job;
  }

  // Schedule drip campaign processing
  scheduleDripCampaigns() {
    if (!this.dripCampaignService) {
      throw new Error('Drip campaign service not set');
    }
    
    return this.scheduleJob(
      'process-drip-campaigns',
      '*/5 * * * *', // Every 5 minutes
      () => {
        console.log('Processing drip campaigns...');
        this.dripCampaignService.processDripCampaigns()
          .catch(err => console.error('Error processing drip campaigns:', err));
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Schedule daily analytics report
  scheduleDailyAnalytics(userId) {
    return this.scheduleJob(
      `daily-analytics-${userId}`,
      '0 0 * * *', // Every day at midnight
      async () => {
        console.log(`Generating daily analytics report for user ${userId}`);
        // Implementation would integrate with analytics service
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Schedule weekly engagement report
  scheduleWeeklyEngagementReport(userId) {
    return this.scheduleJob(
      `weekly-engagement-${userId}`,
      '0 0 * * 1', // Every Monday at midnight
      async () => {
        console.log(`Generating weekly engagement report for user ${userId}`);
        // Implementation would integrate with analytics service
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Schedule monthly billing report
  scheduleMonthlyBilling(userId) {
    return this.scheduleJob(
      `monthly-billing-${userId}`,
      '0 0 1 * *', // First day of every month
      async () => {
        console.log(`Generating monthly billing report for user ${userId}`);
        // Implementation would integrate with billing service
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Schedule abandoned cart reminders
  scheduleAbandonedCartReminders() {
    return this.scheduleJob(
      'abandoned-cart-reminders',
      '0 */30 * * * *', // Every 30 minutes
      async () => {
        console.log('Checking for abandoned carts...');
        // Implementation would check for carts and send reminders
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Schedule campaign follow-ups
  scheduleCampaignFollowUps() {
    return this.scheduleJob(
      'campaign-follow-ups',
      '0 0 9 * * *', // Every day at 9 AM
      async () => {
        console.log('Sending campaign follow-ups...');
        // Implementation would send follow-up messages
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Schedule data cleanup
  scheduleDataCleanup() {
    return this.scheduleJob(
      'data-cleanup',
      '0 0 2 * * *', // Every day at 2 AM
      async () => {
        console.log('Performing data cleanup...');
        // Implementation would clean up old data
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Schedule backup
  scheduleBackup() {
    return this.scheduleJob(
      'database-backup',
      '0 0 3 * * 0', // Every Sunday at 3 AM
      async () => {
        console.log('Performing database backup...');
        // Implementation would backup database
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Get all scheduled jobs
  getScheduledJobs() {
    return Array.from(this.jobs.keys());
  }

  // Get job status
  getJobStatus(name) {
    const job = this.jobs.get(name);
    if (!job) {
      return null;
    }
    
    return {
      name,
      running: job.running,
      nextExecution: job.nextExecution(),
      lastExecution: job.lastExecution()
    };
  }

  // Start job
  startJob(name) {
    const job = this.jobs.get(name);
    if (!job) {
      throw new Error('Job not found');
    }
    
    job.start();
    return true;
  }

  // Stop job
  stopJob(name) {
    const job = this.jobs.get(name);
    if (!job) {
      throw new Error('Job not found');
    }
    
    job.stop();
    return true;
  }

  // Remove job
  removeJob(name) {
    const job = this.jobs.get(name);
    if (!job) {
      return false;
    }
    
    job.stop();
    this.jobs.delete(name);
    return true;
  }

  // Schedule contextual personalization tasks
  scheduleContextualPersonalization() {
    // Schedule different tasks based on time of day
    this.scheduleJob(
      'morning-personalization',
      '0 0 9 * * *', // 9 AM
      async () => {
        console.log('Running morning personalization tasks...');
        // Morning-specific personalization logic
      },
      { timezone: 'Asia/Kolkata' }
    );
    
    this.scheduleJob(
      'afternoon-personalization',
      '0 0 14 * * *', // 2 PM
      async () => {
        console.log('Running afternoon personalization tasks...');
        // Afternoon-specific personalization logic
      },
      { timezone: 'Asia/Kolkata' }
    );
    
    this.scheduleJob(
      'evening-personalization',
      '0 0 18 * * *', // 6 PM
      async () => {
        console.log('Running evening personalization tasks...');
        // Evening-specific personalization logic
      },
      { timezone: 'Asia/Kolkata' }
    );
  }

  // Initialize all default schedules
  initializeDefaultSchedules() {
    try {
      // Schedule drip campaigns processing
      this.scheduleDripCampaigns();
      
      // Schedule data cleanup
      this.scheduleDataCleanup();
      
      // Schedule abandoned cart reminders
      this.scheduleAbandonedCartReminders();
      
      // Schedule campaign follow-ups
      this.scheduleCampaignFollowUps();
      
      // Schedule contextual personalization
      this.scheduleContextualPersonalization();
      
      console.log('Default schedules initialized');
      return true;
    } catch (error) {
      console.error('Error initializing default schedules:', error);
      return false;
    }
  }
}

module.exports = SchedulerService;