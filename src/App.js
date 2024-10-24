import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import UserProfile from './components/UserProfile'; // Import UserProfile component
import Settings from './components/Settings'; // Import Settings component
import Sidebar from './components/Sidebar';
import Overview from './components/Overview'; // Import Overview component
import UserDetails from './components/UserDetails'; // Import UserDetails component
import Charts from './components/Charts'; // Import Charts component
import Reports from './components/Reports';
import Logout from './components/Logout';
const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication status

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="overview" element={<Overview />} />
            <Route path="user-details" element={<UserDetails />} />
            <Route path="charts" element={<Charts />} />
            <Route path="reports" element={<Reports />} />
            <Route path="logout" element={<Logout/>}/>
          </>
        )}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
