import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail, clearMessages } from '../features/authSlice'; // Adjust the path as necessary
import '../styles/ForgotPassword.css'; // Ensure the CSS file exists

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const resetEmailMessage = useSelector((state) => state.auth.resetEmailMessage);
    const resetEmailError = useSelector((state) => state.auth.resetEmailError);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        dispatch(sendResetEmail(email));
    };

    useEffect(() => {
        // Log the messages and error for debugging
        console.log("Reset Email Message:", resetEmailMessage);
        console.log("Reset Email Error:", resetEmailError);

        return () => {
            dispatch(clearMessages());
        };
    }, [dispatch]);

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {resetEmailMessage && <div className="success-message">{resetEmailMessage}</div>}
            {resetEmailError && <div className="error-message">{resetEmailError}</div>}
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
