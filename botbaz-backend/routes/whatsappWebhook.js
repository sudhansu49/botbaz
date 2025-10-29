// WhatsApp API Integration Script
const express = require('express');
const { WhatsAppService } = require('../services/whatsappService');

const router = express.Router();
const whatsappService = new WhatsAppService();

// Webhook verification
router.get('/webhook', (req, res) => {
  const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
  }
});

// Webhook for incoming messages
router.post('/webhook', (req, res) => {
  const body = req.body;

  // Process incoming webhook events
  if (body.object === 'whatsapp_business_account') {
    body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        if (change.field === 'messages') {
          const messages = change.value.messages;
          
          if (messages && messages.length > 0) {
            messages.forEach(async message => {
              // Process each incoming message
              await processIncomingMessage(message, change.value);
            });
          }
        }
      });
    });
  }

  // Acknowledge receipt of webhook
  res.status(200).send('EVENT_RECEIVED');
});

// Process incoming message
async function processIncomingMessage(message, value) {
  try {
    const from = message.from; // User's phone number
    const messageId = message.id;
    const timestamp = message.timestamp;
    
    // Handle different message types
    switch (message.type) {
      case 'text':
        await handleTextMessage(message.text.body, from, messageId, timestamp);
        break;
        
      case 'image':
        await handleMediaMessage('image', message.image, from, messageId, timestamp);
        break;
        
      case 'document':
        await handleMediaMessage('document', message.document, from, messageId, timestamp);
        break;
        
      case 'audio':
        await handleMediaMessage('audio', message.audio, from, messageId, timestamp);
        break;
        
      case 'video':
        await handleMediaMessage('video', message.video, from, messageId, timestamp);
        break;
        
      case 'location':
        await handleLocationMessage(message.location, from, messageId, timestamp);
        break;
        
      case 'contacts':
        await handleContactsMessage(message.contacts, from, messageId, timestamp);
        break;
        
      case 'button':
        await handleButtonMessage(message.button, from, messageId, timestamp);
        break;
        
      case 'interactive':
        await handleInteractiveMessage(message.interactive, from, messageId, timestamp);
        break;
        
      default:
        console.log(`Unsupported message type: ${message.type}`);
    }
  } catch (error) {
    console.error('Error processing incoming message:', error);
  }
}

// Handle text message
async function handleTextMessage(text, from, messageId, timestamp) {
  console.log(`Received text message from ${from}: ${text}`);
  
  // Here you would typically:
  // 1. Save the message to your database
  // 2. Trigger any relevant chatbot flows
  // 3. Send an automated response if needed
  
  // Example: Send an auto-reply
  if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
    await whatsappService.sendTextMessage(from, 'Hello! Thanks for reaching out. How can I help you today?');
  }
}

// Handle media message
async function handleMediaMessage(type, media, from, messageId, timestamp) {
  console.log(`Received ${type} message from ${from}`);
  
  // Here you would typically:
  // 1. Download the media file using the media ID
  // 2. Save the media information to your database
  // 3. Send an appropriate response
}

// Handle location message
async function handleLocationMessage(location, from, messageId, timestamp) {
  console.log(`Received location message from ${from}`);
  
  // Here you would typically:
  // 1. Save the location data to your database
  // 2. Send an appropriate response
}

// Handle contacts message
async function handleContactsMessage(contacts, from, messageId, timestamp) {
  console.log(`Received contacts message from ${from}`);
  
  // Here you would typically:
  // 1. Save the contact information to your database
  // 2. Send an appropriate response
}

// Handle button message
async function handleButtonMessage(button, from, messageId, timestamp) {
  console.log(`Received button message from ${from}: ${button.text}`);
  
  // Here you would typically:
  // 1. Process the button response
  // 2. Trigger the appropriate action based on the button
  // 3. Send a follow-up message
}

// Handle interactive message (list/reply buttons)
async function handleInteractiveMessage(interactive, from, messageId, timestamp) {
  console.log(`Received interactive message from ${from}`);
  
  // Here you would typically:
  // 1. Process the interactive response
  // 2. Trigger the appropriate action based on the selection
  // 3. Send a follow-up message
}

module.exports = router;