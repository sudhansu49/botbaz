import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';

// Import dashboard components
import AdminDashboard from './components/AdminDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import UserDashboard from './components/UserDashboard';
import FlowBuilder from './components/FlowBuilder';
import TemplateManager from './components/TemplateManager';
import ContactManager from './components/ContactManager';
import CampaignManager from './components/CampaignManager';
import ReportsDashboard from './components/ReportsDashboard';
import Settings from './components/Settings';

// Import new advanced components
import AIFeatures from './components/AIFeatures';
import SmartInbox from './components/SmartInbox';
import DripCampaigns from './components/DripCampaigns';
import AdvancedSegmentation from './components/AdvancedSegmentation';
import AdvancedAnalytics from './components/AdvancedAnalytics';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="partner" element={<PartnerDashboard />} />
            <Route path="user" element={<UserDashboard />} />
            <Route path="campaigns" element={<CampaignManager />} />
            <Route path="chatbot" element={<FlowBuilder />} />
            <Route path="templates" element={<TemplateManager />} />
            <Route path="contacts" element={<ContactManager />} />
            <Route path="reports" element={<ReportsDashboard />} />
            <Route path="settings" element={<Settings />} />
            {/* New advanced features routes */}
            <Route path="ai-features" element={<AIFeatures />} />
            <Route path="inbox" element={<SmartInbox />} />
            <Route path="drip-campaigns" element={<DripCampaigns />} />
            <Route path="segments" element={<AdvancedSegmentation />} />
            <Route path="analytics" element={<AdvancedAnalytics />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;