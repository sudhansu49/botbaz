const express = require('express');
const router = express.Router();
const SegmentationService = require('../services/segmentationService');
const { protect } = require('../middleware/authMiddleware');

// Initialize segmentation service
const segmentationService = new SegmentationService();

// Create segment
router.post('/', protect, async (req, res) => {
  try {
    const { name, criteria } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Segment name is required' });
    }
    
    const segment = await segmentationService.createSegment(name, req.user.id, criteria);
    res.status(201).json(segment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all segments for user
router.get('/', protect, async (req, res) => {
  try {
    const segments = await segmentationService.getUserSegments(req.user.id);
    res.json(segments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get segment by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const segment = await segmentationService.getSegment(req.params.id);
    
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }
    
    // Check if user is authorized to view this segment
    if (segment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(segment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update segment criteria
router.put('/:id/criteria', protect, async (req, res) => {
  try {
    const segment = await segmentationService.getSegment(req.params.id);
    
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }
    
    // Check if user is authorized to update this segment
    if (segment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedSegment = await segmentationService.updateSegmentCriteria(req.params.id, req.body);
    res.json(updatedSegment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete segment
router.delete('/:id', protect, async (req, res) => {
  try {
    const segment = await segmentationService.getSegment(req.params.id);
    
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }
    
    // Check if user is authorized to delete this segment
    if (segment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await segmentationService.deleteSegment(req.params.id);
    res.json({ message: 'Segment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add contact to segment
router.post('/:id/contacts/:contactId', protect, async (req, res) => {
  try {
    const segment = await segmentationService.getSegment(req.params.id);
    
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }
    
    // Check if user is authorized to update this segment
    if (segment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedSegment = await segmentationService.addContactToSegment(req.params.id, req.params.contactId);
    res.json(updatedSegment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove contact from segment
router.delete('/:id/contacts/:contactId', protect, async (req, res) => {
  try {
    const segment = await segmentationService.getSegment(req.params.id);
    
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }
    
    // Check if user is authorized to update this segment
    if (segment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedSegment = await segmentationService.removeContactFromSegment(req.params.id, req.params.contactId);
    res.json(updatedSegment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get segment statistics
router.get('/:id/stats', protect, async (req, res) => {
  try {
    const segment = await segmentationService.getSegment(req.params.id);
    
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }
    
    // Check if user is authorized to view this segment
    if (segment.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const stats = await segmentationService.getSegmentStats(req.params.id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get segmentation suggestions
router.post('/suggestions', protect, async (req, res) => {
  try {
    const { contacts } = req.body;
    
    if (!contacts || !Array.isArray(contacts)) {
      return res.status(400).json({ message: 'Contacts array is required' });
    }
    
    const suggestions = await segmentationService.getSegmentationSuggestions(contacts);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create combined segment
router.post('/combined', protect, async (req, res) => {
  try {
    const { name, segmentOperations } = req.body;
    
    if (!name || !segmentOperations || !Array.isArray(segmentOperations)) {
      return res.status(400).json({ message: 'Name and segmentOperations array are required' });
    }
    
    const combinedSegment = await segmentationService.createCombinedSegment(name, req.user.id, segmentOperations);
    res.status(201).json(combinedSegment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;