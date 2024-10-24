import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import '../styles/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;
