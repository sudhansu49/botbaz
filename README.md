# BotBaz - WhatsApp Marketing SaaS Platform

BotBaz is a WATI-style WhatsApp Marketing SaaS platform that allows businesses to automate conversations and accelerate growth through WhatsApp campaigns, chatbots, and customer engagement tools.

## Features

- **Admin Dashboard**: Manage all user accounts, partner accounts, and subscriptions
- **Partner Dashboard**: Create and manage client accounts with custom pricing
- **User Dashboard**: Connect WhatsApp Business API, send campaigns, and build chatbots
- **No-Code Flow Builder**: Drag-and-drop interface for creating chatbot flows
- **Campaign Management**: Schedule and send bulk WhatsApp campaigns
- **Template Manager**: Create and manage WhatsApp message templates
- **Contact Management**: Import and organize customer contacts
- **Analytics & Reports**: Track campaign performance and engagement metrics
- **Billing & Subscription**: Manage pricing plans and payments
- **AI-Powered Features**: Smart reply suggestions, sentiment analysis, lead scoring
- **Smart Inbox**: Advanced team inbox with conversation management
- **Drip Campaigns**: Automated multi-step campaign sequences
- **Advanced Segmentation**: Dynamic customer segmentation with AI suggestions
- **Advanced Analytics**: Comprehensive performance dashboards

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Chart.js for data visualization

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- WhatsApp Business API integration

### Additional Services
- Redis for queue management
- OpenAI GPT API for AI features
- Razorpay/Stripe for payments

## Project Structure

```
botbaz/
├── botbaz-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── assets/
│   └── package.json
└── botbaz-backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── services/
    ├── config/
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- WhatsApp Business API access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/botbaz.git
   ```

2. Install frontend dependencies:
   ```bash
   cd botbaz-frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../botbaz-backend
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/botbaz
   JWT_SECRET=your_jwt_secret_key
   WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
   OPENAI_API_KEY=your_openai_api_key
   ```

5. Start the development servers:
   ```bash
   # In botbaz-frontend directory
   npm start
   
   # In botbaz-backend directory
   npm run dev
   ```

## API Documentation

API documentation is available through Swagger. Visit `http://localhost:5000/api-docs` when the backend server is running.

## Advanced Features

For information about the advanced AI-powered features, smart inbox, drip campaigns, segmentation, and analytics, see [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md).

## Deployment

### Frontend
The frontend can be deployed to any static hosting service like Vercel, Netlify, or AWS S3.

### Backend
The backend can be deployed to any cloud platform like AWS, Google Cloud, or Heroku.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@botbaz.com or join our [Discord community](https://discord.gg/botbaz).