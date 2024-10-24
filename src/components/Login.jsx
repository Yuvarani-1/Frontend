import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setAuthentication } from '../features/authSlice'; // Adjust based on your project structure
import axios from 'axios';
import Cookies from 'js-cookie'; // Make sure to install js-cookie for cookie handling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../styles/Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      const token = response.token; // Replace this with your actual token response path
      Cookies.set('jwt', token, { expires: 7 }); // Store JWT token in cookies for 7 days
      console.log('JWT token:', token); // Debugging token
      setIsOtpSent(true); // OTP has been sent
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.msg || "Login failed"; // Display error message from backend
      alert(errorMessage); // Alert to user
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('jwt'); // Get the JWT token from cookies
      const response = await axios.post(
        'http://localhost:8000/api/auth/verify-otp', 
        { email, otp },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token to the request
          },
        }
      );
      
      console.log(response.data);
      alert(response.data.msg || "OTP verification successful!"); // Provide feedback to the user
      dispatch(setAuthentication(true)); // Set authenticated in Redux state
      navigate('/dashboard'); // Redirect to the dashboard after OTP verification
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data?.msg || error.message);
      alert(error.response?.data?.msg || "OTP verification failed"); // Display error message
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {!isOtpSent ? (
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default Login;
