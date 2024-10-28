// UserSummary.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSummary } from '../../features/userSlice'; // Adjust the import path
import '../../styles/dashboardstyles/UserSummary.css'; // Import the CSS file

const UserSummary = () => {
    const dispatch = useDispatch();
    const { userSummary, error, loading } = useSelector((state) => state.userSummary);

    useEffect(() => {
        dispatch(fetchUserSummary()); // Fetch user summary when component mounts
    }, [dispatch]);

    return (
        <div className="user-summary">
            {loading && <div className="loading">Loading...</div>} {/* Loading state */}
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            {userSummary && (
                <div className="summary-box">
                    <h2>User</h2>
                    <ul className="summary-details">
                        <li className="summary-item">Total Users: {userSummary.totalUsers}</li>
                        <li className="summary-item">New Users Today: {userSummary.newUsersToday}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserSummary;
