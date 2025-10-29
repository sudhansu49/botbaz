// Customer Segmentation Service for BotBaz
class SegmentationService {
  constructor() {
    this.segments = new Map();
  }

  // Create segment
  async createSegment(name, userId, criteria = {}) {
    const segmentId = `seg_${Date.now()}`;
    
    const segment = {
      id: segmentId,
      name,
      userId,
      criteria,
      contacts: [],
      contactCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.segments.set(segmentId, segment);
    return segment;
  }

  // Update segment criteria
  async updateSegmentCriteria(segmentId, criteria) {
    const segment = this.segments.get(segmentId);
    if (!segment) {
      throw new Error('Segment not found');
    }
    
    segment.criteria = { ...segment.criteria, ...criteria };
    segment.updatedAt = new Date();
    
    return segment;
  }

  // Evaluate contacts against segment criteria
  async evaluateContactsForSegment(segmentId, contacts) {
    const segment = this.segments.get(segmentId);
    if (!segment) {
      throw new Error('Segment not found');
    }
    
    const matchingContacts = contacts.filter(contact => 
      this.matchesCriteria(contact, segment.criteria)
    );
    
    segment.contacts = matchingContacts.map(c => c._id || c.id);
    segment.contactCount = matchingContacts.length;
    segment.updatedAt = new Date();
    
    return matchingContacts;
  }

  // Check if contact matches criteria
  matchesCriteria(contact, criteria) {
    // Basic criteria matching
    for (const [field, condition] of Object.entries(criteria)) {
      const contactValue = contact[field];
      
      if (condition.hasOwnProperty('$eq') && contactValue !== condition.$eq) {
        return false;
      }
      
      if (condition.hasOwnProperty('$ne') && contactValue === condition.$ne) {
        return false;
      }
      
      if (condition.hasOwnProperty('$in') && !condition.$in.includes(contactValue)) {
        return false;
      }
      
      if (condition.hasOwnProperty('$nin') && condition.$nin.includes(contactValue)) {
        return false;
      }
      
      if (condition.hasOwnProperty('$gt') && contactValue <= condition.$gt) {
        return false;
      }
      
      if (condition.hasOwnProperty('$lt') && contactValue >= condition.$lt) {
        return false;
      }
      
      if (condition.hasOwnProperty('$gte') && contactValue < condition.$gte) {
        return false;
      }
      
      if (condition.hasOwnProperty('$lte') && contactValue > condition.$lte) {
        return false;
      }
      
      if (condition.hasOwnProperty('$regex') && !new RegExp(condition.$regex).test(contactValue)) {
        return false;
      }
    }
    
    return true;
  }

  // Get segment by ID
  async getSegment(segmentId) {
    return this.segments.get(segmentId);
  }

  // Get all segments for user
  async getUserSegments(userId) {
    return Array.from(this.segments.values())
      .filter(segment => segment.userId === userId);
  }

  // Delete segment
  async deleteSegment(segmentId) {
    return this.segments.delete(segmentId);
  }

  // Add contact to segment manually
  async addContactToSegment(segmentId, contactId) {
    const segment = this.segments.get(segmentId);
    if (!segment) {
      throw new Error('Segment not found');
    }
    
    if (!segment.contacts.includes(contactId)) {
      segment.contacts.push(contactId);
      segment.contactCount = segment.contacts.length;
      segment.updatedAt = new Date();
    }
    
    return segment;
  }

  // Remove contact from segment
  async removeContactFromSegment(segmentId, contactId) {
    const segment = this.segments.get(segmentId);
    if (!segment) {
      throw new Error('Segment not found');
    }
    
    const index = segment.contacts.indexOf(contactId);
    if (index > -1) {
      segment.contacts.splice(index, 1);
      segment.contactCount = segment.contacts.length;
      segment.updatedAt = new Date();
    }
    
    return segment;
  }

  // Get segment statistics
  async getSegmentStats(segmentId) {
    const segment = this.segments.get(segmentId);
    if (!segment) {
      throw new Error('Segment not found');
    }
    
    return {
      id: segment.id,
      name: segment.name,
      contactCount: segment.contactCount,
      createdAt: segment.createdAt,
      updatedAt: segment.updatedAt
    };
  }

  // Smart segmentation suggestions
  async getSegmentationSuggestions(contacts) {
    const suggestions = [];
    
    // Tag-based segments
    const tags = {};
    contacts.forEach(contact => {
      if (contact.tags) {
        contact.tags.forEach(tag => {
          tags[tag] = (tags[tag] || 0) + 1;
        });
      }
    });
    
    Object.entries(tags).forEach(([tag, count]) => {
      if (count > 1) {
        suggestions.push({
          name: `${tag} Customers`,
          criteria: { tags: { $in: [tag] } },
          estimatedCount: count,
          type: 'tag-based'
        });
      }
    });
    
    // Engagement-based segments
    const engagedContacts = contacts.filter(c => c.lastContacted && 
      new Date() - new Date(c.lastContacted) < 30 * 24 * 60 * 60 * 1000); // Last 30 days
    
    if (engagedContacts.length > 0) {
      suggestions.push({
        name: 'Recently Engaged',
        criteria: { 
          lastContacted: { 
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
          } 
        },
        estimatedCount: engagedContacts.length,
        type: 'engagement-based'
      });
    }
    
    // Inactive contacts
    const inactiveContacts = contacts.filter(c => !c.lastContacted || 
      new Date() - new Date(c.lastContacted) > 90 * 24 * 60 * 60 * 1000); // More than 90 days
    
    if (inactiveContacts.length > 0) {
      suggestions.push({
        name: 'Inactive Contacts',
        criteria: { 
          $or: [
            { lastContacted: { $lte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } },
            { lastContacted: { $exists: false } }
          ]
        },
        estimatedCount: inactiveContacts.length,
        type: 'engagement-based'
      });
    }
    
    return suggestions;
  }

  // Combine segments with boolean operations
  async createCombinedSegment(name, userId, segmentOperations) {
    // segmentOperations example: 
    // [{ segmentId: 'seg_1', operation: 'include' }, { segmentId: 'seg_2', operation: 'exclude' }]
    
    const combinedSegmentId = `seg_combined_${Date.now()}`;
    
    const combinedSegment = {
      id: combinedSegmentId,
      name,
      userId,
      type: 'combined',
      segmentOperations,
      contacts: [],
      contactCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Calculate combined contacts
    const contactSets = segmentOperations.map(op => {
      const segment = this.segments.get(op.segmentId);
      return {
        contacts: segment ? new Set(segment.contacts) : new Set(),
        operation: op.operation
      };
    });
    
    if (contactSets.length > 0) {
      // Start with first set
      let resultContacts = new Set(contactSets[0].contacts);
      
      // Apply operations
      for (let i = 1; i < contactSets.length; i++) {
        const { contacts, operation } = contactSets[i];
        
        if (operation === 'include') {
          // Union
          contacts.forEach(contact => resultContacts.add(contact));
        } else if (operation === 'exclude') {
          // Difference
          contacts.forEach(contact => resultContacts.delete(contact));
        }
      }
      
      combinedSegment.contacts = Array.from(resultContacts);
      combinedSegment.contactCount = combinedSegment.contacts.length;
    }
    
    this.segments.set(combinedSegmentId, combinedSegment);
    return combinedSegment;
  }
}

module.exports = SegmentationService;