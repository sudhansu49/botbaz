import React, { useState } from 'react';

const FlowBuilder = () => {
  const [flows, setFlows] = useState([
    { id: 1, name: "Welcome Flow", nodes: 4, lastModified: "2023-06-15" },
    { id: 2, name: "Support Flow", nodes: 6, lastModified: "2023-06-10" },
    { id: 3, name: "Sales Flow", nodes: 3, lastModified: "2023-06-05" }
  ]);

  const [activeTab, setActiveTab] = useState('flows');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');

  const nodeTypes = [
    { id: 'trigger', name: 'Trigger', icon: '⚡', description: 'Starts the flow' },
    { id: 'message', name: 'Message', icon: '💬', description: 'Send a message' },
    { id: 'condition', name: 'Condition', icon: '❓', description: 'Check a condition' },
    { id: 'delay', name: 'Delay', icon: '⏱️', description: 'Wait for a period' },
    { id: 'assign', name: 'Assign', icon: '👤', description: 'Assign to agent' },
    { id: 'webhook', name: 'Webhook', icon: '🔗', description: 'Call external API' }
  ];

  const handleCreateFlow = () => {
    if (newFlowName.trim()) {
      const newFlow = {
        id: flows.length + 1,
        name: newFlowName,
        nodes: 0,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setFlows([...flows, newFlow]);
      setNewFlowName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Flow Builder</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Flow
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Flow</h3>
            <div className="mt-4">
              <label htmlFor="flow-name" className="block text-sm font-medium text-gray-700">
                Flow Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="flow-name"
                  id="flow-name"
                  value={newFlowName}
                  onChange={(e) => setNewFlowName(e.target.value)}
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter flow name"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateFlow}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('flows')}
              className={`${
                activeTab === 'flows'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Flows
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`${
                activeTab === 'templates'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Templates
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'flows' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {flows.map((flow) => (
              <li key={flow.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-600 truncate">{flow.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {flow.nodes} nodes
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Last modified: {flow.lastModified}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <button className="text-green-600 hover:text-green-900 mr-4">
                        Edit
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Duplicate
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'templates' && (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nodeTypes.map((nodeType) => (
              <div key={nodeType.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <span className="text-xl">{nodeType.icon}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{nodeType.name}</h4>
                      <p className="text-sm text-gray-500">{nodeType.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Flow Templates</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600 truncate">Welcome Message Flow</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          5 nodes
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        A simple flow that sends a welcome message and collects user preferences
                      </p>
                    </div>
                    <div className="mt-2">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Use Template
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600 truncate">Abandoned Cart Flow</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          4 nodes
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        A flow that reminds customers about items left in their cart
                      </p>
                    </div>
                    <div className="mt-2">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Use Template
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowBuilder;