import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import Sidebar from './Sidebar/Sidebar';
import TodayTasks from './dashboardContent/TodayTasks';
import '../styles/Dashboard.css';
import UserSummary from './dashboardContent/UserSummary';
import TransactionGraph from './dashboardContent/TransactionGraph';
import ActivityLogs from './dashboardContent/ActivityLogs';
import ActivityDetails from './dashboardContent/ActivityDetails';

const Dashboard = () => {
  // Example task data, replace this with actual data
  const tasks = [
    { title: 'Task 1', date: '2024-10-26' },
    { title: 'Task 2', date: '2024-10-26' },
    { title: 'Task 3', date: '2024-10-27' },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={true}/>
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>

        <div className="flex-container">
          <TodayTasks tasks={tasks} />
          <UserSummary />
        </div>

        {/* Add Routes here for navigation */}
        <Routes>
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/activity-logs/:id" element={<ActivityDetails />} />
          {/* Add more routes as needed */}
        </Routes>

        {/* This component will always be rendered on the Dashboard page */}
        <TransactionGraph />
      </div>
    </div>
  );
};

export default Dashboard;
