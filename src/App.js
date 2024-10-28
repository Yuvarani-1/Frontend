import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserProfile from './components/Sidebar/UserProfile';
import Settings from './components/Sidebar/Settings';
import Sidebar from './components/Sidebar/Sidebar';
import Overview from './components/Sidebar/Overview';
import UserDetails from './components/Sidebar/UserDetails';
import Charts from './components/Sidebar/Charts';
import Reports from './components/Sidebar/Reports';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import HelpSection from './components/Sidebar/HelpSection';
import CalendarComponent from './components/dashboardContent/FullCalendar';  // Import Chart.js components

// Register all necessary Chart.js components
Chart.register(...registerables); // Adjust the import path as necessary
axios.defaults.withCredentials = true;

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/help" element={<HelpSection />} />
            <Route path="/dashboard/full-calendar" element={<CalendarComponent />} /> {/* FullCalendar route */}
          </>
        )}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;