import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', name: 'General' },
    { id: 'api', name: 'API Integration' },
    { id: 'billing', name: 'Billing' },
    { id: 'notifications', name: 'Notifications' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'general' && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">General Settings</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company-name"
                      id="company-name"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="Tech Solutions Inc."
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <div className="mt-1">
                    <select
                      id="timezone"
                      name="timezone"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="Asia/Kolkata"
                    >
                      <option>Asia/Kolkata</option>
                      <option>America/New_York</option>
                      <option>America/Los_Angeles</option>
                      <option>Europe/London</option>
                      <option>Europe/Paris</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="We provide innovative tech solutions for businesses of all sizes."
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your company. URLs are hyperlinked.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">API Integration</h3>
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">WhatsApp Business API</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Connect your WhatsApp Business account to start sending messages.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex items-center h-5">
                      <input
                        id="api-connected"
                        name="api-connected"
                        type="checkbox"
                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="api-connected" className="font-medium text-gray-700">Connected</label>
                      <p className="text-gray-500">Your WhatsApp Business API is connected.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
                    API Key
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="api-key"
                      id="api-key"
                      className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                      defaultValue="sk_live_1234567890abcdefghijklmnopqrstuvwxyz"
                    />
                    <button
                      type="button"
                      className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Reconnect API
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Billing Information</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
                    Current Plan
                  </label>
                  <div className="mt-1">
                    <select
                      id="plan"
                      name="plan"
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue="growth"
                    >
                      <option value="starter">Starter - ₹999/month</option>
                      <option value="growth">Growth - ₹2,999/month</option>
                      <option value="pro">Pro - ₹5,999/month</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="auto-renew"
                        name="auto-renew"
                        type="checkbox"
                        className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="auto-renew" className="font-medium text-gray-700">Auto-renew</label>
                      <p className="text-gray-500">Automatically renew your subscription at the end of each billing cycle.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900">Payment Method</h4>
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Visa ending in 4242</div>
                      <div className="text-sm text-gray-500">Expires 12/2025</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Update Payment Method
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Preferences</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="campaign-notifications"
                      name="campaign-notifications"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="campaign-notifications" className="font-medium text-gray-700">Campaign notifications</label>
                    <p className="text-gray-500">Get notified when campaigns are sent, completed, or have issues.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="reply-notifications"
                      name="reply-notifications"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="reply-notifications" className="font-medium text-gray-700">Reply notifications</label>
                    <p className="text-gray-500">Get notified when customers reply to your messages.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="report-notifications"
                      name="report-notifications"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="report-notifications" className="font-medium text-gray-700">Weekly reports</label>
                    <p className="text-gray-500">Receive weekly analytics reports via email.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing-emails"
                      name="marketing-emails"
                      type="checkbox"
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing-emails" className="font-medium text-gray-700">Marketing emails</label>
                    <p className="text-gray-500">Receive tips and best practices for WhatsApp marketing.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;