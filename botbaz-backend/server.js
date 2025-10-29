const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection
const connectDB = require('./config/db');
connectDB();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'BotBaz API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const templateRoutes = require('./routes/templateRoutes');
const contactRoutes = require('./routes/contactRoutes');
const flowRoutes = require('./routes/flowRoutes');
const whatsappWebhookRoutes = require('./routes/whatsappWebhook');

// Import new routes
const aiRoutes = require('./routes/aiRoutes');
const inboxRoutes = require('./routes/inboxRoutes');
const dripRoutes = require('./routes/dripRoutes');
const segmentRoutes = require('./routes/segmentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/flows', flowRoutes);
app.use('/webhook', whatsappWebhookRoutes);

// Use new routes
app.use('/api/ai', aiRoutes);
app.use('/api/inbox', inboxRoutes);
app.use('/api/drip', dripRoutes);
app.use('/api/segments', segmentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Initialize services
const SchedulerService = require('./services/schedulerService');
const DripCampaignService = require('./services/dripCampaignService');

const schedulerService = new SchedulerService();
const dripCampaignService = new DripCampaignService();

// Set service references
schedulerService.setDripCampaignService(dripCampaignService);

// Initialize default schedules
schedulerService.initializeDefaultSchedules();

// Start server
app.listen(PORT, () => {
  console.log(`BotBaz backend server is running on port ${PORT}`);
});