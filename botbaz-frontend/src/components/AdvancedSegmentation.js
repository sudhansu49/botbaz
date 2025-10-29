import React, { useState } from 'react';

const AdvancedSegmentation = () => {
  const [segments, setSegments] = useState([
    {
      id: 'seg_1',
      name: 'High Value Customers',
      contactCount: 124,
      criteria: { tags: { $in: ['vip', 'premium'] } },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'seg_2',
      name: 'Recently Engaged',
      contactCount: 86,
      criteria: { lastContacted: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'seg_3',
      name: 'Inactive Contacts',
      contactCount: 42,
      criteria: { lastContacted: { $lte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } },
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSegment, setNewSegment] = useState({
    name: '',
    criteria: {}
  });

  const [segmentationSuggestions, setSegmentationSuggestions] = useState([
    {
      name: 'Interested Leads',
      criteria: { tags: { $in: ['interested'] } },
      estimatedCount: 67,
      type: 'tag-based'
    },
    {
      name: 'Product Inquirers',
      criteria: { tags: { $in: ['product inquiry'] } },
      estimatedCount: 43,
      type: 'tag-based'
    },
    {
      name: 'Support Seekers',
      criteria: { tags: { $in: ['support'] } },
      estimatedCount: 28,
      type: 'tag-based'
    }
  ]);

  const [activeTab, setActiveTab] = useState('segments');

  const handleCreateSegment = () => {
    if (newSegment.name.trim()) {
      const segment = {
        id: `seg_${Date.now()}`,
        name: newSegment.name,
        contactCount: 0,
        criteria: newSegment.criteria,
        createdAt: new Date()
      };
      setSegments([...segments, segment]);
      setNewSegment({ name: '', criteria: {} });
      setShowCreateForm(false);
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Advanced Segmentation</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Segment
        </button>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('segments')}
              className={`${
                activeTab === 'segments'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Segments
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`${
                activeTab === 'suggestions'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Suggestions
            </button>
            <button
              onClick={() => setActiveTab('combine')}
              className={`${
                activeTab === 'combine'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Combine Segments
            </button>
          </nav>
        </div>
      </div>

      {showCreateForm && (
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Segment</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="segment-name" className="block text-sm font-medium text-gray-700">
                  Segment Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="segment-name"
                    id="segment-name"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="High Value Customers"
                    value={newSegment.name}
                    onChange={(e) => setNewSegment({...newSegment, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Criteria Builder
                </label>
                <div className="border border-gray-300 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Field
                      </label>
                      <select className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option>tags</option>
                        <option>lastContacted</option>
                        <option>firstName</option>
                        <option>lastName</option>
                        <option>email</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Operator
                      </label>
                      <select className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option>equals</option>
                        <option>not equals</option>
                        <option>contains</option>
                        <option>greater than</option>
                        <option>less than</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <svg className="-ml-1 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Condition
                    </button>
                  </div>
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
                onClick={handleCreateSegment}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Segment
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'segments' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {segments.map((segment) => (
              <li key={segment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-600 truncate">
                      {segment.name}
                    </p>
                    <button className="text-green-600 hover:text-green-900">
                      Edit
                    </button>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        {segment.contactCount} contacts
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <p>
                        Created {formatTime(segment.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div>
          <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Generate Smart Suggestions</h3>
            <p className="text-sm text-gray-500 mb-4">
              Our AI analyzes your contacts to suggest relevant segments.
            </p>
            <button
              onClick={() => {
                // In a real implementation, this would call the backend API
                alert('Generating smart segmentation suggestions...');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Generate Suggestions
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {segmentationSuggestions.map((suggestion, index) => (
                <li key={index}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-green-600 truncate">
                        {suggestion.name}
                      </p>
                      <button
                        onClick={() => {
                          const newSegment = {
                            id: `seg_${Date.now()}`,
                            name: suggestion.name,
                            contactCount: suggestion.estimatedCount,
                            criteria: suggestion.criteria,
                            createdAt: new Date()
                          };
                          setSegments([...segments, newSegment]);
                        }}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Create
                      </button>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                          ~{suggestion.estimatedCount} contacts
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {suggestion.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'combine' && (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Combine Segments</h3>
          <p className="text-sm text-gray-500 mb-6">
            Create a new segment by combining existing segments with boolean operations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">Available Segments</h4>
              <div className="border border-gray-300 rounded-md">
                {segments.map((segment) => (
                  <div key={segment.id} className="flex items-center p-3 border-b border-gray-200 last:border-b-0">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-3 text-sm text-gray-900">
                      {segment.name} ({segment.contactCount})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">Combination Logic</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operation
                  </label>
                  <select className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    <option>Include all selected segments (AND)</option>
                    <option>Include any selected segments (OR)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="combined-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Combined Segment Name
                  </label>
                  <input
                    type="text"
                    id="combined-name"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="New Combined Segment"
                  />
                </div>
                
                <button
                  onClick={() => {
                    // In a real implementation, this would create the combined segment
                    alert('Combined segment created successfully!');
                  }}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Create Combined Segment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSegmentation;