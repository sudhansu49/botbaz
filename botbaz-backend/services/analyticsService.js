// Advanced Analytics Service for BotBaz
class AnalyticsService {
  constructor() {
    this.metrics = new Map();
  }

  // Record message event
  async recordMessageEvent(eventType, data) {
    const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const event = {
      id: eventId,
      type: eventType,
      timestamp: new Date(),
      ...data
    };
    
    // Store in metrics map (in production, this would go to a database)
    if (!this.metrics.has(eventType)) {
      this.metrics.set(eventType, []);
    }
    
    this.metrics.get(eventType).push(event);
    
    return event;
  }

  // Get campaign performance metrics
  async getCampaignPerformance(campaignId, timeframe = '30d') {
    const events = this.metrics.get('message_sent') || [];
    const deliveryEvents = this.metrics.get('message_delivered') || [];
    const readEvents = this.metrics.get('message_read') || [];
    const replyEvents = this.metrics.get('message_replied') || [];
    
    // Filter by campaign and timeframe
    const startDate = new Date(Date.now() - this.getTimeframeMs(timeframe));
    
    const campaignEvents = events.filter(e => 
      e.campaignId === campaignId && e.timestamp >= startDate
    );
    
    const campaignDeliveryEvents = deliveryEvents.filter(e => 
      e.campaignId === campaignId && e.timestamp >= startDate
    );
    
    const campaignReadEvents = readEvents.filter(e => 
      e.campaignId === campaignId && e.timestamp >= startDate
    );
    
    const campaignReplyEvents = replyEvents.filter(e => 
      e.campaignId === campaignId && e.timestamp >= startDate
    );
    
    const totalSent = campaignEvents.length;
    const totalDelivered = campaignDeliveryEvents.length;
    const totalRead = campaignReadEvents.length;
    const totalReplies = campaignReplyEvents.length;
    
    return {
      campaignId,
      totalSent,
      totalDelivered,
      totalRead,
      totalReplies,
      deliveryRate: totalSent > 0 ? (totalDelivered / totalSent) * 100 : 0,
      readRate: totalSent > 0 ? (totalRead / totalSent) * 100 : 0,
      replyRate: totalSent > 0 ? (totalReplies / totalSent) * 100 : 0,
      startDate,
      endDate: new Date()
    };
  }

  // Get user engagement metrics
  async getUserEngagement(userId, timeframe = '30d') {
    const messageEvents = this.metrics.get('message_sent') || [];
    const replyEvents = this.metrics.get('message_replied') || [];
    
    const startDate = new Date(Date.now() - this.getTimeframeMs(timeframe));
    
    // Filter by user and timeframe
    const userMessages = messageEvents.filter(e => 
      e.userId === userId && e.timestamp >= startDate
    );
    
    const userReplies = replyEvents.filter(e => 
      e.userId === userId && e.timestamp >= startDate
    );
    
    // Group by day for chart data
    const dailyMessages = this.groupEventsByDay(userMessages);
    const dailyReplies = this.groupEventsByDay(userReplies);
    
    return {
      userId,
      totalMessages: userMessages.length,
      totalReplies: userReplies.length,
      replyRate: userMessages.length > 0 ? (userReplies.length / userMessages.length) * 100 : 0,
      dailyMessages,
      dailyReplies,
      startDate,
      endDate: new Date()
    };
  }

  // Get chatbot performance metrics
  async getChatbotPerformance(flowId, timeframe = '30d') {
    const flowEvents = this.metrics.get('flow_triggered') || [];
    const completionEvents = this.metrics.get('flow_completed') || [];
    
    const startDate = new Date(Date.now() - this.getTimeframeMs(timeframe));
    
    const flowTriggers = flowEvents.filter(e => 
      e.flowId === flowId && e.timestamp >= startDate
    );
    
    const flowCompletions = completionEvents.filter(e => 
      e.flowId === flowId && e.timestamp >= startDate
    );
    
    return {
      flowId,
      totalTriggers: flowTriggers.length,
      totalCompletions: flowCompletions.length,
      completionRate: flowTriggers.length > 0 ? (flowCompletions.length / flowTriggers.length) * 100 : 0,
      startDate,
      endDate: new Date()
    };
  }

