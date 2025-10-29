import React, { useState } from 'react';

const AIFeatures = () => {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [sentiment, setSentiment] = useState('');
  const [leadScore, setLeadScore] = useState(null);
  const [template, setTemplate] = useState(null);
  const [translated, setTranslated] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');

  const generateSuggestions = async () => {
    try {
      // In a real implementation, this would call your backend API
      // For demo purposes, we'll simulate the response
      const mockSuggestions = [
        "Thanks for your inquiry! How can I help you today?",
        "I'd be happy to assist you with that. Can you provide more details?",
        "We have several options that might work for you. Would you like me to explain?"
      ];
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
  };

  const analyzeSentiment = async () => {
    try {
      // In a real implementation, this would call your backend API
      // For demo purposes, we'll simulate the response
      const sentiments = ['POSITIVE', 'NEGATIVE', 'NEUTRAL'];
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      setSentiment(randomSentiment);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  const scoreLead = async () => {
    try {
      // In a real implementation, this would call your backend API
      // For demo purposes, we'll simulate the response
      const score = Math.floor(Math.random() * 10) + 1;
      setLeadScore(score);
    } catch (error) {
      console.error('Error scoring lead:', error);
    }
  };

  const generateTemplate = async () => {
    try {
      // In a real implementation, this would call your backend API
      // For demo purposes, we'll simulate the response
      const mockTemplate = {
        name: "customer_inquiry_response",
        content: "Hi {{1}}, thanks for your inquiry about {{2}}. We'd be happy to help you with that!",
        category: "UTILITY",
        language: "en",
        variables: ["customer name", "product/service"]
      };
      setTemplate(mockTemplate);
    } catch (error) {
      console.error('Error generating template:', error);
    }
  };

  const translateMessage = async () => {
    try {
      // In a real implementation, this would call your backend API
      // For demo purposes, we'll simulate the response
      const translations = {
        es: "Hola, gracias por su mensaje. ¿En qué puedo ayudarle?",
        fr: "Bonjour, merci pour votre message. Comment puis-je vous aider?",
        de: "Hallo, danke für Ihre Nachricht. Wie kann ich Ihnen helfen?"
      };
      setTranslated(translations[targetLanguage] || translations.es);
    } catch (error) {
      console.error('Error translating message:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Features</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Smart Reply Suggestions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Smart Reply Suggestions</h2>
          <div className="mb-4">
            <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-2">
              Customer Message
            </label>
            <textarea
              id="message-input"
              rows={3}
              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter customer message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            onClick={generateSuggestions}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Generate Suggestions
          </button>
          
          {suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-900 mb-2">Suggestions:</h3>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis</h2>
          <div className="mb-4">
            <label htmlFor="sentiment-message" className="block text-sm font-medium text-gray-700 mb-2">
              Message to Analyze
            </label>
            <textarea
              id="sentiment-message"
              rows={3}
              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter message for sentiment analysis..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            onClick={analyzeSentiment}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Analyze Sentiment
          </button>
          
          {sentiment && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <span className="font-medium">Sentiment:</span> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' :
                sentiment === 'NEGATIVE' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {sentiment}
              </span>
            </div>
          )}
        </div>

        {/* Lead Scoring */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Lead Scoring</h2>
          <div className="mb-4">
            <label htmlFor="lead-message" className="block text-sm font-medium text-gray-700 mb-2">
              Lead Message
            </label>
            <textarea
              id="lead-message"
              rows={3}
              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter lead message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            onClick={scoreLead}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Score Lead
          </button>
          
          {leadScore !== null && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <span className="font-medium">Lead Score:</span> 
              <span className="ml-2 text-lg font-bold text-gray-900">{leadScore}/10</span>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-botbaz-green h-2.5 rounded-full" 
                    style={{ width: `${leadScore * 10}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Auto Template Generation */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Auto Template Generation</h2>
          <div className="mb-4">
            <label htmlFor="template-message" className="block text-sm font-medium text-gray-700 mb-2">
              Message to Convert
            </label>
            <textarea
              id="template-message"
              rows={3}
              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter message to convert to template..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            onClick={generateTemplate}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Generate Template
          </button>
          
          {template && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">Generated Template:</h3>
              <p className="mt-1 text-sm text-gray-600">Name: {template.name}</p>
              <p className="mt-1 text-sm text-gray-600">Content: {template.content}</p>
              <p className="mt-1 text-sm text-gray-600">Category: {template.category}</p>
            </div>
          )}
        </div>

        {/* Message Translation */}
        <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Message Translation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="translate-message" className="block text-sm font-medium text-gray-700 mb-2">
                Message to Translate
              </label>
              <textarea
                id="translate-message"
                rows={3}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter message to translate..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="target-language" className="block text-sm font-medium text-gray-700 mb-2">
                Target Language
              </label>
              <select
                id="target-language"
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>
          </div>
          <button
            onClick={translateMessage}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-botbaz-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Translate Message
          </button>
          
          {translated && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900">Translated Message:</h3>
              <p className="mt-1 text-gray-600">{translated}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;