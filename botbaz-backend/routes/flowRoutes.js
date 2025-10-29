const express = require('express');
const router = express.Router();
const FlowBuilderService = require('../services/flowBuilderService');
const { protect } = require('../middleware/authMiddleware');

// Initialize flow builder service
const flowService = new FlowBuilderService();

// Create flow
router.post('/', protect, (req, res) => {
  try {
    const flowData = {
      ...req.body,
      userId: req.user.id
    };
    
    const flow = flowService.createFlow(flowData);
    res.status(201).json(flow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all flows for user
router.get('/', protect, (req, res) => {
  try {
    const flows = flowService.getUserFlows(req.user.id);
    res.json(flows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get flow by ID
router.get('/:id', protect, (req, res) => {
  try {
    const flow = flowService.getFlow(req.params.id);
    
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    
    // Check if user is authorized to view this flow
    if (flow.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(flow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update flow
router.put('/:id', protect, (req, res) => {
  try {
    const flow = flowService.getFlow(req.params.id);
    
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    
    // Check if user is authorized to update this flow
    if (flow.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updatedFlow = flowService.updateFlow(req.params.id, req.body);
    res.json(updatedFlow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete flow
router.delete('/:id', protect, (req, res) => {
  try {
    const flow = flowService.getFlow(req.params.id);
    
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    
    // Check if user is authorized to delete this flow
    if (flow.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    flowService.deleteFlow(req.params.id);
    res.json({ message: 'Flow removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add node to flow
router.post('/:id/nodes', protect, (req, res) => {
  try {
    const flow = flowService.getFlow(req.params.id);
    
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    
    // Check if user is authorized to update this flow
    if (flow.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const node = flowService.addNodeToFlow(req.params.id, req.body);
    res.status(201).json(node);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add edge to flow
router.post('/:id/edges', protect, (req, res) => {
  try {
    const flow = flowService.getFlow(req.params.id);
    
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    
    // Check if user is authorized to update this flow
    if (flow.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const edge = flowService.addEdgeToFlow(req.params.id, req.body);
    res.status(201).json(edge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Execute flow
router.post('/:id/execute', protect, (req, res) => {
  try {
    const flow = flowService.getFlow(req.params.id);
    
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found' });
    }
    
    // Check if user is authorized to execute this flow
    if (flow.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const result = flowService.executeFlow(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;