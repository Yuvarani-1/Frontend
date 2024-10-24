import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/authSlice'; // Adjust the import path as necessary
import axios from 'axios';
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [emailExists, setEmailExists] = useState(false); // State to track email existence
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access loading and error state from Redux store
  const { loading, error } = useSelector((state) => state.auth);

  // Function to check if email already exists in the database
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/register', {
        params: { email },
      });
      setEmailExists(response.data.exists); // Update the state based on the response
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (value) {
      checkEmailExists(value); // Check email existence on input change
    } else {
      setEmailExists(false); // Reset if the input is empty
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailExists) {
      alert('Email already exists. Please use a different email.'); // Alert user if email exists
      return;
    }

    try {
      // Dispatch the registerUser action with user details
      await dispatch(registerUser({ name, email, password, role })).unwrap();
      alert('User registered successfully!'); // Notify successful registration
      navigate('/login'); // Redirect to login page upon successful registration
    } catch (err) {
      console.error('Error registering user:', err);
      alert(error || 'Error registering user. Please try again.'); // Alert on registration error
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange} // Use the new handler for email change
            required
          />
          {emailExists && <span className="error-message">Email already exists.</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <span className="error-message">{error}</span>} {/* Display error if exists */}
      </form>
    </div>
  );
};

export default Register;
