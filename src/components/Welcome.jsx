import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import '../styles/Welcome.css'; // Import the CSS file

const Welcome = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication status from Redux
  const [loading, setLoading] = useState(false); // Loading state

  // Redirect to dashboard if user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [isAuthenticated, navigate]); // Add navigate as a dependency

  const handleLoginClick = () => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      navigate('/login'); // Redirect to login page after a delay
    }, 1000); // Adjust the delay as needed for animation
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Admin Dashboard!</h1>
      <p className="welcome-paragraph">Please log in to continue.</p>
      {loading ? (
        <div className="loader"></div> // Show loader if loading
      ) : (
        <button className="welcome-button" onClick={handleLoginClick}>Login</button>
      )}
      <p className="welcome-paragraph">
        Don't have an account? <a className="welcome-register-link" href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Welcome;
