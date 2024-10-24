import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Import the CSS file

// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCog, 
  faTachometerAlt, 
  faUsers, 
  faChartBar, 
  faFileAlt, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Menu</h2>
      <ul className="sidebar-list">
        <li>
          <Link to="/overview">
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> Overview
          </Link>
        </li>
        <li>
          <Link to="/user-profile">
            <FontAwesomeIcon icon={faUser} className="icon" /> User Profile
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FontAwesomeIcon icon={faCog} className="icon" /> Settings
          </Link>
        </li>
        <li>
          <Link to="/user-details">
            <FontAwesomeIcon icon={faUsers} className="icon" /> User Details
          </Link>
        </li>
        <li>
          <Link to="/charts">
            <FontAwesomeIcon icon={faChartBar} className="icon" /> Charts
          </Link>
        </li>
        <li>
          <Link to="/reports">
            <FontAwesomeIcon icon={faFileAlt} className="icon" /> Reports
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
