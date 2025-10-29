import React, { useState } from 'react';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Welcome Message",
      category: "MARKETING",
      language: "en",
      status: "APPROVED",
      content: "Hi {{1}}, welcome to our store! We're excited to have you here. Check out our latest offers.",
    },
    {
      id: 2,
      name: "Order Confirmation",
      category: "UTILITY",
      language: "en",
      status: "APPROVED",
      content: "Thank you for your order #{{1}}. Your order will be delivered by {{2}}.",
    },
    {
      id: 3,
      name: "Appointment Reminder",
      category: "UTILITY",
      language: "en",
      status: "PENDING",
      content: "This is a reminder for your appointment on {{1}} at {{2}}. Please confirm if you can make it.",
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'MARKETING',
    language: 'en',
    content: ''
  });

  const handleCreateTemplate = () => {
    const template = {
      id: templates.length + 1,
      ...newTemplate,
      status: "PENDING"
    };
    setTemplates([...templates, template]);
    setNewTemplate({ name: '', category: 'MARKETING', language: 'en', content: '' });
    setShowCreateForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Template Manager</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Template
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Template</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="template-name" className="block text-sm font-medium text-gray-700">
                  Template Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="template-name"
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="MARKETING">Marketing</option>
                    <option value="UTILITY">Utility</option>
                    <option value="AUTHENTICATION">Authentication</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Template Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your template content. Use {'{1}'}, {'{2}'}, etc. for variables."
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Use double curly braces for variables (e.g., {'{1}'}, {'{2}'}). These will be replaced when sending messages.
                </p>
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
                onClick={handleCreateTemplate}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {templates.map((template) => (
            <li key={template.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-600 truncate">{template.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      template.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                      template.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {template.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {template.category} • {template.language}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <button className="text-green-600 hover:text-green-900 mr-4">
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    {template.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TemplateManager;