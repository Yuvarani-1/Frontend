import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/authSlice';
import { useLocation } from 'react-router-dom';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const resetEmailError = useSelector((state) => state.auth.resetEmailError);
    const resetEmailMessage = useSelector((state) => state.auth.resetEmailMessage);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    // Get token from the query string
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match!");
        } else {
            setPasswordError('');
            setLoading(true);
            dispatch(resetPassword({ token, password })).finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        if (resetEmailMessage) {
            setPassword('');
            setConfirmPassword('');
        }
    }, [resetEmailMessage]);

    return (
        <div className="forgot-password-container">
            <h2>Reset Password</h2>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your new password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your new password"
                    />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            {resetEmailError && <p className="error-message">{resetEmailError}</p>}
            {resetEmailMessage && <p className="success-message">{resetEmailMessage}</p>}
        </div>
    );
};

export default ResetPassword;