  // Get team performance metrics
  async getTeamPerformance(userId, timeframe = '30d') {
    const agentEvents = this.metrics.get('agent_message_sent') || [];
    const resolutionEvents = this.metrics.get('conversation_resolved') || [];
    
    const startDate = new Date(Date.now() - this.getTimeframeMs(timeframe));
    
    const agentMessages = agentEvents.filter(e => 
      e.userId === userId && e.timestamp >= startDate
    );
    
    const resolutions = resolutionEvents.filter(e => 
      e.userId === userId && e.timestamp >= startDate
    );
    
    // Calculate average response time
    const responseTimes = this.calculateResponseTimes(userId);
    
    return {
      userId,
      totalMessages: agentMessages.length,
      totalResolutions: resolutions.length,
      avgResponseTime: responseTimes.average,
      responseTimeTrend: responseTimes.trend,
      startDate,
      endDate: new Date()
    };
  }

  // Calculate response times
  calculateResponseTimes(userId) {
    const conversationEvents = this.metrics.get('conversation_created') || [];
    const agentResponseEvents = this.metrics.get('agent_message_sent') || [];
    
    const responseTimes = [];
    
    conversationEvents.forEach(conv => {
      if (conv.userId === userId) {
        // Find first agent response after conversation start
        const agentResponses = agentResponseEvents.filter(e => 
          e.userId === userId && e.conversationId === conv.conversationId &&
          e.timestamp > conv.timestamp
        );
        
        if (agentResponses.length > 0) {
          const firstResponse = agentResponses[0];
          const responseTime = firstResponse.timestamp - conv.timestamp;
          responseTimes.push(responseTime);
        }
      }
    });
    
    const average = responseTimes.length > 0 
      ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length 
      : 0;
    
    // Calculate trend (simplified)
    const recentTimes = responseTimes.slice(-10);
    const olderTimes = responseTimes.slice(0, Math.max(0, responseTimes.length - 10));
    
    const recentAvg = recentTimes.length > 0 
      ? recentTimes.reduce((sum, time) => sum + time, 0) / recentTimes.length 
      : 0;
      
    const olderAvg = olderTimes.length > 0 
      ? olderTimes.reduce((sum, time) => sum + time, 0) / olderTimes.length 
      : 0;
      
    const trend = recentAvg > olderAvg ? 'increasing' : recentAvg < olderAvg ? 'decreasing' : 'stable';
    
    return {
      average,
      trend,
      count: responseTimes.length
    };
  }

  // Group events by day
  groupEventsByDay(events) {
    const grouped = {};
    
    events.forEach(event => {
      const date = event.timestamp.toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = 0;
      }
      grouped[date]++;
    });
    
    return grouped;
  }

  // Convert timeframe to milliseconds
  getTimeframeMs(timeframe) {
    switch (timeframe) {
      case '7d': return 7 * 24 * 60 * 60 * 1000;
      case '30d': return 30 * 24 * 60 * 60 * 1000;
      case '90d': return 90 * 24 * 60 * 60 * 1000;
      default: return 30 * 24 * 60 * 60 * 1000;
    }
  }

  // Get dashboard metrics
  async getDashboardMetrics(userId) {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Get all relevant events
    const messageEvents = (this.metrics.get('message_sent') || []).filter(e => 
      e.userId === userId && e.timestamp >= thirtyDaysAgo
    );
    
    const replyEvents = (this.metrics.get('message_replied') || []).filter(e => 
      e.userId === userId && e.timestamp >= thirtyDaysAgo
    );
    
    const campaignEvents = (this.metrics.get('campaign_created') || []).filter(e => 
      e.userId === userId && e.timestamp >= thirtyDaysAgo
    );
    
    const contactEvents = (this.metrics.get('contact_added') || []).filter(e => 
      e.userId === userId && e.timestamp >= thirtyDaysAgo
    );
    
    return {
      totalMessages: messageEvents.length,
      totalReplies: replyEvents.length,
      replyRate: messageEvents.length > 0 ? (replyEvents.length / messageEvents.length) * 100 : 0,
      totalCampaigns: campaignEvents.length,
      totalContacts: contactEvents.length,
      messagesTrend: this.groupEventsByDay(messageEvents),
      repliesTrend: this.groupEventsByDay(replyEvents)
    };
  }

  // Get comparative analytics
  async getComparativeAnalytics(userId, compareUserId) {
    const userMetrics = await this.getDashboardMetrics(userId);
    const compareMetrics = await this.getDashboardMetrics(compareUserId);
    
    return {
      userMetrics,
      compareMetrics,
      differences: {
        messages: userMetrics.totalMessages - compareMetrics.totalMessages,
        replies: userMetrics.totalReplies - compareMetrics.totalReplies,
        replyRate: userMetrics.replyRate - compareMetrics.replyRate,
        campaigns: userMetrics.totalCampaigns - compareMetrics.totalCampaigns
      }
    };
  }
}

module.exports = AnalyticsService;