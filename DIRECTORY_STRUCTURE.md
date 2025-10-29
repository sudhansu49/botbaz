# BotBaz Project Directory Structure

```
botbaz-whatasap-marketing-software/
├── botbaz-frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── chatbotTemplates.json
│   │   ├── components/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── CampaignManager.js
│   │   │   ├── ContactManager.js
│   │   │   ├── FlowBuilder.js
│   │   │   ├── PartnerDashboard.js
│   │   │   ├── ReportsDashboard.js
│   │   │   ├── Settings.js
│   │   │   ├── TemplateManager.js
│   │   │   └── UserDashboard.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── DashboardHome.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── botbaz-backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── campaignController.js
│   │   ├── contactController.js
│   │   ├── templateController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Campaign.js
│   │   ├── Contact.js
│   │   ├── Template.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── flowRoutes.js
│   │   ├── templateRoutes.js
│   │   ├── userRoutes.js
│   │   └── whatsappWebhook.js
│   ├── services/
│   │   ├── campaignService.js
│   │   ├── flowBuilderService.js
│   │   └── whatsappService.js
│   ├── utils/
│   ├── package.json
│   ├── server.js
│   ├── swagger.json
│   └── .env
├── DOCKER.md
├── README.md
└── SUMMARY.md
```

This structure represents a complete, functional WhatsApp Marketing SaaS platform with:

1. **Frontend** - Built with React.js and Tailwind CSS
2. **Backend** - Built with Node.js and Express
3. **Database** - MongoDB with Mongoose models
4. **Authentication** - JWT-based with role-based access control
5. **WhatsApp Integration** - Complete API integration for sending and receiving messages
6. **Dashboard Components** - Admin, Partner, and User dashboards
7. **Flow Builder** - No-code interface for creating chatbot flows
8. **Campaign Management** - Tools for creating and tracking campaigns
9. **Contact Management** - Import and organize customer contacts
10. **Template Management** - Create and manage message templates
11. **Analytics & Reports** - Track performance metrics
12. **Docker Configuration** - For easy deployment

The application is organized following best practices for maintainability and scalability, with clear separation of concerns between frontend and backend components.