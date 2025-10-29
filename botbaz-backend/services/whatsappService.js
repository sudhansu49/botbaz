// WhatsApp API Integration Service
class WhatsAppService {
  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.apiVersion = 'v18.0';
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
  }

  // Send a text message
  async sendTextMessage(to, message) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          text: {
            body: message
          }
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  // Send a template message
  async sendTemplateMessage(to, templateName, languageCode = 'en', components = []) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: languageCode
            },
            components: components
          }
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending WhatsApp template message:', error);
      throw error;
    }
  }

  // Send a media message
  async sendMediaMessage(to, mediaType, mediaId, caption = null) {
    try {
      const messageData = {
        messaging_product: 'whatsapp',
        to: to,
        type: mediaType,
        [mediaType]: {
          id: mediaId
        }
      };

      if (caption) {
        messageData[mediaType].caption = caption;
      }

      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending WhatsApp media message:', error);
      throw error;
    }
  }

  // Get message templates
  async getTemplates() {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/message_templates`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching WhatsApp templates:', error);
      throw error;
    }
  }

  // Create a message template
  async createTemplate(name, category, language, components) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/message_templates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          category: category,
          language: language,
          components: components
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating WhatsApp template:', error);
      throw error;
    }
  }
}

module.exports = WhatsAppService;