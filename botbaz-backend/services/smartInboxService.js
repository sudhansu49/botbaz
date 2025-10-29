// Smart Inbox Service for BotBaz
class SmartInboxService {
  constructor() {
    this.conversations = new Map();
    this.agents = new Map();
  }

  // Create or update conversation
  async upsertConversation(contactId, message, metadata = {}) {
    const conversationId = `conv_${contactId}`;
    
    if (!this.conversations.has(conversationId)) {
      // Create new conversation
      this.conversations.set(conversationId, {
        id: conversationId,
        contactId,
        messages: [],
        status: 'open',
        assignedAgent: null,
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        unreadCount: 1,
        sentiment: 'NEUTRAL',
        leadScore: 5
      });
    }
    
    const conversation = this.conversations.get(conversationId);
    
    // Add message to conversation
    conversation.messages.push({
      id: `msg_${Date.now()}`,
      content: message,
      sender: metadata.isIncoming ? 'contact' : 'agent',
      timestamp: new Date(),
      ...metadata
    });
    
    // Update conversation metadata
    conversation.updatedAt = new Date();
    conversation.unreadCount = metadata.isIncoming ? conversation.unreadCount + 1 : 0;
    
    return conversation;
  }

  // Assign conversation to agent
  async assignConversation(conversationId, agentId) {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    
    conversation.assignedAgent = agentId;
    conversation.status = 'assigned';
    conversation.updatedAt = new Date();
    
    // Register agent if not exists
    if (!this.agents.has(agentId)) {
      this.agents.set(agentId, {
        id: agentId,
        conversations: [],
        status: 'available',
        lastActive: new Date()
      });
    }
    
    // Add conversation to agent
    const agent = this.agents.get(agentId);
    if (!agent.conversations.includes(conversationId)) {
      agent.conversations.push(conversationId);
    }
    
    return conversation;
  }

  // Tag conversation
  async tagConversation(conversationId, tag) {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    
    if (!conversation.tags.includes(tag)) {
      conversation.tags.push(tag);
      conversation.updatedAt = new Date();
    }
    
    return conversation;
  }

  // Update conversation status
  async updateConversationStatus(conversationId, status) {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    
    conversation.status = status;
    conversation.updatedAt = new Date();
    
    return conversation;
  }

  // Get conversations with filters
  async getConversations(filters = {}) {
    let conversations = Array.from(this.conversations.values());
    
    // Apply filters
    if (filters.status) {
      conversations = conversations.filter(conv => conv.status === filters.status);
    }
    
    if (filters.assignedAgent) {
      conversations = conversations.filter(conv => conv.assignedAgent === filters.assignedAgent);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      conversations = conversations.filter(conv => 
        filters.tags.some(tag => conv.tags.includes(tag))
      );
    }
    
    if (filters.unreadOnly) {
      conversations = conversations.filter(conv => conv.unreadCount > 0);
    }
    
    // Sort by updatedAt (newest first)
    conversations.sort((a, b) => b.updatedAt - a.updatedAt);
    
    return conversations;
  }

  // Get conversation by ID
  async getConversation(conversationId) {
    return this.conversations.get(conversationId);
  }

  // Search conversations
  async searchConversations(query) {
    const conversations = Array.from(this.conversations.values());
    return conversations.filter(conv => 
      conv.messages.some(msg => 
        msg.content.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  // Get agent statistics
  async getAgentStats(agentId) {
    const agent = this.agents.get(agentId);
    if (!agent) {
      return null;
    }
    
    const conversations = agent.conversations
      .map(id => this.conversations.get(id))
      .filter(Boolean);
    
    return {
      agentId,
      totalConversations: conversations.length,
      openConversations: conversations.filter(c => c.status === 'open').length,
      assignedConversations: conversations.filter(c => c.status === 'assigned').length,
      resolvedConversations: conversations.filter(c => c.status === 'resolved').length,
      averageResponseTime: this.calculateAverageResponseTime(conversations),
      satisfactionScore: this.calculateSatisfactionScore(conversations)
    };
  }

  // Calculate average response time
  calculateAverageResponseTime(conversations) {
    let totalResponseTime = 0;
    let responseCount = 0;
    
    conversations.forEach(conv => {
      for (let i = 1; i < conv.messages.length; i++) {
        if (conv.messages[i].sender === 'agent' && conv.messages[i-1].sender === 'contact') {
          const responseTime = conv.messages[i].timestamp - conv.messages[i-1].timestamp;
          totalResponseTime += responseTime;
          responseCount++;
        }
      }
    });
    
    return responseCount > 0 ? totalResponseTime / responseCount : 0;
  }

  // Calculate satisfaction score (mock implementation)
  calculateSatisfactionScore(conversations) {
    // In a real implementation, this would come from customer feedback
    return Math.floor(Math.random() * 40) + 60; // Random score between 60-100
  }

  // Get team inbox summary
  async getTeamInboxSummary() {
    const conversations = Array.from(this.conversations.values());
    
    return {
      totalConversations: conversations.length,
      openConversations: conversations.filter(c => c.status === 'open').length,
      assignedConversations: conversations.filter(c => c.status === 'assigned').length,
      resolvedConversations: conversations.filter(c => c.status === 'resolved').length,
      unreadConversations: conversations.filter(c => c.unreadCount > 0).length,
      averageResponseTime: this.calculateAverageResponseTime(conversations),
      agentCount: this.agents.size
    };
  }
}

module.exports = SmartInboxService;