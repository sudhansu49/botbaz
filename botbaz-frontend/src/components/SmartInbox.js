import React, { useState, useEffect } from 'react';

const SmartInbox = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [teamStats, setTeamStats] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockConversations = [
      {
        id: 'conv_1',
        contactId: 'contact_1',
        contactName: 'John Smith',
        lastMessage: 'Hi, I\'m interested in your product. Can you tell me more?',
        timestamp: new Date(Date.now() - 3600000),
        unreadCount: 1,
        status: 'open',
        sentiment: 'POSITIVE',
        tags: ['interested', 'product inquiry']
      },
      {
        id: 'conv_2',
        contactId: 'contact_2',
        contactName: 'Sarah Johnson',
        lastMessage: 'Thanks for the information. I\'ll get back to you soon.',
        timestamp: new Date(Date.now() - 7200000),
        unreadCount: 0,
        status: 'assigned',
        assignedAgent: 'agent_1',
        sentiment: 'NEUTRAL',
        tags: ['follow-up']
      },
      {
        id: 'conv_3',
        contactId: 'contact_3',
        contactName: 'Mike Brown',
        lastMessage: 'This is urgent. I need help with my order.',
        timestamp: new Date(Date.now() - 1800000),
        unreadCount: 3,
        status: 'open',
        sentiment: 'NEGATIVE',
        tags: ['urgent', 'support']
      }
    ];

    const mockTeamStats = {
      totalConversations: 24,
      openConversations: 8,
      assignedConversations: 12,
      resolvedConversations: 4,
      unreadConversations: 5,
      averageResponseTime: 120000,
      agentCount: 3
    };

    setConversations(mockConversations);
    setTeamStats(mockTeamStats);
  }, []);

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'unread') return conv.unreadCount > 0;
    if (filter === 'assigned') return conv.status === 'assigned';
    if (filter === 'open') return conv.status === 'open';
    return true;
  }).filter(conv => 
    conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const formatResponseTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Team Inbox</h2>
          {teamStats && (
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-medium text-gray-500">Open</div>
                <div className="text-lg font-semibold text-gray-900">{teamStats.openConversations}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Unread</div>
                <div className="text-lg font-semibold text-gray-900">{teamStats.unreadConversations}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Avg. Response</div>
                <div className="text-lg font-semibold text-gray-900">{formatResponseTime(teamStats.averageResponseTime)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2 mb-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'all' 
                  ? 'bg-botbaz-green text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'unread' 
                  ? 'bg-botbaz-green text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === 'open' 
                  ? 'bg-botbaz-green text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Open
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.contactName}
                    </h3>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">
                    {formatTime(conversation.timestamp)}
                  </span>
                  <div className="flex space-x-1 mt-1">
                    {conversation.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  conversation.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' :
                  conversation.sentiment === 'NEGATIVE' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {conversation.sentiment}
                </span>
                {conversation.status === 'assigned' && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Assigned
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation View */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedConversation.contactName}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">
                      {selectedConversation.contactId}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      selectedConversation.status === 'open' ? 'bg-green-100 text-green-800' :
                      selectedConversation.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedConversation.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Assign
                  </button>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Close
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {selectedConversation.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {tag}
                  </span>
                ))}
                <button className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-gray-500 hover:text-gray-700">
                  + Add tag
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {/* Mock conversation messages */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 max-w-xs lg:max-w-md">
                    <p className="text-sm text-gray-800">
                      Hi there! I'm interested in your product. Can you tell me more about the features?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(new Date(Date.now() - 3600000))}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-botbaz-green text-white rounded-lg rounded-tr-none px-4 py-2 max-w-xs lg:max-w-md">
                    <p className="text-sm">
                      Hello! I'd be happy to help. Our product offers several key features including...
                    </p>
                    <p className="text-xs text-green-100 mt-1">
                      {formatTime(new Date(Date.now() - 3500000))}
                    </p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 max-w-xs lg:max-w-md">
                    <p className="text-sm text-gray-800">
                      That sounds great! What about pricing and availability?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(new Date(Date.now() - 3400000))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:ring-green-500 focus:border-green-500"
                />
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Send
                </button>
              </div>
              <div className="flex space-x-2 mt-2">
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attach
                </button>
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Emoji
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a conversation from the list to view details.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartInbox;