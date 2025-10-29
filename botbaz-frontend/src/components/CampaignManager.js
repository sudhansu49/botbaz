import React, { useState } from 'react';

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Sale",
      status: "COMPLETED",
      recipients: 2482,
      delivered: 2391,
      replies: 421,
      sentDate: "2023-06-15",
    },
    {
      id: 2,
      name: "New Product Launch",
      status: "IN_PROGRESS",
      recipients: 1829,
      delivered: 1752,
      replies: 298,
      sentDate: "2023-06-18",
    },
    {
      id: 3,
      name: "Customer Feedback",
      status: "SCHEDULED",
      recipients: 2192,
      delivered: 0,
      replies: 0,
      sentDate: "2023-06-25",
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Campaign Manager</h1>
          <p className="mt-1 text-sm text-gray-500">Create and manage your WhatsApp campaigns</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Campaign
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Campaign</h3>
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
                    placeholder="Summer Sale Promotion"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                  Template
                </label>
                <div className="mt-1">
                  <select
                    id="template"
                    name="template"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>Select a template</option>
                    <option>Welcome Message</option>
                    <option>Order Confirmation</option>
                    <option>Appointment Reminder</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="recipients" className="block text-sm font-medium text-gray-700">
                  Recipients
                </label>
                <div className="mt-1">
                  <select
                    id="recipients"
                    name="recipients"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>All Contacts</option>
                    <option>VIP Customers</option>
                    <option>Leads</option>
                    <option>Custom Segment</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                  Schedule
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="schedule"
                    id="schedule"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivered
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Replies
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          campaign.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                          campaign.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.recipients.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.delivered.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.replies.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.sentDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-green-600 hover:text-green-900 mr-3">View</a>
                        <a href="#" className="text-green-600 hover:text-green-900">Duplicate</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignManager;