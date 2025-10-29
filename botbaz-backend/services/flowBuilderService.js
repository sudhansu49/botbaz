// Flow Builder Service
class FlowBuilderService {
  constructor() {
    this.flows = new Map();
  }

  // Create a new flow
  createFlow(flowData) {
    const flowId = this.generateId();
    const flow = {
      id: flowId,
      name: flowData.name,
      userId: flowData.userId,
      nodes: flowData.nodes || [],
      edges: flowData.edges || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.flows.set(flowId, flow);
    return flow;
  }

  // Get flow by ID
  getFlow(flowId) {
    return this.flows.get(flowId);
  }

  // Update flow
  updateFlow(flowId, flowData) {
    const flow = this.flows.get(flowId);
    if (!flow) {
      throw new Error('Flow not found');
    }

    // Update flow properties
    Object.assign(flow, flowData, { updatedAt: new Date() });
    this.flows.set(flowId, flow);
    return flow;
  }

  // Delete flow
  deleteFlow(flowId) {
    return this.flows.delete(flowId);
  }

  // Get all flows for a user
  getUserFlows(userId) {
    const userFlows = [];
    for (const [id, flow] of this.flows) {
      if (flow.userId === userId) {
        userFlows.push(flow);
      }
    }
    return userFlows;
  }

  // Add node to flow
  addNodeToFlow(flowId, nodeData) {
    const flow = this.flows.get(flowId);
    if (!flow) {
      throw new Error('Flow not found');
    }

    const node = {
      id: this.generateId(),
      type: nodeData.type,
      position: nodeData.position,
      data: nodeData.data,
      createdAt: new Date()
    };

    flow.nodes.push(node);
    flow.updatedAt = new Date();
    this.flows.set(flowId, flow);
    return node;
  }

  // Add edge to flow
  addEdgeToFlow(flowId, edgeData) {
    const flow = this.flows.get(flowId);
    if (!flow) {
      throw new Error('Flow not found');
    }

    const edge = {
      id: this.generateId(),
      source: edgeData.source,
      target: edgeData.target,
      type: edgeData.type || 'default',
      animated: edgeData.animated || false,
      createdAt: new Date()
    };

    flow.edges.push(edge);
    flow.updatedAt = new Date();
    this.flows.set(flowId, flow);
    return edge;
  }

  // Generate unique ID
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Execute flow (simulate)
  async executeFlow(flowId, inputData) {
    const flow = this.flows.get(flowId);
    if (!flow) {
      throw new Error('Flow not found');
    }

    console.log(`Executing flow: ${flow.name}`);
    console.log('Input data:', inputData);

    // Simulate flow execution
    const result = {
      flowId: flow.id,
      status: 'completed',
      output: {
        message: 'Flow executed successfully',
        data: inputData
      },
      executedAt: new Date()
    };

    return result;
  }
}

module.exports = FlowBuilderService;