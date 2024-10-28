import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCog,
  faTachometerAlt,
  faUsers,
  faChartBar,
  faFileAlt,
  faSignOutAlt,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar`}>
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
      </ul>
      <div className="sidebar-bottom">
        <ul className="sidebar-list">
          <li>
            <Link to="/help" className="sidebar-help">
              <FontAwesomeIcon icon={faQuestionCircle} className="icon" /> Help
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
