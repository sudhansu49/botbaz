import React, { useState } from 'react';

const DripCampaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 'drip_1',
      name: 'Welcome Series',
      status: 'active',
      subscribers: 124,
      steps: 3,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'drip_2',
      name: 'Abandoned Cart',
      status: 'active',
      subscribers: 86,
      steps: 4,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'drip_3',
      name: 'Product Education',
      status: 'draft',
      subscribers: 0,
      steps: 5,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    triggerEvent: 'contact_added',
    sendDelay: 0
  });

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [steps, setSteps] = useState([
    { id: 'step_1', position: 1, delay: 0, message: 'Welcome to our service! Thanks for signing up.' },
    { id: 'step_2', position: 2, delay: 24, message: 'Here are some tips to get started with our platform.' },
    { id: 'step_3', position: 3, delay: 48, message: 'Need help? Our support team is here for you.' }
  ]);

  const handleCreateCampaign = () => {
    if (newCampaign.name.trim()) {
      const campaign = {
        id: `drip_${Date.now()}`,
        name: newCampaign.name,
        status: 'draft',
        subscribers: 0,
        steps: 0,
        createdAt: new Date(),
        ...newCampaign
      };
      setCampaigns([...campaigns, campaign]);
      setNewCampaign({ name: '', triggerEvent: 'contact_added', sendDelay: 0 });
      setShowCreateForm(false);
    }
  };

  const toggleCampaignStatus = (campaignId) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          status: campaign.status === 'active' ? 'paused' : 'active'
        };
      }
      return campaign;
    }));
  };

  const formatTime = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Drip Campaigns</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Campaign
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Drip Campaign</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700">
                  Campaign Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="campaign-name"
                    id="campaign-name"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Welcome Series"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="trigger-event" className="block text-sm font-medium text-gray-700">
                  Trigger Event
                </label>
                <div className="mt-1">
                  <select
                    id="trigger-event"
                    name="trigger-event"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={newCampaign.triggerEvent}
                    onChange={(e) => setNewCampaign({...newCampaign, triggerEvent: e.target.value})}
                  >
                    <option value="contact_added">Contact Added</option>
                    <option value="purchase_made">Purchase Made</option>
                    <option value="cart_abandoned">Cart Abandoned</option>
                    <option value="trial_started">Trial Started</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="send-delay" className="block text-sm font-medium text-gray-700">
                  Initial Send Delay (hours)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="send-delay"
                    id="send-delay"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                    value={newCampaign.sendDelay}
                    onChange={(e) => setNewCampaign({...newCampaign, sendDelay: parseInt(e.target.value) || 0})}
                  />
                </div>
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
                onClick={handleCreateCampaign}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-green-600 truncate">
                      {campaign.name}
                    </p>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleCampaignStatus(campaign.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      {campaign.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {campaign.steps} steps
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      {campaign.subscribers} subscribers
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <p>
                      Created {formatTime(campaign.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedCampaign && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Campaign: {selectedCampaign.name}
                </h3>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Campaign Steps</h4>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-gray-900">Step {step.position}</h5>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delay (hours)
                          </label>
                          <input
                            type="number"
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={step.delay}
                            onChange={(e) => {
                              const newSteps = [...steps];
                              newSteps[index].delay = parseInt(e.target.value) || 0;
                              setSteps(newSteps);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            rows={3}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={step.message}
                            onChange={(e) => {
                              const newSteps = [...steps];
                              newSteps[index].message = e.target.value;
                              setSteps(newSteps);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => {
                      const newStep = {
                        id: `step_${Date.now()}`,
                        position: steps.length + 1,
                        delay: 24,
                        message: ''
                      };
                      setSteps([...steps, newStep]);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Step
                  </button>
                  <div className="space-x-3">
                    <button
                      onClick={() => setSelectedCampaign(null)}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Save campaign steps
                        setSelectedCampaign(null);
                      }}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DripCampaigns;