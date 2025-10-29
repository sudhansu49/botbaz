# BotBaz - WhatsApp Marketing SaPlatformaS 

## Project Summary

BotBaz is a comprehensive WhatsApp Marketing SaaS platform inspired by WATI (wati.io) that allows businesses to automate conversations and accelerate growth. The platform includes:

1. **Admin Dashboard** - For managing all user accounts, partner accounts, and subscriptions
2. **Partner Dashboard** - For partners to manage client accounts with custom pricing
3. **User Dashboard** - For business users to connect WhatsApp Business API, send campaigns, and build chatbots
4. **No-Code Flow Builder** - Drag-and-drop interface for creating chatbot flows
5. **Campaign Management** - Schedule and send bulk WhatsApp campaigns
6. **Template Manager** - Create and manage WhatsApp message templates
7. **Contact Management** - Import and organize customer contacts
8. **Analytics & Reports** - Track campaign performance and engagement metrics
9. **Billing & Subscription** - Manage pricing plans and payments

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router for navigation
- Chart.js for data visualization

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- WhatsApp Business API integration

## Project Structure

```
botbaz/
├── botbaz-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components for routing
│   │   ├── assets/              # Static assets like images and JSON templates
│   │   ├── App.js               # Main application component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── package.json             # Frontend dependencies
└── botbaz-backend/
    ├── controllers/             # Request handlers
    ├── models/                  # Database models
    ├── routes/                  # API routes
    ├── middleware/              # Custom middleware
    ├── services/                # Business logic
    ├── config/                  # Configuration files
    ├── utils/                   # Utility functions
    ├── server.js                # Main server file
    ├── swagger.json             # API documentation
    └── package.json             # Backend dependencies
```

## How to Run the Application

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- WhatsApp Business API access

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd botbaz-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd botbaz-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/botbaz
   JWT_SECRET=your_jwt_secret_key
   WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
   WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The backend API will be available at `http://localhost:5000`

## API Documentation

API documentation is available in the `swagger.json` file in the backend directory. You can use tools like Swagger UI to visualize and interact with the API.

## Key Features Implemented

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (Admin, Partner, User)

### Dashboard Components
- Admin dashboard with user/partner management
- Partner dashboard with client management
- User dashboard with campaign and chatbot management

### WhatsApp Integration
- Send text and template messages
- Receive incoming messages via webhooks
- Template management

### Flow Builder
- No-code interface for creating chatbot flows
- Various node types (trigger, message, condition, etc.)
- Flow templates for quick setup

### Campaign Management
- Create and schedule campaigns
- Track campaign performance
- Contact segmentation

### Contact Management
- Import and manage contacts
- Tagging and segmentation

### Template Management
- Create and manage message templates
- Template approval workflow

## Next Steps for Production Deployment

1. **Security Enhancements**
   - Implement rate limiting
   - Add input validation and sanitization
   - Use HTTPS in production
   - Implement proper error handling

2. **Database Setup**
   - Set up MongoDB Atlas or production MongoDB instance
   - Add database indexes for performance

3. **WhatsApp API Integration**
   - Obtain WhatsApp Business API credentials
   - Set up proper webhook handling
   - Implement message status tracking

4. **Frontend Optimization**
   - Add loading states and error handling
   - Implement proper form validation
   - Add responsive design enhancements

5. **Backend Scalability**
   - Add Redis for caching
   - Implement job queues for background processing
   - Add logging and monitoring

6. **Deployment**
   - Deploy frontend to Vercel, Netlify, or similar
   - Deploy backend to AWS, Google Cloud, or Heroku
   - Set up proper CI/CD pipelines

## Support

For support, please contact the development team or refer to the documentation in each component.