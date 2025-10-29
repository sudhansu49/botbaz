// AI Service for BotBaz
const OpenAI = require('openai');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Generate smart reply suggestions
  async generateReplySuggestions(message, context = []) {
    try {
      const prompt = `Given the following WhatsApp message and conversation context, generate 3 smart reply suggestions:
      
Message: "${message}"

Context: ${context.join('\n')}

Reply suggestions should be:
1. Concise and natural
2. Contextually relevant
3. Helpful to the user
4. Professional yet friendly

Format the response as a JSON array of 3 strings.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates WhatsApp reply suggestions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const suggestions = JSON.parse(response.choices[0].message.content);
      return suggestions;
    } catch (error) {
      console.error('Error generating reply suggestions:', error);
      // Return default suggestions if AI fails
      return [
        "Thanks for your message!",
        "I'll get back to you shortly.",
        "Can you provide more details?"
      ];
    }
  }

  // Sentiment analysis
  async analyzeSentiment(message) {
    try {
      const prompt = `Analyze the sentiment of the following message and respond with one of: POSITIVE, NEGATIVE, NEUTRAL.
      
Message: "${message}"

Respond with only one word: POSITIVE, NEGATIVE, or NEUTRAL`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a sentiment analysis tool."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 10
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return 'NEUTRAL';
    }
  }

  // Lead scoring
  async scoreLead(message, contactInfo) {
    try {
      const prompt = `Score this lead on a scale of 1-10 based on their message and contact information:
      
Message: "${message}"
Contact Info: ${JSON.stringify(contactInfo)}

Scoring criteria:
- 1-3: Not interested or spam
- 4-6: Mild interest or inquiry
- 7-10: High interest or ready to purchase

Respond with only a number between 1 and 10.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a lead scoring assistant."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 5
      });

      const score = parseInt(response.choices[0].message.content.trim());
      return isNaN(score) ? 5 : score;
    } catch (error) {
      console.error('Error scoring lead:', error);
      return 5; // Default middle score
    }
  }

  // Auto template generation
  async generateTemplate(message, category = "MARKETING") {
    try {
      const prompt = `Convert the following message into a WhatsApp template format:
      
Original message: "${message}"
Category: ${category}

Template requirements:
- Replace dynamic content with variables like {{1}}, {{2}}, etc.
- Keep the tone consistent with the category
- Make it reusable for multiple recipients

Return a JSON object with:
- "name": a descriptive name for the template
- "content": the template content with variables
- "category": the category
- "language": "en"
- "variables": an array of variable descriptions

Example format:
{
  "name": "welcome_message",
  "content": "Hi {{1}}, welcome to our store!",
  "category": "MARKETING",
  "language": "en",
  "variables": ["customer name"]
}`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a WhatsApp template generator."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 300
      });

      const template = JSON.parse(response.choices[0].message.content);
      return template;
    } catch (error) {
      console.error('Error generating template:', error);
      // Return a basic template if AI fails
      return {
        name: "auto_generated_template",
        content: message,
        category: category,
        language: "en",
        variables: []
      };
    }
  }

  // Auto message translation
  async translateMessage(message, targetLanguage = "es") {
    try {
      const prompt = `Translate the following message to ${targetLanguage}:
      
Message: "${message}"

Return only the translated message without any additional text.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional translator."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 200
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error translating message:', error);
      return message; // Return original if translation fails
    }
  }
}

module.exports = AIService;